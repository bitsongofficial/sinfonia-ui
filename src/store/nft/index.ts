import { ipfsClient, sinfoniaClient } from "@/services"
import {
	ContractWithDetails,
	BS721InitMsg,
	CreateCollectionRequest,
	BitsongCollection,
} from "@/types"
import { compact } from "lodash"
import { acceptHMRUpdate, defineStore } from "pinia"
import { convertListToMap, notifyError, notifyLoading } from "@/common"
import { CollectionMetadata, CollectionMetadataSchema } from "@bitsongjs/nft"
import { ContractCodeHistoryOperationType } from "cosmjs-types/cosmwasm/wasm/v1/types"
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
		bitsongCollections: ({ collections }): BitsongCollection[] => {
			return collections.map((collection) => {
				const initEntry = collection.history?.result.find(
					(el) =>
						el.operation ===
						ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT
				)

				return {
					address: collection.address,
					code_id: collection.code_id,
					creator: collection.creator,
					admin: collection.admin,
					label: collection.label,
					init: initEntry?.msg,
				}
			})
		},
		myCollections(): BitsongCollection[] {
			const authStore = useAuth()

			if (authStore.bitsongAddress) {
				return this.bitsongCollections.filter(
					(collection) => collection.creator === authStore.bitsongAddress
				)
			}

			return []
		},
		collection(): (address: string) => BitsongCollection | undefined {
			return (address: string) =>
				this.bitsongCollections.find((collection) => collection.address === address)
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
