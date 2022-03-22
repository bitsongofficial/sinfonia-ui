import { sinfoniaClient } from '@/services'
import { Session, SessionType, Token } from '@/types'
import { acceptHMRUpdate, defineStore } from 'pinia'
import useKeplr from '@/store/keplr'

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
        this.loading = true

				await keplrStore.init()

				this.session = {
					sessionType: SessionType.KEPLR,
					address: keplrStore.accounts[0].address
				}
      } catch (error) {
        console.error(error)
        throw error
      } finally {
        this.loading = false
      }
    },
	}
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot))
}

export default useAuth;