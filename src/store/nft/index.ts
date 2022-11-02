import { ipfsClient, sinfoniaClient } from "@/services"
import {
	ContractWithDetails,
	BS721InitMsg,
	CreateCollectionRequest,
} from "@/types"
import { compact } from "lodash"
import { acceptHMRUpdate, defineStore } from "pinia"
import { convertListToMap, notifyError, notifyLoading } from "@/common"
import { CollectionMetadata, CollectionMetadataSchema } from "@bitsongjs/nft"
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
			const loadingNotification = notifyLoading(
				"Uploading",
				"Uploading data to IPFS"
			)

			try {
				this.creatingCollection = true

				if (payload.cover && payload.image && authStore.bitsongAddress) {
					const [image] = payload.image
					const imageCID = await ipfsClient.upload(image.file as File)

					const [cover] = payload.cover
					const coverCID = await ipfsClient.upload(cover.file as File)

					const metadata: CollectionMetadata = {
						image: `ipfs://${imageCID}`,
						cover: `ipfs://${coverCID}`,
						description: payload.description,
						external_urls: convertListToMap(payload.links, "key", "value"),
					}

					// Check if metadata schema is valid
					CollectionMetadataSchema.parse(metadata)

					const metadataFile = new File(
						[JSON.stringify(metadata)],
						`${payload.name}_metadata`,
						{
							type: "application/json",
						}
					)

					const metadataCID = await ipfsClient.upload(metadataFile)

					transactionManagerStore.executeContract<BS721InitMsg>(
						codeId,
						payload.name,
						{
							minter: authStore.bitsongAddress,
							name: payload.name,
							symbol: payload.symbol,
							uri: `ipfs://${metadataCID}`,
						}
					)
				}
			} catch (error) {
				console.error(error)
				notifyError("Upload failed", (error as Error).message)
				throw error
			} finally {
				this.creatingCollection = false
				loadingNotification()
			}
		},
		async loadCollection(address: string) {
			try {
				this.loading = true

				const results = [
					await sinfoniaClient.contractWithDetails<BS721InitMsg>(address),
				]

				this.collections = compact(results)
			} catch (error) {
				console.error(error)
				throw error
			} finally {
				this.loading = false
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
	getters: {
		myCollections({ collections }) {
			const authStore = useAuth()

			if (authStore.bitsongAddress) {
				return collections.filter(
					(collection) => collection.creator === authStore.bitsongAddress
				)
			}

			return []
		},
		collection({ collections }) {
			return (address: string) =>
				collections.find((collection) => collection.address === address)
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
