export interface Coin {
	iconUrl: string
	name: string
	symbol: string
	price: number
}

export interface CoinExtra extends Coin {
	marketCap: number
	volume: number
	lastNDaysPrice: number[]
}
