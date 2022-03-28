import { SessionType } from "@/types"
import useAuth from "@/store/auth"
import useBank from "@/store/bank"
import useConfig from "@/store/config"
import usePools from "@/store/pools"
import usePrices from "@/store/prices"
import useTransactionManager from "@/store/transaction-manager"

const useBootstrap = () => {
	const configStore = useConfig()
	const authStore = useAuth()
	const poolsStore = usePools()
	const bankStore = useBank()
	const pricesStore = usePrices()
	const transactionManagerStore = useTransactionManager()

	const checkAuthState = () => {
		if (
			authStore.session &&
			authStore.session.sessionType === SessionType.KEPLR
		) {
			authStore.signIn()
			transactionManagerStore.subscribe()
		}
	}

	const bootstrap = async () => {
		try {
			await configStore.init()
			pricesStore.init()
			poolsStore.init()
			bankStore.init()

			checkAuthState()
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	window.addEventListener("keplr_keystorechange", () => {
		checkAuthState()
	})

	return {
		bootstrap,
	}
}

export default useBootstrap
