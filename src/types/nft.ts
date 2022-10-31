export interface CollectionLinkRequest {
	key: string
	value: string
}

export interface CreateCollectionRequest {
	name: string
	symbol: string
	uri: string
	description: string
	links: CollectionLinkRequest[]
}
