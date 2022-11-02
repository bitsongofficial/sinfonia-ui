import { CollectionMetadata } from "@bitsongjs/nft"
import { FilePondFile } from "filepond"
import { BS721InitMsg, CosmWasmContractInfo } from "./cosmwasm"

export interface CollectionLinkRequest {
	key: string
	value: string
}

export interface CreateCollectionRequest {
	image?: FilePondFile[] | null
	cover?: FilePondFile[] | null
	name: string
	symbol: string
	description: string
	links: CollectionLinkRequest[]
}

export interface BitsongCollection extends CosmWasmContractInfo {
	init?: BS721InitMsg
	metadata?: CollectionMetadata
}
