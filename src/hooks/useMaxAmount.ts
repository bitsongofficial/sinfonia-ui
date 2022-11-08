import { FeeType, TokenWithAddress } from "@/types"
import { Ref, ComputedRef } from "vue"
import { BigNumber } from "bignumber.js"
import { getCoinLookup, getFees } from "@/common"

export const useMaxAmount = (
	availableCoins: Ref<string | undefined>,
	network: ComputedRef<TokenWithAddress | undefined>,
	transactionType = "default"
) => {
	const getMaxAmount = (): string => {
		if (network.value) {
			const feeData = getFees(network.value, transactionType)

			if (availableCoins.value) {
				if (feeData && !network.value.fantoken) {
					const feeOption = feeData.fee.find(
						(feeType) => feeType.type === FeeType.AVERAGE
					)

					if (feeOption) {
						const coinLookup = getCoinLookup(network.value, feeOption.denom)

						if (coinLookup) {
							const coinDecimals = new BigNumber(feeOption.amount).times(
								coinLookup.chainToViewConversionFactor
							)

							return new BigNumber(availableCoins.value).minus(coinDecimals).toString()
						}
					}
				} else {
					return new BigNumber(availableCoins.value).toString()
				}
			}
		}

		return "0"
	}

	return {
		getMaxAmount,
	}
}
