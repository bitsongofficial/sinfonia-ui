import { BigNumber } from "bignumber.js"
import { coinGeckoClient } from "@/services"
import { CoinGeckoPriceResponse } from "@/types"
import { acceptHMRUpdate, defineStore } from "pinia"
import useConfig from "@/store/config"
import usePools from "@/store/pools"
import { calculateSpotPrice } from "@/common/numbers"

export interface PricesState {
	loading: boolean
	coinGeckoPrices?: CoinGeckoPriceResponse
}

const usePrices = defineStore("prices", {
	state: (): PricesState => ({
		loading: false,
		coinGeckoPrices: undefined,
	}),
	actions: {
		async init() {
			try {
				const configStore = useConfig()
				this.loading = true

				const ids = configStore.allMainTokens.map((token) => token.coinGeckoId)

				const response = await coinGeckoClient.simplePrices(ids, ["usd"])

				this.coinGeckoPrices = response.data
			} catch (error) {
				console.error(error)
				throw error
			} finally {
				this.loading = false
			}
		},
	},
	getters: {
		getPriceById: ({ coinGeckoPrices }) => {
			return (id: string) => {
				if (coinGeckoPrices) {
					return coinGeckoPrices[id]["usd"]
				}

				return "0"
			}
		},
		getFantokensPrices: ({ coinGeckoPrices }) => {
			const configStore = useConfig()
			const poolsStore = usePools()
			const bitsongToken = configStore.bitsongToken

			if (coinGeckoPrices && bitsongToken) {
				return configStore.rawFantokens.map((fantoken) => {
					let price = "0"

					const coinLookup = fantoken.coinLookup.find(
						(coin) => coin.viewDenom === fantoken.symbol
					)

					if (fantoken.routes) {
						const pool = poolsStore.poolById(fantoken.routes.poolID)

						if (pool) {
							const btsgAsset = pool.poolAssets.find(
								(asset) => asset.token.denom === bitsongToken.ibc.osmosis.destDenom
							)

							const fantokenAsset = pool.poolAssets.find(
								(asset) => asset.token.denom === fantoken.ibc.osmosis.destDenom
							)

							if (btsgAsset && fantokenAsset) {
								const inSpotPrice = calculateSpotPrice(fantokenAsset, btsgAsset)
								const spotPriceDec = inSpotPrice.isEqualTo(0)
									? new BigNumber(0)
									: new BigNumber(1).div(inSpotPrice)

								const destCoinPrice = coinGeckoPrices[bitsongToken.coinGeckoId]["usd"]

								if (destCoinPrice) {
									const res = spotPriceDec.multipliedBy(destCoinPrice)

									if (!res.isNaN()) {
										price = res.toFixed(10)
									}
								}
							}
						}
					}

					const denom = coinLookup
						? coinLookup.fantokenDenom ?? fantoken.symbol
						: fantoken.symbol

					return {
						denom,
						price,
					}
				})
			}
		},
		getFantokenPriceById() {
			return (denom: string) => {
				if (this.getFantokensPrices) {
					const fantokenPrice = this.getFantokensPrices.find(
						(price) => price.denom === denom
					)

					if (fantokenPrice) {
						return fantokenPrice.price
					}
				}

				return "0"
			}
		},
		btsgPrice({ coinGeckoPrices }) {
			const configStore = useConfig()

			if (coinGeckoPrices && configStore.bitsongToken) {
				return coinGeckoPrices[configStore.bitsongToken.coinGeckoId]["usd"]
			}

			return "0"
		},
	},
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(usePrices, import.meta.hot))
}

export default usePrices
