import { FilePondFile } from "filepond"
import { CosmWasmContractInfo, BS721InitMsg } from "./cosmwasm"

export interface PodcastITunes {
	author: string
	channel_type: string
	explicit: boolean
	category: string
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

export interface CreatePodcastRequest extends Omit<PodcastInitMsg, "itunes"> {
	image?: FilePondFile[] | null
	itunesAuthor: string
	itunesChannel_type: string
	itunesExplicit: boolean
	itunesCategory: string
}
