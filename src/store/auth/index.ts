import { isValidAddress } from "@/common"
import { Session, SessionType } from "@/types"
import { acceptHMRUpdate, defineStore } from "pinia"
import useKeplr from "@/store/keplr"
import useConfig from "@/store/config"
import useBank from "@/store/bank"

export interface AuthState {
	loading: boolean
	session?: Session
	token?: string
}

const useAuth = defineStore("auth", {
	state: (): AuthState => ({
		loading: false,
		session: undefined,
		token: undefined,
	}),
	actions: {
		async signIn() {
			try {
				if (window.keplr) {
					const keplrStore = useKeplr()
					const bankStore = useBank()
					this.loading = true

					await keplrStore.init()

					this.session = {
						sessionType: SessionType.KEPLR,
						addresses: keplrStore.accounts.map((el) => el.address),
					}

					bankStore.loadBalances()

					if (!this.token) {
						await this.generateToken()
					}
				}
			} catch (error) {
				console.error(error)
				throw error
			} finally {
				this.loading = false
			}
		},
		async generateToken() {
			const configStore = useConfig()

			if (window.keplr && this.bitsongAddress && configStore.bitsongToken) {
				const payload = {
					domain: import.meta.env.VITE_SINFONIA_GRAPHQL_API,
					expire_at: Math.round(Date.now() / 1000) + 120, // seconds
				}

				const signedData = await window.keplr.signArbitrary(
					configStore.bitsongToken.chainID,
					this.bitsongAddress,
					JSON.stringify(payload)
				)

				const w3t = {
					signer: this.bitsongAddress,
					payload,
					...signedData,
				}

				const token = window.btoa(JSON.stringify(w3t))

				this.token = token

				return token
			}
		},
	},
	getters: {
		bitsongAddress({ session }) {
			const configStore = useConfig()
			const bitsongToken = configStore.bitsongToken

			if (session && bitsongToken) {
				return session.addresses.find((address) =>
					isValidAddress(address, bitsongToken.addressPrefix)
				)
			}
		},
		osmosisAddress({ session }) {
			const configStore = useConfig()
			const osmosisToken = configStore.osmosisToken

			if (session && osmosisToken) {
				return session.addresses.find((address) =>
					isValidAddress(address, osmosisToken.addressPrefix)
				)
			}
		},
		getAddress({ session }) {
			return (addressPrefix: string) => {
				if (session) {
					return session.addresses.find((address) =>
						isValidAddress(address, addressPrefix)
					)
				}
			}
		},
	},
	persistedState: {
		persist: true,
		includePaths: ["loading", "session", "token"],
	},
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useAuth, import.meta.hot))
}

export default useAuth
