import { Pool } from "@/types"
import { BigNumber } from "bignumber.js"
import { Dictionary } from "lodash"

export const amountBalancer = (
	pool: Pool,
	symbol: string,
	rawAmount: string
): Dictionary<string> => {
	const asset = pool.coins.find((coin) => coin.token.symbol === symbol)
	const otherAssets = pool.coins.filter((coin) => coin.token.symbol !== symbol)
	const assetAmountsMap = {}

	otherAssets.forEach((coin) => {
		assetAmountsMap[coin.token.symbol] = "0"
	})

	if (asset) {
		const amount = new BigNumber(rawAmount)
		const totalShare = new BigNumber(pool.totalShares.amount)

		if (!amount.eq(0) && !totalShare.eq(0) && !amount.isNaN()) {
			const share = amount.div(asset.token.amount)

			for (const otherAsset of otherAssets) {
				assetAmountsMap[otherAsset.token.symbol] = share
					.multipliedBy(otherAsset.token.amount)
					.toFixed(6)
			}
		}
	}

	return assetAmountsMap
}
