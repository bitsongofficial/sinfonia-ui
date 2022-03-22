import { sinfoniaClient } from '@/services'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { OsmosisPool } from '@/types'
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
		pools({ rawPools }) {
			const configStore = useConfig()

			return rawPools
		},
	}
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePools, import.meta.hot))
}

export default usePools
