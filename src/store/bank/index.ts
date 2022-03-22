import { sinfoniaClient } from '@/services'
import { acceptHMRUpdate, defineStore } from 'pinia'
import useAuth from '@/store/auth'

export interface BankState {
  loading: boolean
}

const useBank = defineStore('bank', {
  state: (): BankState => ({
    loading: false,
  }),
  actions: {
    async init() {
      try {
				const authStore = useAuth()
				const bitsongAddress = authStore.bitsongAddress
				const osmosisAddress = authStore.osmosisAddress
        this.loading = true

				console.log(bitsongAddress)

        if (bitsongAddress && osmosisAddress) {
					const balances = await sinfoniaClient.balances(bitsongAddress, osmosisAddress)

					console.log(balances)
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
