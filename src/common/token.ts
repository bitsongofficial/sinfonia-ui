import { Token, TokenBalance } from "@/types"

export const tokenWithDefaults = (token: Token): Token => {
	const logoExtensions = Object.keys(token.logos)
	const logoExtension = logoExtensions.pop()
	let defaultLogo = undefined

	if (logoExtension) {
		defaultLogo = token.logos[logoExtension]
	}

	return {
		...token,
		logos: {
			...token.logos,
			default: defaultLogo,
		},
	}
}

export const mapTokensWithDefaults = (tokens: Token[]): Token[] => {
	return tokens.map((token) => tokenWithDefaults(token))
}

export const findTokenByIBCDenom = (tokens: TokenBalance[], denom: string) => {
	return tokens.find((token) => {
		if (!token.ibcEnabled) {
			const coinLookup = token.coinLookup.find(
				(coin) => coin.viewDenom === token.symbol
			)

			if (coinLookup) {
				return coinLookup.chainDenom === denom
			}

			return undefined
		}

		return token.ibc.osmosis.destDenom === denom
	})
}
