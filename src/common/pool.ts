import {
	CoinLookup,
	CoinToken,
	Gauge,
	GaugeToken,
	LockableDuration,
	LockableDurationWithApr,
	LockCoin,
	LockedGauge,
	OsmosisPool,
	OsmosisPoolAsset,
	Pool,
	PoolAsset,
	TokenBalance,
} from "@/types"
import { amountToCoin, toDecimalGamm, toViewDenom } from "./numbers"
import { BigNumber } from "bignumber.js"
import { toMilliseconds, toSeconds } from "duration-fns"
import useBank from "@/store/bank"
import useConfig from "@/store/config"
import usePools from "@/store/pools"
import usePrices from "@/store/prices"
import { mapLockableDuration } from "./duration"
import { compact, max, reduce, sortBy, uniqBy } from "lodash"
import { getDaysInYear, parseISO } from "date-fns"
import { apply, parse } from "duration-fns"
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
	const totalPoolGamm = new BigNumber(pool.total_shares.amount)
	const totalTokenGamm = new BigNumber(rawCoin.token.amount) // For example, total BTSG inside the pool
	const weightPercentage = new BigNumber(rawCoin.weight)
		.div(pool.total_weight)
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
					fantoken: token.fantoken,
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
		const pool_assets = [...pool.pool_assets]
		let liquidity = new BigNumber("0")
		let userLiquidity = new BigNumber("0")
		let bonded = new BigNumber("0")

		const coins = sortBy(
			pool_assets.map((asset) => {
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
			}),
			"token.fantoken"
		)

		let availableLPTokens = new BigNumber("0")
		const availableBalances: Coin[] = bankStore.osmosisBalance.filter(
			(coin) => coin.denom === `gamm/pool/${pool.id}`
		)

		for (const availableBalance of availableBalances) {
			availableLPTokens = availableLPTokens.plus(availableBalance.amount)
		}

		const lockableDurationAprRaw: LockableDurationWithApr[] =
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

				const extraGauges = compact(
					extraGauge.map((gauge) =>
						gaugeToGaugeToken(pool, duration, gauge, liquidity.toString(), tokens)
					)
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

				const coinTokens = uniqBy(
					extraGauges.map((gauge) => gauge.coins).flat(),
					"denom"
				)

				return {
					...duration,
					bondedCoin,
					unbondedCoins,
					coinTokens,
					extraGauges,
					osmosisApr,
					apr: calculateTotalApr(pool, duration, liquidity.toString()),
					totalApr: totalApr.toString(),
				}
			})

		const lockableDurationApr: LockableDurationWithApr[] = []

		let prevDurationApr: LockableDurationWithApr | undefined = undefined

		for (const durationApr of lockableDurationAprRaw) {
			let totalApr = new BigNumber(durationApr.totalApr)

			if (prevDurationApr) {
				totalApr = totalApr.plus(prevDurationApr.totalApr)
			}

			lockableDurationApr.push({
				...durationApr,
				totalApr: totalApr.toString(),
			})

			prevDurationApr = {
				...durationApr,
				totalApr: totalApr.toString(),
			}
		}

		const maxIncentivizedApr = max(
			lockableDurationApr.map((duration) =>
				new BigNumber(duration.totalApr).toNumber()
			)
		)

		const lpLiquidity = new BigNumber(userLiquidity).minus(bonded).toString()

		return {
			...pool,
			coins: compact(coins),
			lockableDurationApr,
			APR: new BigNumber(maxIncentivizedApr ?? "0").toString(),
			liquidity: liquidity.toString(),
			userLiquidity: userLiquidity.toString(),
			lpLiquidity,
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
): GaugeToken | undefined => {
	const poolStore = usePools()
	const numEpochsPaidOver = parseInt(gauge.num_epochs_paid_over)
	const filledEpochs = parseInt(gauge.filled_epochs)
	const leftEpochs = numEpochsPaidOver - filledEpochs

	if (leftEpochs <= 0) {
		return
	}

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

	let endTime = parseISO(gauge.start_time).toISOString()
	const epochDuration = poolStore.epochDuration

	if (epochDuration) {
		const duration = parse({
			seconds: epochDuration.duration * leftEpochs,
		})

		endTime = apply(new Date(), duration).toISOString()
	}

	const totalApr = new BigNumber(
		calculateTotalExternalApr(
			pool,
			gauge,
			lockableDuration,
			liquidityPool,
			tokens
		)
	)

	return {
		...gauge,
		numEpochsPaidOver,
		filledEpochs,
		leftEpochs,
		coins,
		endTime,
		apr: totalApr.toString(),
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
				const total_weight = new BigNumber(distrInfo.total_weight)
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
						total_weight.gt(0) &&
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
							potWeight.div(total_weight)
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

	const lockExtraGauge = poolsStore.lockedExtraGagues.find(
		(bondedGauge) => bondedGauge.gaugeID === extraGauge?.id
	)

	const epochDuration = poolsStore.epochDuration

	let apr = new BigNumber("0")

	if (extraGauge && lockExtraGauge && epochDuration) {
		apr = new BigNumber(
			getExternalPoolApr(
				pool,
				extraGauge,
				lockExtraGauge,
				epochDuration,
				liquidityPool,
				tokens
			)
		)
	}

	return apr.toString()
}

export const getExternalPoolApr = (
	pool: OsmosisPool,
	gauge: Gauge,
	lpLockedForGauge: LockedGauge,
	epochDuration: LockableDuration,
	liquidityPool: string,
	tokens: TokenBalance[]
): string => {
	const poolTVL = new BigNumber(liquidityPool)
	const daysInYear = getDaysInYear(new Date())
	const daysInYearToSeconds = toSeconds({ days: daysInYear })

	if (poolTVL.gt(0)) {
		let totalAPR = new BigNumber("0")

		// Distribution coins
		for (const coin of gauge.coins) {
			const token = findTokenByIBCDenom(tokens, coin.denom)

			if (token) {
				const amount = new BigNumber(coin.amount)
				const viewCoin = amountToCoin(amount.toString(), token)

				if (viewCoin) {
					// Distribution amount by dollar price reference
					const distributionAmount = new BigNumber(viewCoin.amount).multipliedBy(
						token.price ?? "0"
					)

					const yearDistributionAmount = distributionAmount
						.multipliedBy(daysInYearToSeconds)
						.div(
							new BigNumber(epochDuration.duration).multipliedBy(
								gauge.num_epochs_paid_over
							)
						)

					const lpLockedRatio = new BigNumber(lpLockedForGauge.lockSum).div(
						pool.total_shares.amount
					)

					const bondedLiquidity = poolTVL.multipliedBy(lpLockedRatio)

					const APR = yearDistributionAmount.div(bondedLiquidity)

					totalAPR = totalAPR.plus(APR)
				}
			}
		}

		return totalAPR.toString()
	}

	return "0"
}
