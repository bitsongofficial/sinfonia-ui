import { CoinLookup, OsmosisPool, OsmosisPoolAsset, Pool, PoolAsset } from '@/types'
import { toViewDenom } from './numbers'
import useBank from '@/store/bank'
import useConfig from '@/store/config'
import { BigNumber } from 'bignumber.js'

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

				liquidity = liquidity.plus(coinLiquidity.multipliedBy(coin1.token.price))
			}
		}

		if (rawCoin2) {
			coin2 = tokenToPoolAsset(pool, rawCoin2)

			if (coin2) {
				const coinLiquidity = new BigNumber(coin2.token.amount)

				liquidity = liquidity.plus(coinLiquidity.multipliedBy(coin2.token.price))
			}
		}

		return ({
			...pool,
			coin1,
			coin2,
			APR: '0',
			liquidity: liquidity.toString(),
			userLiquidity: userLiquidity.toString(),
			bonded: bonded.toString()
		})
	})
}