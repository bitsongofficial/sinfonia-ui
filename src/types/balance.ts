import { Coin } from "@cosmjs/proto-signing"
import { BaseToken, Token } from "./config"
import { Pool } from "./pool"

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
	chains?: ChainBalance[]
	routeDenom?: string
}

export interface FantokenRank extends TokenBalance {
	rank: number
}

export interface GammBalance {
	coin: Coin
	pool: Pool
}
