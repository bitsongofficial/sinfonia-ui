import { Token } from "@/types"
import { AppCurrency, ChainInfo } from "@keplr-wallet/types"
import { tokenToKeplrCoin } from "./network"

export const tokenToExperimentalSuggestChain = (
	token: Token
): ChainInfo | undefined => {
	const stakeCurrency = tokenToKeplrCoin(token, token.symbol)
	const currencies: AppCurrency[] = []
	const feeCurrencies: AppCurrency[] = []

	for (const lookup of token.coinLookup) {
		const coin = tokenToKeplrCoin(token, lookup.viewDenom)

		if (coin) {
			currencies.push(coin)
			feeCurrencies.push(coin)
		}
	}

	if (stakeCurrency) {
		return {
			chainId: token.chainID,
			chainName: token.name,
			rpc: token.rpcURL,
			rest: token.apiURL,
			stakeCurrency,
			bip44: {
				coinType: token.coinType,
			},
			bech32Config: {
				bech32PrefixAccAddr: token.addressPrefix,
				bech32PrefixAccPub: token.addressPrefix + "pub",
				bech32PrefixValAddr: token.addressPrefix + "valoper",
				bech32PrefixValPub: token.addressPrefix + "valoperpub",
				bech32PrefixConsAddr: token.addressPrefix + "valcons",
				bech32PrefixConsPub: token.addressPrefix + "valconspub",
			},
			currencies,
			feeCurrencies,
			coinType: token.coinType,
			gasPriceStep: {
				low: 0.01,
				average: 0.025,
				high: 0.04,
			},
			features: ["ibc-transfer", "ibc-go"],
		}
	}
}
