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

export interface PodcastsState {
	loading: boolean
	loadingEpisodes: boolean
	loadingEpisodesMetadata: boolean
	creatingPodcast: boolean
	creatingEpisode: boolean
	podcasts: ContractWithDetails<BS721InitMsg>[]
	podcastsMetadata: Record<string, CollectionMetadata>
	episodes: NftTokenInfo[]
	episodesMetdata: Record<string, NFTMetadata>
}

const usePodcasts = defineStore("podcasts", {
	state: (): PodcastsState => ({
		loading: false,
		loadingEpisodes: false,
		loadingEpisodesMetadata: false,
		creatingPodcast: false,
		creatingEpisode: false,
		podcasts: [],
		podcastsMetadata: {},
		episodes: [],
		episodesMetdata: {},
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
				this.creatingPodcast = true

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

						router.replace(`/episodes/${contractAddressAttr.value}/details`)
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
				this.creatingPodcast = false
				loadingNotification()
			}
		},
		/* async loadNFTsMetadata() {
			try {
				this.loadingEpisodesMetadata = true

				const requests = compact(
					this.episodes.map((nft) => {
						if (nft.token_uri) {
							const uri = validateIPFSURI(nft.token_uri)

							if (uri) {
								return getIPFSFile<NFTMetadata>(uri)
							}
						}
					})
				)

				const metadataResponses = await Promise.all(requests)

				const episodesMetdata = Object.assign({}, this.episodesMetdata)

				for (const metadataResponse of metadataResponses) {
					const metadata: NFTMetadata = {
						...metadataResponse.result,
						image: fromIPFSURIToHttps(metadataResponse.result.image),
						animation_url: metadataResponse.result.animation_url
							? fromIPFSURIToHttps(metadataResponse.result.animation_url)
							: undefined,
					}

					episodesMetdata[metadataResponse.CID] = metadata
				}

				this.episodesMetdata = episodesMetdata
			} catch (error) {
				console.error(error)
				throw error
			} finally {
				this.loadingEpisodesMetadata = false
			}
		},
		async loadNFTs(address: string) {
			try {
				this.loadingEpisodes = true

				this.episodes = compact(await sinfoniaClient.episodes(address))

				await this.loadNFTsMetadata()
			} catch (error) {
				console.error(error)
				throw error
			} finally {
				this.loadingEpisodes = false
			}
		}, */
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

				const podcastsMetadata = Object.assign({}, this.podcastsMetadata)

				for (const metadataResponse of metadataResponses) {
					const metadata: CollectionMetadata = {
						...metadataResponse.result,
						cover: fromIPFSURIToHttps(metadataResponse.result.cover),
						image: fromIPFSURIToHttps(metadataResponse.result.image),
					}

					podcastsMetadata[metadataResponse.CID] = metadata
				}

				this.podcastsMetadata = podcastsMetadata
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

				this.podcasts = compact(results)

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

				this.podcasts = compact(
					await sinfoniaClient.contractsWithDetails<BS721InitMsg>(codeId)
				)

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
		bitsongNFTs: ({ episodes, episodesMetdata }): BitsongNFT[] => {
			return episodes
				.map((nft) => {
					let metadata: NFTMetadata | undefined = undefined

					if (nft.token_uri) {
						const uri = validateIPFSURI(nft.token_uri)

						if (uri) {
							metadata = episodesMetdata[uri]
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
		bitsongCollections: ({ podcasts, podcastsMetadata }): BitsongCollection[] => {
			return podcasts
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
							metadata = podcastsMetadata[uri]
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
	import.meta.hot.accept(acceptHMRUpdate(usePodcasts, import.meta.hot))
}

export default usePodcasts
