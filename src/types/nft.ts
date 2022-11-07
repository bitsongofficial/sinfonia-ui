import {
	CollectionMetadata,
	NFTMetadata,
	NFTMetadataAttribute,
} from "@bitsongjs/nft"
import { FilePondFile } from "filepond"
import { BS721InitMsg, CosmWasmContractInfo } from "./cosmwasm"
import { NftInfoResponse } from "@bitsongjs/contracts/dist/codegen/BS721Base.types"

export interface CreateNFTRequest {
	paymentAddress: string
	sellerFee: number
	name: string
	tokenId: string
	media?: FilePondFile[] | null
	cover?: FilePondFile[] | null
	description: string
	attributes: NFTMetadataAttribute[]
}

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

export interface BitsongNFT extends NftTokenInfo {
	metadata?: NFTMetadata
}

export interface NftTokenInfo extends NftInfoResponse {
	token_id: string
}

export type NFTMediaType = "audio" | "video" | "image"
