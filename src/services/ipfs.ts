import { externalClient } from "./external-client"

export const getIPFSFile = async <T = any>(CID: string) => {
	const { data: result } = await externalClient.get<T>(
		`${import.meta.env.VITE_IPFS_SERVER_URL}ipfs/${CID}`
	)

	return {
		CID,
		result,
	}
}