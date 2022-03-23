import { acceptHMRUpdate, defineStore } from 'pinia'
import { AccountData } from '@cosmjs/proto-signing';
import { tokenToKeplrCoin } from '@/common';
import { AppCurrency } from '@keplr-wallet/types';
import useConfig from '@/store/config';

export interface KeplrState {
	accounts: AccountData[]
  initialized: boolean
	error?: Error
	loading: boolean
}

const useKeplr = defineStore('keplr', {
	state: (): KeplrState => ({
		accounts: [],
		initialized: false,
		loading: false
	}),
	actions: {
		async init() {
      try {
        this.loading = true
				const configStore = useConfig()

				if (window.keplr && configStore.bitsongToken) {
					const stakeCurrency = tokenToKeplrCoin(configStore.bitsongToken, configStore.bitsongToken.symbol)
					const currencies: AppCurrency[] = []
					const feeCurrencies: AppCurrency[] = []

					for (const lookup of configStore.bitsongToken.coinLookup) {
						const coin = tokenToKeplrCoin(configStore.bitsongToken, lookup.viewDenom)
	
						if (coin) {
							currencies.push(coin)
							feeCurrencies.push(coin)
						}
					}

					if (stakeCurrency) {
						await window.keplr.experimentalSuggestChain({
							chainId: configStore.bitsongToken.chainID,
							chainName: configStore.bitsongToken.name,
							rpc: configStore.bitsongToken.rpcURL,
							rest: configStore.bitsongToken.apiURL,
							stakeCurrency,
							bip44: {
								coinType: configStore.bitsongToken.coinType,
							},
							bech32Config: {
								bech32PrefixAccAddr: configStore.bitsongToken.addressPrefix,
								bech32PrefixAccPub: configStore.bitsongToken.addressPrefix + 'pub',
								bech32PrefixValAddr: configStore.bitsongToken.addressPrefix + 'valoper',
								bech32PrefixValPub: configStore.bitsongToken.addressPrefix + 'valoperpub',
								bech32PrefixConsAddr: configStore.bitsongToken.addressPrefix + 'valcons',
								bech32PrefixConsPub: configStore.bitsongToken.addressPrefix + 'valconspub',
							},
							currencies,
							feeCurrencies,
							coinType: configStore.bitsongToken.coinType,
							gasPriceStep: {
								low: 0.01,
								average: 0.025,
								high: 0.04,
							},
							features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx', 'ibc-go'],
						})

						await window.keplr.enable(configStore.bitsongToken.chainID)
	
						const offlineSigner = await window.keplr.getOfflineSignerAuto(configStore.bitsongToken.chainID)
						const accounts = [...await offlineSigner.getAccounts()]

						if (configStore.osmosisToken) {
							await window.keplr.enable(configStore.osmosisToken.chainID);
							const offlineTokenSigner = await window.keplr.getOfflineSignerAuto(configStore.osmosisToken.chainID)
							const tokenAccounts = [...await offlineTokenSigner.getAccounts()]

							accounts.push(...tokenAccounts)
						}

						this.accounts = [...accounts]
						this.initialized = true
					}
				}
      } catch (error) {
        console.error(error)
				this.error = error as Error
        throw error
      } finally {
        this.loading = false
      }
    },
	},
  persistedState: {
		persist: false,
	}
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useKeplr, import.meta.hot))
}

export default useKeplr