import { ipfsClient, sinfoniaClient } from "@/services"
import {
	ContractWithDetails,
	BS721InitMsg,
	CreateCollectionRequest,
} from "@/types"
import { compact } from "lodash"
import { acceptHMRUpdate, defineStore } from "pinia"

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
		async createCollection(payload: CreateCollectionRequest) {
			try {
				this.creatingCollection = true

				if (payload.cover && payload.image) {
					const [image] = payload.image
					const imageCID = await ipfsClient.upload(image.file as File)

					console.log(imageCID)
				}
			} catch (error) {
				console.error(error)
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
