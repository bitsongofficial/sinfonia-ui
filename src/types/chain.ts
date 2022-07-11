export interface ChainResponse<T> {
	height: string
	result: T
}

export interface ChainError {
	code: number
	message: string
	details: string[]
}

export interface ChainPagination {
	next_key: string | null
	total: string
}

export interface ChainPaginationParams {
	"pagination.limit"?: string
	"pagination.key"?: string
}

export type ChainData<T extends string, K> = {
	[key in T]: K
}

export type ChainPaginationResponse<T extends string, K> = ChainData<T, K> & {
	pagination: ChainPagination
}

export interface DenomUnit {
	denom: string
	exponent: number
	aliases: string[]
}
