import { Token } from "@/types"

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
