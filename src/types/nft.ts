import { FilePondFile } from "filepond"

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
