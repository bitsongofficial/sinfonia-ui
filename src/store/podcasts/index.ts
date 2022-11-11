import { ipfsClient, sinfoniaClient } from "@/services"
import {
	ContractWithDetails,
	BS721InitMsg,
	CreatePodcastRequest,
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
		async createPodcast(codeId: number, payload: CreatePodcastRequest) {
			const transactionManagerStore = useTransactionManager()
			const authStore = useAuth()
			const loadingNotification = notifyLoading(
				"Uploading",
				"Uploading data to IPFS"
			)

			try {
				this.creatingPodcast = true

				if (payload.image && authStore.bitsongAddress) {
					const [image] = payload.image
					const imageCID = await ipfsClient.upload(image.file as File)

					const metadata = {
						image: `ipfs://${imageCID}`,
						description: payload.description,
						type: "podcast",
						category: payload.category,
						language: payload.language,
					}

					// NOTO: Add podcast schema types and validation inside bitsongjs
					/* CollectionMetadataSchema.parse(metadata) */

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

						router.replace(`/podcasts/${contractAddressAttr.value}/details`)
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
		async loadEpisodesMetadata() {
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
		async loadEpisodes(address: string) {
			try {
				this.loadingEpisodes = true

				this.episodes = compact(await sinfoniaClient.nfts(address))

				await this.loadEpisodesMetadata()
			} catch (error) {
				console.error(error)
				throw error
			} finally {
				this.loadingEpisodes = false
			}
		},
		async loadPodcastsMetadata() {
			try {
				this.loading = true

				const requests = compact(
					this.sinfoniaPodcasts.map((collection) => {
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
		async loadPodcast(address: string) {
			try {
				this.loading = true

				const results = [
					await sinfoniaClient.contractWithDetails<BS721InitMsg>(address),
				]

				this.podcasts = compact(results)

				await this.loadPodcastsMetadata()
			} catch (error) {
				console.error(error)
				throw error
			} finally {
				this.loading = false
			}
		},
		async loadPodcasts(codeId: number) {
			try {
				this.loading = true

				this.podcasts = compact(
					await sinfoniaClient.contractsWithDetails<BS721InitMsg>(codeId)
				)

				await this.loadPodcastsMetadata()
			} catch (error) {
				console.error(error)
				throw error
			} finally {
				this.loading = false
			}
		},
	},
	getters: {
		sinfoniaEpisodes: ({ episodes, episodesMetdata }): BitsongNFT[] => {
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
		episode(): (tokenId: string) => BitsongNFT | undefined {
			return (tokenId: string) =>
				this.sinfoniaEpisodes.find((episode) => episode.token_id === tokenId)
		},
		sinfoniaPodcasts: ({ podcasts, podcastsMetadata }): BitsongCollection[] => {
			return podcasts
				.map((podcast) => {
					const initEntry = podcast.history?.result.find(
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
						address: podcast.address,
						code_id: podcast.code_id,
						creator: podcast.creator,
						admin: podcast.admin,
						label: podcast.label,
						init: initEntry?.msg,
						metadata,
					}
				})
				.reverse()
		},
		myPodcasts(): BitsongCollection[] {
			const authStore = useAuth()

			if (authStore.bitsongAddress) {
				return this.sinfoniaPodcasts.filter(
					(podcast) => podcast.creator === authStore.bitsongAddress
				)
			}

			return []
		},
		podcast(): (address: string) => BitsongCollection | undefined {
			return (address: string) =>
				this.sinfoniaPodcasts.find((podcast) => podcast.address === address)
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
