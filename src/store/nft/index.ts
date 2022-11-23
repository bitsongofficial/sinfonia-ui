import { ipfsClient, sinfoniaClient } from "@/services"
import {
	ContractWithDetails,
	BS721InitMsg,
	CreateCollectionRequest,
	BitsongCollection,
	NftTokenInfo,
	CreateNFTRequest,
	BitsongNFT,
} from "@/types"
import { compact } from "lodash"
import { acceptHMRUpdate, defineStore } from "pinia"
import {
	convertListToMap,
	fromIPFSURIToHttps,
	notifyError,
	notifyLoading,
	validateIPFSURI,
} from "@/common"
import {
	CollectionMetadata,
	CollectionMetadataSchema,
	NFTMetadata,
	NFTMetadataSchema,
} from "@bitsongjs/nft"
import { ContractCodeHistoryOperationType } from "cosmjs-types/cosmwasm/wasm/v1/types"
import { getIPFSFile } from "@/services/ipfs"
import useTransactionManager from "@/store/transaction-manager"
import useAuth from "@/store/auth"
import { router } from "@/configs/routes"
import { DeliverTxResponse, logs } from "@cosmjs/stargate"
import { collectionsWhitelist } from "@/configs/config"

export interface NFTState {
	loading: boolean
	loadingNFTs: boolean
	loadingNFTsMetadata: boolean
	creatingCollection: boolean
	creatingNFT: boolean
	collections: ContractWithDetails<BS721InitMsg>[]
	collectionsMetadata: Record<string, CollectionMetadata>
	nfts: NftTokenInfo[]
	nftsMetadata: Record<string, NFTMetadata>
}

const useNFT = defineStore("nft", {
	state: (): NFTState => ({
		loading: false,
		loadingNFTs: false,
		loadingNFTsMetadata: false,
		creatingCollection: false,
		creatingNFT: false,
		collections: [],
		collectionsMetadata: {},
		nfts: [],
		nftsMetadata: {},
	}),
	actions: {
		async mintNFT(collectionAddress: string, payload: CreateNFTRequest) {
			const transactionManagerStore = useTransactionManager()
			const authStore = useAuth()

			const loadingNotification = notifyLoading(
				"Uploading",
				"Uploading data to IPFS"
			)

			try {
				this.creatingCollection = true

				if (payload.media && authStore.bitsongAddress) {
					const [media] = payload.media
					const mediaCID = await ipfsClient.upload(media.file as File)

					let coverCID: string | undefined = undefined

					if (payload.cover && payload.cover.length > 0) {
						const [cover] = payload.cover
						coverCID = await ipfsClient.upload(cover.file as File)
					}

					const metadata: NFTMetadata = {
						image: `ipfs://${coverCID ? coverCID : mediaCID}`,
						name: payload.name,
						description: payload.description,
						attributes: payload.attributes,
						animation_url: coverCID ? `ipfs://${mediaCID}` : undefined,
					}

					// Check if metadata schema is valid
					NFTMetadataSchema.parse(metadata)

					const metadataFile = new File(
						[JSON.stringify(metadata)],
						`${payload.name}_metadata`,
						{
							type: "application/json",
						}
					)

					const metadataCID = await ipfsClient.upload(metadataFile)

					const onComplete = () => {
						router.replace(`/nfts/${collectionAddress}/id/${payload.tokenId}`)
					}

					transactionManagerStore.executeContract(
						collectionAddress,
						{
							mint: {
								owner: authStore.bitsongAddress,
								payment_address: payload.paymentAddress,
								seller_fee: payload.sellerFee,
								token_id: payload.tokenId,
								token_uri: `ipfs://${metadataCID}`,
							},
						},
						[],
						true,
						onComplete
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

					const onComplete = (tx: DeliverTxResponse) => {
						const parsedLogs = logs.parseRawLog(tx.rawLog)
						const contractAddressAttr = logs.findAttribute(
							parsedLogs,
							"instantiate",
							"_contract_address"
						)

						router.replace(`/nfts/${contractAddressAttr.value}/details`)
					}

					transactionManagerStore.instantiateContract<BS721InitMsg>(
						codeId,
						payload.name,
						{
							minter: authStore.bitsongAddress,
							name: payload.name,
							symbol: payload.symbol,
							uri: `ipfs://${metadataCID}`,
						},
						true,
						onComplete
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
		async loadNFTsMetadata() {
			try {
				this.loadingNFTsMetadata = true

				const requests = compact(
					this.nfts.map((nft) => {
						if (nft.token_uri) {
							const uri = validateIPFSURI(nft.token_uri)

							if (uri) {
								return getIPFSFile<NFTMetadata>(uri)
							}
						}
					})
				)

				const metadataResponses = await Promise.all(requests)

				const nftsMetadata = Object.assign({}, this.nftsMetadata)

				for (const metadataResponse of metadataResponses) {
					const metadata: NFTMetadata = {
						...metadataResponse.result,
						image: fromIPFSURIToHttps(metadataResponse.result.image),
						animation_url: metadataResponse.result.animation_url
							? fromIPFSURIToHttps(metadataResponse.result.animation_url)
							: undefined,
					}

					nftsMetadata[metadataResponse.CID] = metadata
				}

				this.nftsMetadata = nftsMetadata
			} catch (error) {
				console.error(error)
				throw error
			} finally {
				this.loadingNFTsMetadata = false
			}
		},
		async loadNFTs(address: string) {
			try {
				this.loadingNFTs = true

				this.nfts = compact(await sinfoniaClient.nfts(address))

				await this.loadNFTsMetadata()
			} catch (error) {
				console.error(error)
				throw error
			} finally {
				this.loadingNFTs = false
			}
		},
		async loadCollectionsMetadata() {
			try {
				this.loading = true

				const requests = compact(
					this.bitsongCollections.map((collection) => {
						if (collection.init) {
							const uri = validateIPFSURI(collection.init.uri)

							if (uri) {
								return getIPFSFile<CollectionMetadata>(uri)
							}
						}
					})
				)

				const metadataResponses = await Promise.all(requests)

				const collectionsMetadata = Object.assign({}, this.collectionsMetadata)

				for (const metadataResponse of metadataResponses) {
					const metadata: CollectionMetadata = {
						...metadataResponse.result,
						cover: fromIPFSURIToHttps(metadataResponse.result.cover),
						image: fromIPFSURIToHttps(metadataResponse.result.image),
					}

					collectionsMetadata[metadataResponse.CID] = metadata
				}

				this.collectionsMetadata = collectionsMetadata
			} catch (error) {
				console.error(error)
				throw error
			} finally {
				this.loading = false
			}
		},
		async loadCollection(address: string) {
			try {
				this.loading = true

				const results = [
					await sinfoniaClient.contractWithDetails<BS721InitMsg>(address),
				]

				this.collections = compact(results)

				await this.loadCollectionsMetadata()
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

				const colletions = await sinfoniaClient.contractsWithDetails<BS721InitMsg>(
					codeId
				)

				this.collections = compact(colletions)

				console.log("LOAD COLLECTIONS", this.collections)

				await this.loadCollectionsMetadata()
			} catch (error) {
				console.error(error)
				throw error
			} finally {
				this.loading = false
			}
		},
	},
	getters: {
		bitsongNFTs: ({ nfts, nftsMetadata }): BitsongNFT[] => {
			return nfts
				.map((nft) => {
					let metadata: NFTMetadata | undefined = undefined

					if (nft.token_uri) {
						const uri = validateIPFSURI(nft.token_uri)

						if (uri) {
							metadata = nftsMetadata[uri]
						}
					}

					return {
						...nft,
						metadata,
					}
				})
				.reverse()
		},
		nft(): (tokenId: string) => BitsongNFT | undefined {
			return (tokenId: string) =>
				this.bitsongNFTs.find((nft) => nft.token_id === tokenId)
		},
		bitsongCollections: ({
			collections,
			collectionsMetadata,
		}): BitsongCollection[] => {
			return collections
				.map((collection) => {
					const initEntry = collection.history?.result.find(
						(el) =>
							el.operation ===
							ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT
					)

					let metadata: CollectionMetadata | undefined = undefined

					if (initEntry) {
						const uri = validateIPFSURI(initEntry.msg.uri)

						if (uri) {
							metadata = collectionsMetadata[uri]
						}
					}

					return {
						address: collection.address,
						code_id: collection.code_id,
						creator: collection.creator,
						admin: collection.admin,
						label: collection.label,
						init: initEntry?.msg,
						metadata,
					}
				})
				.reverse()
		},
		whitelistCollections(): BitsongCollection[] {
			return this.bitsongCollections.filter((collection) =>
				collectionsWhitelist.includes(collection.address)
			)
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
