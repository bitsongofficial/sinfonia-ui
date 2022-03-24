import { OsmosisPool, OsmosisPoolAsset, PoolAsset } from '@/types'
import { toDecimalGamm, toViewDenom } from './numbers'
import useBank from '@/store/bank'
import useConfig from '@/store/config'
import BigNumber from 'bignumber.js'

export const tokenToPoolAsset = (pool: OsmosisPool, rawCoin: OsmosisPoolAsset): PoolAsset | undefined => {
	const configStore = useConfig()
	const bankStore = useBank()
	const token = configStore.findTokenByIBCDenom(rawCoin.token.denom)
	const totalPoolGamm = new BigNumber(pool.totalShares.amount)
	const totalTokenGamm = new BigNumber(rawCoin.token.amount)  // For example, total BTSG inside the pool
	const weightPercentage = new BigNumber(rawCoin.weight).div(pool.totalWeight).toString()

	if (token) {
		const coinLookup = token.coinLookup.find(
			(coin) => coin.viewDenom === token.symbol
		)

		let userTotalGamm = new BigNumber('0')
		let userAmount = '0'
		const gammBalances = bankStore.allGamms.filter(coin => coin.denom === `gamm/pool/${pool.id}`)
		
		if (gammBalances.length > 0) {
			for (const gammBalance of gammBalances) {
				userTotalGamm = userTotalGamm.plus(gammBalance.amount)
			}

			const shareRation = userTotalGamm.div(totalPoolGamm)

			userAmount = totalTokenGamm.multipliedBy(shareRation).toString()
		}

		if (coinLookup) {
			return {
				token: {
					name: token.name,
					symbol: token.symbol,
					logos: token.logos,
					amount: toViewDenom(totalTokenGamm.toString(), coinLookup.chainToViewConversionFactor),
					userAmount: toViewDenom(userAmount.toString(), coinLookup.chainToViewConversionFactor),
				},
				weightPercentage,
				weight: rawCoin.weight,
			}
		}
	}
}

export const mapPools = (rawPools: OsmosisPool[]) => {
	const bankStore = useBank()

	return rawPools.map(pool => {
		const poolAssets = [...pool.poolAssets]
		let rawCoin1 = poolAssets.shift()
		let rawCoin2 = poolAssets.pop()
		let coin1: PoolAsset | undefined = undefined
		let coin2: PoolAsset | undefined = undefined

		if (rawCoin1) {
			coin1 = tokenToPoolAsset(pool, rawCoin1)
		}

		if (rawCoin2) {
			coin2 = tokenToPoolAsset(pool, rawCoin2)
		}

		return ({
			...pool,
			coin1,
			coin2,
			APR: 0,
			liquidity: 0,
			coin1Percentage: 0
		})
	})
}