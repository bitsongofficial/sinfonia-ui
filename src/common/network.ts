import { Token } from "@/types"
import { AppCurrency } from "@keplr-wallet/types"
import { BigNumber } from "bignumber.js"
import { compact } from "lodash"

export const tokenToKeplrCoin = (
	network: Token,
	denom: string
): AppCurrency | undefined => {
	const coinLookup = network.coinLookup.find((coin) => coin.viewDenom === denom)

	if (coinLookup) {
		const coinDecimals = new BigNumber(
			coinLookup.chainToViewConversionFactor
		).toFixed()

		return {
			// Coin denomination to be displayed to the user.
			coinDenom: coinLookup.viewDenom,
			// Actual denom (i.e. uatom, uscrt) used by the blockchain.
			coinMinimalDenom: coinLookup.chainDenom,
			// # of decimal points to convert minimal denomination to user-facing denomination.
			coinDecimals: coinDecimals.split(".")[1].length,
			// (Optional) Keplr can show the fiat value of the coin if a coingecko id is provided.
			// You can get id from https://api.coingecko.com/api/v3/coins/list if it is listed.
			coinGeckoId: network.coinGeckoId,
		}
	}
}

export const getCoinLookup = (
	network: Token,
	denom: string,
	coinLookupDenomType = "chainDenom"
) => {
	return network.coinLookup.find((coin) => coin[coinLookupDenomType] === denom)
}

export const getNetworkFee = (network: Token, transactionType?: string) => {
	const fees = network.fees

	if (transactionType) {
		const fee = fees[transactionType]

		if (fee) {
			return fee
		}
	}

	return fees.default
}

export const getFees = (network: Token, transactionType: string) => {
	const { gasEstimate, feeOptions } = getNetworkFee(network, transactionType)
	const feeOptionsMapped = feeOptions.map((fee) => {
		const coinLookup = getCoinLookup(network, fee.denom, "viewDenom")

		if (coinLookup) {
			return {
				amount: new BigNumber(fee.amount)
					.div(coinLookup.chainToViewConversionFactor)
					.toString(),
				denom: coinLookup.chainDenom,
				type: fee.type,
			}
		}
	})

	return {
		gasEstimate: String(gasEstimate),
		fee: compact(feeOptionsMapped),
	}
}
