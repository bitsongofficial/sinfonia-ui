import { AmountBalanced, Pool } from "@/types"
import { BigNumber } from "bignumber.js"
import { Dictionary } from "lodash"

export const amountBalancer = (
	pool: Pool,
	symbol: string,
	rawAmount: string
): AmountBalanced => {
	const asset = pool.coins.find((coin) => coin.token.symbol === symbol)
	const otherAssets = pool.coins.filter((coin) => coin.token.symbol !== symbol)
	const assetAmountsMap: Dictionary<string> = {}
	let shareOutAmount = "0"

	otherAssets.forEach((coin) => {
		assetAmountsMap[coin.token.symbol] = "0"
	})

	if (asset) {
		const amount = new BigNumber(rawAmount)
		const totalShare = new BigNumber(pool.total_shares.amount)

		if (!amount.eq(0) && !totalShare.eq(0) && !amount.isNaN()) {
			const share = amount.div(asset.token.amount)
			shareOutAmount = share.multipliedBy(totalShare).toString()

			for (const otherAsset of otherAssets) {
				assetAmountsMap[otherAsset.token.symbol] = share
					.multipliedBy(otherAsset.token.amount)
					.toFixed(6)
			}
		}
	}

	return {
		assetsAmounts: assetAmountsMap,
		shareOutAmount,
	}
}
