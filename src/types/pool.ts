import { Coin } from '@/types/coin'
import { BaseToken } from './config'
import { OsmosisPool, PoolParams } from './osmosis'


export interface PoolUser {
	liquidity: number
	bonded: number
}

export interface UserPoolView {
	pool: Pool
	user: PoolUser
}

export interface PoolToken extends BaseToken {
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
	APR: number
	liquidity: number
	userLiquidity: number
	bonded: number
	coin1Percentage: number
}
