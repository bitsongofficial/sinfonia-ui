import { sinfoniaClient } from '@/services'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { OsmosisPool, Pool, PoolAsset } from '@/types'
import useConfig from '@/store/config'

export interface PoolsState {
  loading: boolean
  rawPools: OsmosisPool[]
}

const usePools = defineStore('pools', {
  state: (): PoolsState => ({
    loading: false,
    rawPools: []
  }),
  actions: {
    async init() {
      try {
        this.loading = true

				this.rawPools = await sinfoniaClient.pools()
      } catch (error) {
        console.error(error)
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
	getters: {
		pools({ rawPools }): Pool[] {
			const configStore = useConfig()

			return rawPools.map(pool => {
        let rawCoin1 = pool.poolAssets.shift()
        let rawCoin2 = pool.poolAssets.pop()
        let coin1: PoolAsset | undefined = undefined
        let coin2: PoolAsset | undefined = undefined

        if (rawCoin1) {
          const token = configStore.findTokenByIBCDenom(rawCoin1.token.denom)

          if (token) {
            coin1 = {
              token: {
                name: token.name,
                symbol: token.symbol,
                logos: token.logos,
                amount: rawCoin1.token.amount
              },
              weight: rawCoin1.weight,
            }
          }
        }

        if (rawCoin2) {
          const token = configStore.findTokenByIBCDenom(rawCoin2.token.denom)

          if (token) {
            coin2 = {
              token: {
                name: token.name,
                symbol: token.symbol,
                logos: token.logos,
                amount: rawCoin2.token.amount
              },
              weight: rawCoin2.weight,
            }
          }
        }

        return ({
          ...pool,
          coin1,
          coin2,
          APR: 0,
          liquidity: 0,
          coin1Percentage: 0
        })
      })
		},
	}
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePools, import.meta.hot))
}

export default usePools
