import { sinfoniaClient } from '@/services'
import { AssetListConfig, Session, Token } from '@/types'
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

				const response = await sinfoniaClient.assetLists()

				this.assetsConfig = response.data
			} catch (error) {
				console.error(error)
				throw error
			} finally {
				this.loading = false
			}
		},
	},
	getters: {
		mainToken: ({ assetsConfig }) => assetsConfig?.mainToken ?? undefined,
		fantokens: ({ assetsConfig }) => assetsConfig?.fantokens ?? [],
		tokens: ({ assetsConfig }) => assetsConfig?.tokens ?? [],
	}
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useConfig, import.meta.hot))
}

export default useConfig;