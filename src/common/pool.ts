import { CoinLookup, LockableDuration, LockableDurationWithApr, OsmosisPool, OsmosisPoolAsset, Pool, PoolAsset } from '@/types'
import { toViewDenom } from './numbers'
import { BigNumber } from 'bignumber.js'
import { toMilliseconds } from 'duration-fns'
import useBank from '@/store/bank'
import useConfig from '@/store/config'
import usePools from '@/store/pools'
import usePrices from '@/store/prices'
import { mapLockableDuration } from './duration'
import { max } from 'lodash'

export const gammToPoolAmount = (currentAmount: BigNumber, totalPoolGamm: BigNumber, totalTokenGamm: BigNumber, coinLookup: CoinLookup) => {
	const shareRation = currentAmount.div(totalPoolGamm)

	const amount = totalTokenGamm.multipliedBy(shareRation).toString()

	return toViewDenom(amount.toString(), coinLookup.chainToViewConversionFactor)
}

export const tokenToPoolAsset = (pool: OsmosisPool, rawCoin: OsmosisPoolAsset): PoolAsset | undefined => {
	const configStore = useConfig()
	const bankStore = useBank()
	const token = configStore.findTokenByIBCDenom(rawCoin.token.denom)
	const totalPoolGamm = new BigNumber(pool.totalShares.amount)
	const totalTokenGamm = new BigNumber(rawCoin.token.amount)  // For example, total BTSG inside the pool
	const weightPercentage = new BigNumber(rawCoin.weight).div(pool.totalWeight).toNumber()

	if (token) {
		const coinLookup = token.coinLookup.find(
			(coin) => coin.viewDenom === token.symbol
		)

		let userTotalGamm = new BigNumber('0')
		let bondedAmount = new BigNumber('0')
		let availableAmount = new BigNumber('0')

		const bondedBalances = bankStore.lockedCoinsBalance.filter(coin => coin.denom === `gamm/pool/${pool.id}`)
		const availableBalances = bankStore.osmosisBalance.filter(coin => coin.denom === `gamm/pool/${pool.id}`)

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
					price: token.price ?? '0',
					name: token.name,
					symbol: token.symbol,
					logos: token.logos,
					amount: toViewDenom(totalTokenGamm.toString(), coinLookup.chainToViewConversionFactor),
					userTotalAmount: gammToPoolAmount(userTotalGamm, totalPoolGamm, totalTokenGamm, coinLookup),
					availableAmount: gammToPoolAmount(availableAmount, totalPoolGamm, totalTokenGamm, coinLookup),
					bondedAmount: gammToPoolAmount(bondedAmount, totalPoolGamm, totalTokenGamm, coinLookup)
				},
				weightPercentage,
				weight: rawCoin.weight,
			}
		}
	}
}

export const mapPools = (rawPools: OsmosisPool[]): Pool[] => {
	const poolsStore = usePools()

	return rawPools.map(pool => {
		const poolAssets = [...pool.poolAssets]
		let rawCoin1 = poolAssets.shift()
		let rawCoin2 = poolAssets.pop()
		let coin1: PoolAsset | undefined = undefined
		let coin2: PoolAsset | undefined = undefined
		let liquidity = new BigNumber('0')
		let userLiquidity = new BigNumber('0')
		let bonded = new BigNumber('0')

		if (rawCoin1) {
			coin1 = tokenToPoolAsset(pool, rawCoin1)

			if (coin1) {
				const coinLiquidity = new BigNumber(coin1.token.amount)
				const userTotalAmount = new BigNumber(coin1.token.userTotalAmount)
				const bondedAmount = new BigNumber(coin1.token.bondedAmount)

				liquidity = liquidity.plus(coinLiquidity.multipliedBy(coin1.token.price))
				userLiquidity = userLiquidity.plus(userTotalAmount.multipliedBy(coin1.token.price))
				bonded = bonded.plus(bondedAmount.multipliedBy(coin1.token.price))
			}
		}

		if (rawCoin2) {
			coin2 = tokenToPoolAsset(pool, rawCoin2)

			if (coin2) {
				const coinLiquidity = new BigNumber(coin2.token.amount)
				const userTotalAmount = new BigNumber(coin2.token.userTotalAmount)
				const bondedAmount = new BigNumber(coin2.token.bondedAmount)

				liquidity = liquidity.plus(coinLiquidity.multipliedBy(coin2.token.price))
				userLiquidity = userLiquidity.plus(userTotalAmount.multipliedBy(coin2.token.price))
				bonded = bonded.plus(bondedAmount.multipliedBy(coin2.token.price))
			}
		}

		const lockableDurationApr: LockableDurationWithApr[] = poolsStore.lockableDuration.map(duration => {
			return {
				...duration,
				apr: calculateTotalApr(pool, duration, liquidity.toString())
			}
		})

		const maxIncentivizedApr = max(lockableDurationApr.map(
			duration => new BigNumber(duration.apr).toNumber()
		))

		return ({
			...pool,
			coin1,
			coin2,
			lockableDurationApr,
			APR: new BigNumber(maxIncentivizedApr ?? '0').toString(),
			liquidity: liquidity.toString(),
			userLiquidity: userLiquidity.toString(),
			bonded: bonded.toString()
		})
	})
}

export const calculateTotalApr = (pool: OsmosisPool, duration: LockableDuration, liquidityPool: string) => {
	const poolsStore = usePools()

	let apr = new BigNumber(getPoolApr(pool, duration, liquidityPool))

	for (const lockableDuration of poolsStore.lockableDuration) {
		if (lockableDuration.milliseconds >= duration.milliseconds) {
			break;
		}

		apr = apr.plus(getPoolApr(pool, lockableDuration, liquidityPool));
	}

	return apr.toString()
}

/*
	Liquidity Pool is a Fiat value in USD
*/
export const getPoolApr = (pool: OsmosisPool, duration: LockableDuration, liquidityPool: string): string => {
	const poolsStore = usePools()
	const configStore = useConfig()
	const pricesStore = usePrices()
	const incentivizedPool = poolsStore.incentivizedPoolById(pool.id)
	const lockDuration = poolsStore.lockableDuration.find(el => el.rawDuration === duration.rawDuration)
	const gaugeId = poolsStore.incentivizedPoolByIdAndDuration(pool.id, duration.rawDuration)
	const mintParams = poolsStore.mintParams
	const distrInfo = poolsStore.distrInfo
	const osmosisToken = configStore.osmosisToken

	if (incentivizedPool && lockDuration && gaugeId && mintParams) {
		const mintDenom = mintParams.mint_denom
		const epochIdentifier = mintParams.epoch_identifier

		if (mintDenom && epochIdentifier && osmosisToken) {
			const epoch = poolsStore.epochByIdentifier(epochIdentifier)

			if (epoch && epoch.duration && distrInfo) {
				const totalWeight = new BigNumber(distrInfo.total_weight);
				const poolTVL = new BigNumber(liquidityPool)
				const potWeightRecord = distrInfo.records.find(
					record => record.gauge_id === gaugeId.gauge_id
				)

				const osmosisPrice = pricesStore.getPriceById(osmosisToken.coinGeckoId)
				
				if (osmosisPrice && potWeightRecord) {
					const potWeight = new BigNumber(potWeightRecord.weight)
					const coinLookup = osmosisToken.coinLookup.find(
						(coin) => coin.viewDenom === osmosisToken.symbol
					)

					if (totalWeight.gt(0) && potWeight.gt(0) && poolTVL.gt(0) && poolsStore.epochProvisions && coinLookup) {
						const epochProvision = new BigNumber(toViewDenom(poolsStore.epochProvisions, coinLookup.chainToViewConversionFactor))
						const epochDuration = mapLockableDuration(epoch.duration)
						const numEpochPerYear = toMilliseconds({ years: 1 }) / epochDuration.milliseconds
						const yearProvision = epochProvision.multipliedBy(numEpochPerYear)

						const yearProvisionToPots = yearProvision.multipliedBy(
							mintParams.distribution_proportions.pool_incentives
						)

						const yearProvisionToPot = yearProvisionToPots.multipliedBy(potWeight.div(totalWeight))

						const yearProvisionToPotPrice = new BigNumber(osmosisPrice).multipliedBy(yearProvisionToPot)

						return yearProvisionToPotPrice.div(poolTVL).toString()
					}
				}
			}
		}
	}

	return '0'
}