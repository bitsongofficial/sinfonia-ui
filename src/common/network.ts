import { Token } from "@/types"
import { AppCurrency } from "@keplr-wallet/types"
import { BigNumber } from "bignumber.js"

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
