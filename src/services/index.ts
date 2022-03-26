import SinfoniaClient from "./sinfonia-client"
import CoinGeckoClient from "./coingecko-client"
import { endpoints } from "@/configs/config"

const sinfoniaClient = new SinfoniaClient(
	import.meta.env.VITE_BITSONG_CONFIG_URL
)
const coinGeckoClient = new CoinGeckoClient(endpoints.coingecko)

export { sinfoniaClient, coinGeckoClient }
