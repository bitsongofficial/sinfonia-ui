import { sinfoniaClient } from '@/services'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { IncentivizedPool, OsmosisPool, Pool } from '@/types'
import { mapPools } from '@/common'

export interface PoolsState {
  loading: boolean
  rawPools: OsmosisPool[]
  incentivizedPools: IncentivizedPool[]
}

const usePools = defineStore('pools', {
  state: (): PoolsState => ({
    loading: false,
    rawPools: [],
    incentivizedPools: []
  }),
  actions: {
    async init() {
      try {
        this.loading = true

        const [rawPools, incentivizedPools] = await Promise.all([
          sinfoniaClient.pools(),
          sinfoniaClient.incentivizedPools()
        ])

				this.rawPools = rawPools
				this.incentivizedPools = incentivizedPools
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
			return mapPools(rawPools)
		},
	},
  persistedState: {
		persist: false,
	}
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePools, import.meta.hot))
}

export default usePools
