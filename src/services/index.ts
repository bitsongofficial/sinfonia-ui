import SinfoniaClient from "./sinfonia-client"
import CoinGeckoClient from "./coingecko-client"
import { endpoints } from "@/configs/config"
import { IPFSStorageProvider } from "@bitsongjs/storage"

const sinfoniaClient = new SinfoniaClient(
	import.meta.env.VITE_BITSONG_CONFIG_URL
)

const ipfsClient = new IPFSStorageProvider(
	`${import.meta.env.VITE_IPFS_SERVER_URL}api/v0`
)

const coinGeckoClient = new CoinGeckoClient(endpoints.coingecko)

export { sinfoniaClient, coinGeckoClient, ipfsClient }
