import { FilePondFile } from "filepond"
import { CosmWasmContractInfo, BS721InitMsg } from "./cosmwasm"
import { NftTokenInfo } from "./nft"

export interface PodcastITunes {
	author: string
	channel_type: string
	explicit: boolean
	category: string[]
	image: string
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

/*  {
	"guid": "",
	"title": "episode title",
	"description": "episode description",
	"itunes": {
			"image": "ipfs://...",
			"explicit": false
	},
	"enclosure": {
			"url": "ipfs://...",
			"media_type": "audio/mpeg",
			"length": 200000
	},
	"pub_date": "1668794407"
} */
export interface PodcastEpisodeEnclosure {
	url: string
	media_type: string
	length: number // In bytes
}

export interface PodcastEpisodeExtension {
	guid: string
	title: string
	description: string
	itunes: PodcastITunes
	enclosure: PodcastEpisodeEnclosure
	pub_date: string
}

export interface PodcastEpisode extends Omit<NftTokenInfo, "extension"> {
	extension: PodcastEpisodeExtension
}
