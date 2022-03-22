import { Coin } from '@cosmjs/proto-signing';
import { sinfoniaClient } from '@/services'
import { acceptHMRUpdate, defineStore } from 'pinia'
import useAuth from '@/store/auth'

export interface BankState {
  loading: boolean
  osmosisBalance: Coin[]
  bitsongBalance: Coin[]
  fantokensBalance: Coin[]
  lockedCoinsBalance: Coin[]
  totalMintedFantokens: Coin[]
  totalBurnedFantokens: Coin[]
}

const useBank = defineStore('bank', {
  state: (): BankState => ({
    loading: false,
    osmosisBalance: [],
    bitsongBalance: [],
    fantokensBalance: [],
    lockedCoinsBalance: [],
    totalMintedFantokens: [],
    totalBurnedFantokens: []
  }),
  actions: {
    async init() {
      try {
        this.loading = true

        this.totalMintedFantokens = await sinfoniaClient.totalMintedFantokens()
        this.totalBurnedFantokens = await sinfoniaClient.totalBurnedFantokens()
      } catch (error) {
        console.error(error)
        throw error;
      } finally {
        this.loading = false;
      }
    },
    async loadBalances() {
      try {
				const authStore = useAuth()
				const bitsongAddress = authStore.bitsongAddress
				const osmosisAddress = authStore.osmosisAddress
        this.loading = true

        if (bitsongAddress && osmosisAddress) {
					const data = await sinfoniaClient.balances(bitsongAddress, osmosisAddress)

          if (data) {
            this.osmosisBalance = data.osmosisBalance
            this.bitsongBalance = data.bitsongBalance
            this.fantokensBalance = data.fantokensBalance
            this.lockedCoinsBalance = data.lockedCoinsBalance
          }
				}
      } catch (error) {
        console.error(error)
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBank, import.meta.hot))
}

export default useBank
