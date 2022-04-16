import { acceptHMRUpdate, defineStore } from "pinia"
import { AccountData } from "@cosmjs/proto-signing"
import { tokenToExperimentalSuggestChain, tokenToKeplrCoin } from "@/common"
import { AppCurrency } from "@keplr-wallet/types"
import useConfig from "@/store/config"

export interface KeplrState {
	accounts: AccountData[]
	initialized: boolean
	error?: Error
	loading: boolean
}

const useKeplr = defineStore("keplr", {
	state: (): KeplrState => ({
		accounts: [],
		initialized: false,
		loading: false,
	}),
	actions: {
		async init() {
			try {
				this.loading = true
				const configStore = useConfig()

				if (window.keplr) {
					window.keplr.defaultOptions = {
						sign: {
							preferNoSetFee: true,
						},
					}

					const chainIds = configStore.allMainTokens.map((token) => token.chainID)

					for (const token of configStore.allMainTokens) {
						const experimentalChain = tokenToExperimentalSuggestChain(token)

						if (experimentalChain) {
							await window.keplr.experimentalSuggestChain(experimentalChain)
						}
					}

					await window.keplr.enable(chainIds)

					const accounts: AccountData[] = []

					for (const token of configStore.allMainTokens) {
						const offlineSigner = await window.keplr.getOfflineSignerAuto(
							token.chainID
						)

						const tokenAccounts = [...(await offlineSigner.getAccounts())]

						accounts.push(...tokenAccounts)
					}

					this.accounts = [...accounts]
					this.initialized = true
				}
			} catch (error) {
				console.error(error)
				this.error = error as Error
				throw error
			} finally {
				this.loading = false
			}
		},
		async getAddress(chainId: string) {
			if (window.keplr) {
				await window.keplr.enable(chainId)

				const offlineSigner = await window.keplr.getOfflineSignerAuto(chainId)
				const accounts = [...(await offlineSigner.getAccounts())]

				return accounts.shift()
			}
		},
	},
	getters: {
		addresses: ({ accounts }) => accounts.map((account) => account.address),
	},
	persistedState: {
		persist: false,
	},
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useKeplr, import.meta.hot))
}

export default useKeplr
