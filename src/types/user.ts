import { Coin } from "./coin"

export interface User {
	totalAssets: number
	bondedAssets: number
	coins: UserCoinInfo[]
}

export interface UserCoinInfo {
	coin: Coin
	total: number
	bonded: number
}
