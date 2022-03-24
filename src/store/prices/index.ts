import { coinGeckoClient } from '@/services'
import { CoinGeckoPriceResponse } from '@/types'
import { acceptHMRUpdate, defineStore } from 'pinia'
import useConfig from '@/store/config'

export interface PricesState {
  loading: boolean
  coinGeckoPrices?: CoinGeckoPriceResponse
}

const usePrices = defineStore('prices', {
  state: (): PricesState => ({
    loading: false,
    coinGeckoPrices: undefined,
  }),
  actions: {
    async init() {
      try {
        const configStore = useConfig()
        this.loading = true

				const ids = configStore.allMainTokens.map(token => token.coinGeckoId)

        const response = await coinGeckoClient.simplePrices(ids, ['usd'])

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
					return coinGeckoPrices[id]['usd']
				}

				return '0'
			}
		}
	}
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePrices, import.meta.hot))
}

export default usePrices
