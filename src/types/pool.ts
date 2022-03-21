import {Coin} from '@/types/coin'

export interface Pool {
    name: string,
    coin1: Coin,
    coin2: Coin,
    APR: number,
    liquidity: number,
    swapFee: number,
    coin1Percentage: number,
}

export interface PoolUser {
    liquidity: number,
    bonded: number,
}

export interface UserPoolView {
    pool: Pool,
    user: PoolUser,
}