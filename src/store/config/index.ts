import { sinfoniaClient } from '@/services'
import { AssetListConfig } from '@/types'
import { acceptHMRUpdate, defineStore } from 'pinia'

export interface ConfigState {
  loading: boolean
  assetsConfig?: AssetListConfig
}

const useConfig = defineStore('config', {
  state: (): ConfigState => ({
    loading: false,
  }),
  actions: {
    async init() {
      try {
        this.loading = true

        this.assetsConfig = await sinfoniaClient.assetLists()
      } catch (error) {
        console.error(error)
        throw error
      } finally {
        this.loading = false
      }
    },
  },
  getters: {
    bitsongToken: ({ assetsConfig }) => assetsConfig ? assetsConfig.bitsongToken : undefined,
    osmosisToken: ({ assetsConfig }) => assetsConfig ? assetsConfig.osmosisToken : undefined,
    fantokens: ({ assetsConfig }) => assetsConfig ? assetsConfig.fantokens : [],
    tokens: ({ assetsConfig }) => assetsConfig ? assetsConfig.tokens : [],
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useConfig, import.meta.hot))
}

export default useConfig
