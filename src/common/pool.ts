import {
	CoinLookup,
	CoinToken,
	Gauge,
	GaugeToken,
	LockableDuration,
	LockableDurationWithApr,
	LockCoin,
	OsmosisPool,
	OsmosisPoolAsset,
	Pool,
	PoolAsset,
	TokenBalance,
} from "@/types"
import { amountToCoin, toDecimalGamm, toViewDenom } from "./numbers"
import { BigNumber } from "bignumber.js"
import { toMilliseconds } from "duration-fns"
import useBank from "@/store/bank"
import useConfig from "@/store/config"
import usePools from "@/store/pools"
import usePrices from "@/store/prices"
import { mapLockableDuration } from "./duration"
import { compact, max, reduce } from "lodash"
import { add, parseISO } from "date-fns"
import { Coin } from "@cosmjs/proto-signing"
import { unboundingEndTimeStart } from "./date"
import { findTokenByIBCDenom } from "./token"

export const gammToPoolAmount = (
	currentAmount: BigNumber,
	totalPoolGamm: BigNumber,
	totalTokenGamm: BigNumber,
	coinLookup: CoinLookup
) => {
	const shareRation = currentAmount.div(totalPoolGamm)

	const amount = totalTokenGamm.multipliedBy(shareRation).toString()

	return toViewDenom(amount.toString(), coinLookup.chainToViewConversionFactor)
}

export const tokenToPoolAsset = (
	pool: OsmosisPool,
	rawCoin: OsmosisPoolAsset,
	tokens: TokenBalance[]
): PoolAsset | undefined => {
	const bankStore = useBank()
	const token = findTokenByIBCDenom(tokens, rawCoin.token.denom)
	const totalPoolGamm = new BigNumber(pool.totalShares.amount)
	const totalTokenGamm = new BigNumber(rawCoin.token.amount) // For example, total BTSG inside the pool
	const weightPercentage = new BigNumber(rawCoin.weight)
		.div(pool.totalWeight)
		.toNumber()

	if (token) {
		const coinLookup = token.coinLookup.find(
			(coin) => coin.viewDenom === token.symbol
		)

		let userTotalGamm = new BigNumber("0")
		let bondedAmount = new BigNumber("0")
		let availableAmount = new BigNumber("0")

		const bondedBalances = bankStore.lockedCoinsBalance.filter(
			(coin) => coin.denom === `gamm/pool/${pool.id}`
		)

		const availableBalances = bankStore.osmosisBalance.filter(
			(coin) => coin.denom === `gamm/pool/${pool.id}`
		)

		for (const bondedBalance of bondedBalances) {
			bondedAmount = bondedAmount.plus(bondedBalance.amount)
		}

		for (const availableBalance of availableBalances) {
			availableAmount = availableAmount.plus(availableBalance.amount)
		}

		userTotalGamm = bondedAmount.plus(availableAmount)

		if (coinLookup) {
			return {
				token: {
					price: token.price ?? "0",
					name: token.name,
					symbol: token.symbol,
					logos: token.logos,
					coinLookup,
					coinDenom: rawCoin.token.denom,
					amount: toViewDenom(
						totalTokenGamm.toString(),
						coinLookup.chainToViewConversionFactor
					),
					denom: token.ibcEnabled
						? token.fantoken && coinLookup.fantokenDenom
							? coinLookup.fantokenDenom
							: token.ibc.osmosis.sourceDenom
						: coinLookup.chainDenom,
					userTotalAmount: gammToPoolAmount(
						userTotalGamm,
						totalPoolGamm,
						totalTokenGamm,
						coinLookup
					),
					availableAmount: gammToPoolAmount(
						availableAmount,
						totalPoolGamm,
						totalTokenGamm,
						coinLookup
					),
					bondedAmount: gammToPoolAmount(
						bondedAmount,
						totalPoolGamm,
						totalTokenGamm,
						coinLookup
					),
				},
				weightPercentage,
				weight: rawCoin.weight,
			}
		}
	}
}

export const mapPools = (
	rawPools: OsmosisPool[],
	tokens: TokenBalance[]
): Pool[] => {
	const poolsStore = usePools()
	const bankStore = useBank()

	return rawPools.map((pool) => {
		const poolAssets = [...pool.poolAssets]
		let liquidity = new BigNumber("0")
		let userLiquidity = new BigNumber("0")
		let bonded = new BigNumber("0")

		const coins = poolAssets.map((asset) => {
			const coin = tokenToPoolAsset(pool, asset, tokens)

			if (coin) {
				const coinLiquidity = new BigNumber(coin.token.amount)
				const userTotalAmount = new BigNumber(coin.token.userTotalAmount)
				const bondedAmount = new BigNumber(coin.token.bondedAmount)

				liquidity = liquidity.plus(coinLiquidity.multipliedBy(coin.token.price))
				userLiquidity = userLiquidity.plus(
					userTotalAmount.multipliedBy(coin.token.price)
				)
				bonded = bonded.plus(bondedAmount.multipliedBy(coin.token.price))
			}

			return coin
		})

		let availableLPTokens = new BigNumber("0")
		const availableBalances: Coin[] = bankStore.osmosisBalance.filter(
			(coin) => coin.denom === `gamm/pool/${pool.id}`
		)

		for (const availableBalance of availableBalances) {
			availableLPTokens = availableLPTokens.plus(availableBalance.amount)
		}

		const lockableDurationApr: LockableDurationWithApr[] =
			poolsStore.lockableDuration.map((duration) => {
				const lockedLonger = bankStore.lockedLongerByPoolIdAndDuration(
					pool.id,
					duration.rawDuration
				)

				const bondedCoin = lockedLonger.find(
					(locked) => !unboundingEndTimeStart(locked.end_time)
				)

				const unbondedCoins: LockCoin[] = lockedLonger
					.filter((locked) => unboundingEndTimeStart(locked.end_time))
					.map((lockCoin) => ({
						...lockCoin,
						durationMap: mapLockableDuration(lockCoin.duration),
					}))

				const extraGauge = poolsStore.extraGaugeByPoolIdAndDuration(
					pool.id,
					duration.rawDuration
				)

				const extraGauges = extraGauge.map((gauge) =>
					gaugeToGaugeToken(pool, duration, gauge, liquidity.toString(), tokens)
				)

				let totalApr = reduce<GaugeToken, BigNumber>(
					extraGauges,
					(all, lockableDuration) => {
						return all.plus(lockableDuration.apr)
					},
					new BigNumber("0")
				)

				const osmosisApr = calculateTotalApr(pool, duration, liquidity.toString())

				totalApr = totalApr.plus(osmosisApr)

				return {
					...duration,
					bondedCoin,
					unbondedCoins,
					extraGauges,
					apr: calculateTotalApr(pool, duration, liquidity.toString()),
					totalApr: totalApr.toString(),
				}
			})

		const maxIncentivizedApr = max(
			lockableDurationApr.map((duration) =>
				new BigNumber(duration.totalApr).toNumber()
			)
		)

		return {
			...pool,
			coins: compact(coins),
			lockableDurationApr,
			APR: new BigNumber(maxIncentivizedApr ?? "0").toString(),
			liquidity: liquidity.toString(),
			userLiquidity: userLiquidity.toString(),
			bonded: bonded.toString(),
			availableLPTokens: toDecimalGamm(availableLPTokens.toString()),
			availableLPBalances: availableBalances,
		}
	})
}

export const gaugeToGaugeToken = (
	pool: OsmosisPool,
	lockableDuration: LockableDuration,
	gauge: Gauge,
	liquidityPool: string,
	tokens: TokenBalance[]
): GaugeToken => {
	const coins: CoinToken[] = gauge.coins.map((coin) => {
		const token = findTokenByIBCDenom(tokens, coin.denom)
		let amount = coin.amount

		if (token) {
			const coinLookup = token.coinLookup.find(
				(lookup) => lookup.viewDenom === token.symbol
			)

			if (coinLookup) {
				amount = toViewDenom(amount, coinLookup.chainToViewConversionFactor)
			}
		}

		return {
			...coin,
			amount,
			token,
		}
	})

	const numEpochsPaidOver = parseInt(gauge.num_epochs_paid_over)
	const filledEpochs = parseInt(gauge.filled_epochs)
	const leftEpochs = numEpochsPaidOver - filledEpochs
	const endTime = add(parseISO(gauge.start_time), {
		days: numEpochsPaidOver,
	}).toISOString()

	return {
		...gauge,
		numEpochsPaidOver,
		filledEpochs,
		leftEpochs,
		coins,
		endTime,
		apr: calculateTotalExternalApr(
			pool,
			gauge,
			lockableDuration,
			liquidityPool,
			tokens
		),
	}
}

export const calculateTotalApr = (
	pool: OsmosisPool,
	duration: LockableDuration,
	liquidityPool: string
) => {
	const poolsStore = usePools()

	let apr = new BigNumber(getPoolApr(pool, duration, liquidityPool))

	for (const lockableDuration of poolsStore.lockableDuration) {
		if (lockableDuration.milliseconds >= duration.milliseconds) {
			break
		}

		apr = apr.plus(getPoolApr(pool, lockableDuration, liquidityPool))
	}

	return apr.toString()
}

/*
	Liquidity Pool is a Fiat value in USD
*/
export const getPoolApr = (
	pool: OsmosisPool,
	duration: LockableDuration,
	liquidityPool: string
): string => {
	const poolsStore = usePools()
	const configStore = useConfig()
	const pricesStore = usePrices()
	const incentivizedPool = poolsStore.incentivizedPoolById(pool.id)
	const lockDuration = poolsStore.lockableDuration.find(
		(el) => el.rawDuration === duration.rawDuration
	)
	const gaugeId = poolsStore.incentivizedPoolByIdAndDuration(
		pool.id,
		duration.rawDuration
	)
	const mintParams = poolsStore.mintParams
	const distrInfo = poolsStore.distrInfo
	const osmosisToken = configStore.osmosisToken

	if (incentivizedPool && lockDuration && gaugeId && mintParams) {
		const mintDenom = mintParams.mint_denom
		const epochIdentifier = mintParams.epoch_identifier

		if (mintDenom && epochIdentifier && osmosisToken) {
			const epoch = poolsStore.epochByIdentifier(epochIdentifier)

			if (epoch && epoch.duration && distrInfo) {
				const totalWeight = new BigNumber(distrInfo.total_weight)
				const poolTVL = new BigNumber(liquidityPool)
				const potWeightRecord = distrInfo.records.find(
					(record) => record.gauge_id === gaugeId.gauge_id
				)

				const osmosisPrice = pricesStore.getPriceById(osmosisToken.coinGeckoId)

				if (osmosisPrice && potWeightRecord) {
					const potWeight = new BigNumber(potWeightRecord.weight)
					const coinLookup = osmosisToken.coinLookup.find(
						(coin) => coin.viewDenom === osmosisToken.symbol
					)

					if (
						totalWeight.gt(0) &&
						potWeight.gt(0) &&
						poolTVL.gt(0) &&
						poolsStore.epochProvisions &&
						coinLookup
					) {
						const epochProvision = new BigNumber(
							toViewDenom(
								poolsStore.epochProvisions,
								coinLookup.chainToViewConversionFactor
							)
						)
						const epochDuration = mapLockableDuration(epoch.duration)
						const numEpochPerYear =
							toMilliseconds({ years: 1 }) / epochDuration.milliseconds
						const yearProvision = epochProvision.multipliedBy(numEpochPerYear)

						const yearProvisionToPots = yearProvision.multipliedBy(
							mintParams.distribution_proportions.pool_incentives
						)

						const yearProvisionToPot = yearProvisionToPots.multipliedBy(
							potWeight.div(totalWeight)
						)

						const yearProvisionToPotPrice = new BigNumber(osmosisPrice).multipliedBy(
							yearProvisionToPot
						)

						return yearProvisionToPotPrice.div(poolTVL).toString()
					}
				}
			}
		}
	}

	return "0"
}

export const calculateTotalExternalApr = (
	pool: OsmosisPool,
	gauge: Gauge,
	duration: LockableDuration,
	liquidityPool: string,
	tokens: TokenBalance[]
) => {
	const poolsStore = usePools()

	const extraGauge = poolsStore.extraGaugeByPoolIdAndDurationAndCoins(
		pool.id,
		duration.rawDuration,
		gauge.coins
	)

	let apr = new BigNumber("0")

	if (extraGauge) {
		apr = new BigNumber(getExternalPoolApr(extraGauge, liquidityPool, tokens))

		for (const lockableDuration of poolsStore.lockableDuration) {
			if (lockableDuration.milliseconds >= duration.milliseconds) {
				break
			}

			const otherGauge = poolsStore.extraGaugeByPoolIdAndDurationAndCoins(
				pool.id,
				lockableDuration.rawDuration,
				gauge.coins
			)

			if (otherGauge) {
				apr = apr.plus(getExternalPoolApr(otherGauge, liquidityPool, tokens))
			}
		}
	}

	return apr.toString()
}

export const getExternalPoolApr = (
	gauge: Gauge,
	liquidityPool: string,
	tokens: TokenBalance[]
): string => {
	const poolTVL = new BigNumber(liquidityPool)

	if (poolTVL.gt(0)) {
		let totalReward = new BigNumber("0")

		for (const coin of gauge.coins) {
			const token = findTokenByIBCDenom(tokens, coin.denom)

			if (token) {
				const amount = new BigNumber(coin.amount)
				const viewCoin = amountToCoin(amount.toString(), token)

				if (viewCoin) {
					const yearAmount = new BigNumber(365)
						.multipliedBy(viewCoin.amount)
						.div(gauge.filled_epochs)

					totalReward = totalReward.plus(
						new BigNumber(yearAmount.toString()).multipliedBy(token.price ?? "0")
					)
				}
			}
		}

		return totalReward.div(poolTVL).toString()
	}

	return "0"
}
