import { ipfsClient, sinfoniaClient } from "@/services"
import {
	ContractWithDetails,
	BS721InitMsg,
	CreateCollectionRequest,
} from "@/types"
import { compact } from "lodash"
import { acceptHMRUpdate, defineStore } from "pinia"
import { notifyError } from "@/common"
import useTransactionManager from "@/store/transaction-manager"
import useAuth from "@/store/auth"

export interface NFTState {
	loading: boolean
	creatingCollection: boolean
	collections: ContractWithDetails<BS721InitMsg>[]
}

const useNFT = defineStore("nft", {
	state: (): NFTState => ({
		loading: false,
		creatingCollection: false,
		collections: [],
	}),
	actions: {
		async createCollection(codeId: number, payload: CreateCollectionRequest) {
			const transactionManagerStore = useTransactionManager()
			const authStore = useAuth()

			try {
				this.creatingCollection = true

				if (payload.cover && payload.image && authStore.bitsongAddress) {
					const [image] = payload.image
					const imageCID = await ipfsClient.upload(image.file as File)

					const [cover] = payload.cover
					const coverCID = await ipfsClient.upload(cover.file as File)

					transactionManagerStore.executeContract<BS721InitMsg>(
						codeId,
						payload.name,
						{
							minter: authStore.bitsongAddress,
							name: payload.name,
							symbol: payload.symbol,
							uri: "",
						}
					)
				}
			} catch (error) {
				console.error(error)
				notifyError("Upload failed", (error as Error).message)
				throw error
			} finally {
				this.creatingCollection = false
			}
		},
		async loadCollections(codeId: number) {
			try {
				this.loading = true

				this.collections = compact(
					await sinfoniaClient.contractsWithDetails<BS721InitMsg>(codeId)
				)
			} catch (error) {
				console.error(error)
				throw error
			} finally {
				this.loading = false
			}
		},
	},
	persistedState: {
		persist: false,
	},
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useNFT, import.meta.hot))
}

export default useNFT
