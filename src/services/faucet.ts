import { FaucetRequest, FaucetResponse } from "@/types"
import { externalClient } from "./external-client"

export const getFaucet = async (request: FaucetRequest) => {
	const { data: result } = await externalClient.get<FaucetResponse>(
		import.meta.env.VITE_BITSONG_FAUCET_URL,
		{ params: request }
	)

	if (result.error) {
		throw new Error(result.error)
	}

	if (result.status === "error") {
		throw new Error("Faucet get error, try later")
	}

	return result
}
