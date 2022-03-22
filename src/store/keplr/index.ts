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

				if (window.keplr && configStore.mainToken) {
					const stakeCurrency = tokenToKeplrCoin(configStore.mainToken, configStore.mainToken.symbol);
					const currencies: AppCurrency[] = [];
					const feeCurrencies: AppCurrency[] = [];

					for (const lookup of configStore.mainToken.coinLookup) {
						const coin = tokenToKeplrCoin(configStore.mainToken, lookup.viewDenom)
	
						if (coin) {
							currencies.push(coin);
							feeCurrencies.push(coin);
						}
					}

					if (stakeCurrency) {
						await window.keplr.experimentalSuggestChain({
							chainId: configStore.mainToken.chainID,
							chainName: configStore.mainToken.name,
							rpc: configStore.mainToken.rpcURL,
							rest: configStore.mainToken.apiURL,
							stakeCurrency,
							bip44: {
								coinType: configStore.mainToken.coinType,
							},
							bech32Config: {
								bech32PrefixAccAddr: configStore.mainToken.addressPrefix,
								bech32PrefixAccPub: configStore.mainToken.addressPrefix + 'pub',
								bech32PrefixValAddr: configStore.mainToken.addressPrefix + 'valoper',
								bech32PrefixValPub: configStore.mainToken.addressPrefix + 'valoperpub',
								bech32PrefixConsAddr: configStore.mainToken.addressPrefix + 'valcons',
								bech32PrefixConsPub: configStore.mainToken.addressPrefix + 'valconspub',
							},
							currencies,
							feeCurrencies,
							coinType: configStore.mainToken.coinType,
							gasPriceStep: {
								low: 0.01,
								average: 0.025,
								high: 0.04,
							},
							features: ['stargate', 'ibc-transfer', 'no-legacy-stdTx', 'ibc-go'],
						});

						await window.keplr.enable(configStore.mainToken.chainID);
	
						const offlineSigner = await window.keplr.getOfflineSignerAuto(configStore.mainToken.chainID);
						const accounts = [...await offlineSigner.getAccounts()];

						if (configStore.tokens) {
							for (const token of configStore.tokens) {
								await window.keplr.enable(token.chainID);
								const offlineTokenSigner = await window.keplr.getOfflineSignerAuto(token.chainID);
								const tokenAccounts = [...await offlineTokenSigner.getAccounts()];

								accounts.push(...tokenAccounts)
							}
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
	}
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useKeplr, import.meta.hot))
}

export default useKeplr;