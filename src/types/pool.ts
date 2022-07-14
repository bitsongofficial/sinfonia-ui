import { Coin } from "@cosmjs/proto-signing"
import { BaseToken, CoinLookup } from "./config"
import { LockableDurationWithApr } from "./duration"
import { OsmosisPool } from "./osmosis"

export interface PoolUser {
	liquidity: number
	bonded: number
}

export interface UserPoolView {
	pool: Pool
	user: PoolUser
}

export interface PoolToken extends BaseToken {
	price: string
	amount: string // Divided for chainToViewConversionFactor of current token
	denom: string // Denom on Osmosis
	userTotalAmount: string
	availableAmount: string
	bondedAmount: string
	coinLookup: CoinLookup
	coinDenom: string
	fantoken?: boolean
}

export interface PoolAsset {
	token: PoolToken
	weightPercentage: number
	weight: string
}

export interface Pool extends OsmosisPool {
	coins: PoolAsset[]
	lockableDurationApr: LockableDurationWithApr[]
	APR: string
	liquidity: string
	userLiquidity: string
	lpLiquidity: string
	bonded: string
	availableLPTokens: string
	availableLPBalances: Coin[]
}

export interface SwapPool {
	pool: Pool
	out: string
}
