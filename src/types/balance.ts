import { BaseToken, Token } from "./config"

export interface Balance {
	total?: string
	available?: string
	denom?: string
	totalFiat?: string
	availableFiat?: string
}

export type ChainBalance = BaseToken & Balance

export interface TokenBalance extends Token, Balance {
	price?: string
	marketCap?: string
	circulatingSupply?: string
	totalMintedTokens?: string
	totalBurnedTokens?: string
	chains?: ChainBalance[]
	routeDenom?: string
}
