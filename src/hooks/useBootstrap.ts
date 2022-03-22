import useBank from '@/store/bank'
import useConfig from '@/store/config'
import usePools from '@/store/pools'

const useBootstrap = () => {
	const configStore = useConfig()
	const poolsStore = usePools()
	const bankStore = useBank()

	const bootstrap = async () => {
		try {
			await configStore.init()
			poolsStore.init()
			bankStore.init()
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	return {
		bootstrap
	}
}

export default useBootstrap