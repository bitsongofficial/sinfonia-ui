import { Coin } from "@cosmjs/proto-signing"

export interface TwitterPagination<T> {
	docs: T[]
	totalDocs: number
	offset: number
	limit: number
	totalPages: number
	page: number
	pagingCounter: number
	hasPrevPage: boolean
	hasNextPage: boolean
	prevPage: number
	nextPage: number
	eligibleAccounts?: number
	totalAccounts?: number
	snapshotDate?: string
	blockHeight?: string
}

export interface TweetAuthor {
	authorId: string
	twitterCreatedAt: string
	name: string
	username: string
	address: string
	profileImageUrl: string
	valid: boolean
	disqualified?: boolean
	createdAt: string
	updatedAt: string
}

export interface Leaderboard extends TweetAuthor {
	balance: Coin
}
