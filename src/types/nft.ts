export interface CollectionLinkRequest {
	key: string
	value: string
}

export interface CreateCollectionRequest {
	image?: File
	cover?: File
	name: string
	symbol: string
	uri: string
	description: string
	links: CollectionLinkRequest[]
}
