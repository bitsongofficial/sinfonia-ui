export interface GraphQLPageInfo {
	__typename: string
	startCursor: string
	endCursor: string
	hasPreviousPage: boolean
	hasNextPage: boolean
}

export interface GraphQLEdge<T> {
	__typename: string
	cursor: string
	node: T
}

export interface GraphQLData<T> {
	__typename: string
	totalCount: number
	pageInfo: GraphQLPageInfo
	edges?: GraphQLEdge<T>[]
	nodes?: T[]
}

export type GraphQLResponse<T extends string, K> = {
	[key in T]: GraphQLData<K>
}

export interface GraphQLPodcast {
	__typename: string
	_id: string
	title: string
	description: string
	original_feed_url: string
	link: string
	image: string
	author: string
	copyright: string
	language: string
	type: string
	explicit: string
	status_code: number
	status: string
	created_at: string
	updated_at: string
	last_parsed_at: string
}
