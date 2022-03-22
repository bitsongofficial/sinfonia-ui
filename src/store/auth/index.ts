import { isValidAddress } from '@/common';
import { Session, SessionType } from '@/types'
import { acceptHMRUpdate, defineStore } from 'pinia'
import useKeplr from '@/store/keplr'
import useConfig from '@/store/config'
import useBank from '@/store/bank';

export interface AuthState {
	loading: boolean
	session?: Session
}

const useAuth = defineStore('auth', {
	state: (): AuthState => ({
		loading: false,
	}),
	actions: {
		async signIn() {
      try {
				const keplrStore = useKeplr()
				const bankStore = useBank()
        this.loading = true

				await keplrStore.init()

				this.session = {
					sessionType: SessionType.KEPLR,
					addresses: keplrStore.accounts.map(el => el.address)
				}

				bankStore.init()
      } catch (error) {
        console.error(error)
        throw error
      } finally {
        this.loading = false
      }
    },
	},
	getters: {
		bitsongAddress({ session }) {
			const configStore = useConfig()
			const bitsongToken = configStore.bitsongToken

			if (session && bitsongToken) {
				return session.addresses.find(address => isValidAddress(address, bitsongToken.addressPrefix))
			}
		},
		osmosisAddress({ session }) {
			const configStore = useConfig()
			const osmosisToken = configStore.osmosisToken

			if (session && osmosisToken) {
				return session.addresses.find(address => isValidAddress(address, osmosisToken.addressPrefix))
			}
		},
	}
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot))
}

export default useAuth