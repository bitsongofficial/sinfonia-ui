import { Coin } from "@cosmjs/proto-signing"
import { BaseToken } from "./config"
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
	userTotalAmount: string
	availableAmount: string
	bondedAmount: string
}

export interface PoolAsset {
	token: PoolToken
	weightPercentage: number
	weight: string
}

export interface Pool extends OsmosisPool {
	coin1?: PoolAsset
	coin2?: PoolAsset
	lockableDurationApr: LockableDurationWithApr[]
	APR: string
	liquidity: string
	userLiquidity: string
	bonded: string
	availableLPTokens: string
	availableLPBalances: Coin[]
}
