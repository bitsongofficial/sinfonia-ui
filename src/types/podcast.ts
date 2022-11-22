import { FilePondFile } from "filepond"
import { CosmWasmContractInfo, BS721InitMsg } from "./cosmwasm"
import { NftTokenInfo } from "./nft"

export interface BaseITunes {
	explicit: boolean
	image: string
}

export interface PodcastITunes extends BaseITunes {
	author: string
	channel_type: string
	category: string[]
}

export interface PodcastInitMsg extends Omit<BS721InitMsg, "uri" | "name"> {
	title: string
	description: string
	language: string
	link: string
	itunes: PodcastITunes
}

export interface Podcast extends CosmWasmContractInfo {
	init?: PodcastInitMsg
}

export interface CreatePodcastRequest
	extends Omit<PodcastInitMsg, "itunes" | "minter"> {
	image?: FilePondFile[] | null
	itunesAuthor: string
	itunesChannelType: string
	itunesExplicit: boolean
	itunesCategory: string
}

/**
 * Podcast Episode Definitions
 */

export interface PodcastEpisodeEnclosure {
	url: string
	media_type: string
	length: number // In bytes
}

export interface PodcastEpisodeExtension {
	guid: string
	title: string
	description: string
	itunes: BaseITunes
	enclosure: PodcastEpisodeEnclosure
	pub_date: string
}

export interface PodcastEpisode extends Omit<NftTokenInfo, "extension"> {
	extension: PodcastEpisodeExtension
}

export interface CreateEpisodeRequest {
	paymentAddress: string
	sellerFee: number
	title: string
	tokenId: string
	media?: FilePondFile[] | null
	cover?: FilePondFile[] | null
	description: string
	explicit: boolean
}
