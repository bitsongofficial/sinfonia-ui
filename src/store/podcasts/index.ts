import { ipfsClient, sinfoniaClient } from "@/services"
import {
	ContractWithDetails,
	CreatePodcastRequest,
	Podcast,
	PodcastInitMsg,
	NftTokenInfo,
	BitsongNFT,
	CreateEpisodeRequest,
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
import { NFTMetadata, NFTMetadataSchema } from "@bitsongjs/nft"
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
	podcasts: ContractWithDetails<PodcastInitMsg>[]
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
		episodes: [],
		episodesMetdata: {},
	}),
	actions: {
		async createEpisode(
			collectionAddress: string,
			payload: CreateEpisodeRequest
		) {
			const transactionManagerStore = useTransactionManager()
			const authStore = useAuth()

			const loadingNotification = notifyLoading(
				"Uploading",
				"Uploading data to IPFS"
			)

			try {
				this.creatingEpisode = true

				if (payload.media && authStore.bitsongAddress) {
					const [media] = payload.media
					const mediaCID = await ipfsClient.upload(media.file as File)

					let coverCID: string | undefined = undefined

					if (payload.cover && payload.cover.length > 0) {
						const [cover] = payload.cover
						coverCID = await ipfsClient.upload(cover.file as File)
					}

					const metadata = {
						image: `ipfs://${coverCID ? coverCID : mediaCID}`,
						name: payload.name,
						description: payload.description,
						animation_url: coverCID ? `ipfs://${mediaCID}` : undefined,
					}

					// Check if metadata schema is valid
					// NOTO: Add podcast episode schema types and validation inside bitsongjs
					/* NFTMetadataSchema.parse(metadata) */

					const metadataFile = new File(
						[JSON.stringify(metadata)],
						`${payload.name}_metadata`,
						{
							type: "application/json",
						}
					)

					const metadataCID = await ipfsClient.upload(metadataFile)

					const onComplete = () => {
						router.replace(
							`/podcasts/${collectionAddress}/episode/${payload.tokenId}`
						)
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
				this.creatingEpisode = false
				loadingNotification()
			}
		},
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

					const onComplete = (tx: DeliverTxResponse) => {
						const parsedLogs = logs.parseRawLog(tx.rawLog)
						const contractAddressAttr = logs.findAttribute(
							parsedLogs,
							"instantiate",
							"_contract_address"
						)

						router.replace(`/podcasts/${contractAddressAttr.value}/details`)
					}

					transactionManagerStore.instantiateContract<PodcastInitMsg>(
						codeId,
						payload.title,
						{
							title: payload.title,
							description: payload.description,
							language: payload.language,
							link: payload.link,
							minter: authStore.bitsongAddress,
							symbol: payload.symbol,
							itunes: {
								author: payload.itunesAuthor,
								channel_type: payload.itunesChannel_type,
								category: payload.itunesCategory,
								explicit: payload.itunesExplicit,
								image: `ipfs://${imageCID}`,
							},
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
		async loadPodcast(address: string) {
			try {
				this.loading = true

				const results = [
					await sinfoniaClient.contractWithDetails<PodcastInitMsg>(address),
				]

				this.podcasts = compact(results)
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
					await sinfoniaClient.contractsWithDetails<PodcastInitMsg>(codeId)
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
		sinfoniaPodcasts: ({ podcasts }): Podcast[] => {
			return podcasts
				.map((podcast) => {
					const initEntry = podcast.history?.result.find(
						(el) =>
							el.operation ===
							ContractCodeHistoryOperationType.CONTRACT_CODE_HISTORY_OPERATION_TYPE_INIT
					)

					if (initEntry) {
						initEntry.msg.itunes.image = fromIPFSURIToHttps(
							initEntry.msg.itunes.image
						)
					}

					return {
						address: podcast.address,
						code_id: podcast.code_id,
						creator: podcast.creator,
						admin: podcast.admin,
						label: podcast.label,
						init: initEntry?.msg,
					}
				})
				.reverse()
		},
		myPodcasts(): Podcast[] {
			const authStore = useAuth()

			if (authStore.bitsongAddress) {
				return this.sinfoniaPodcasts.filter(
					(podcast) => podcast.creator === authStore.bitsongAddress
				)
			}

			return []
		},
		podcast(): (address: string) => Podcast | undefined {
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