import { BaseToken, Token } from './config'

export interface Balance {
	total?: string
	available?: string
	bonded?: string
	totalFiat?: string
	availableFiat?: string
	bondedFiat?: string
}

export type ChainBalance = BaseToken & Balance

export interface TokenBalance extends Token, Balance {
	price?: string
	marketCap?: string
	circulatingSupply?: string
	totalMintedTokens?: string
	totalBurnedTokens?: string
	chains?: ChainBalance[]
}
