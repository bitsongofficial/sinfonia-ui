import { TweetAuthor } from "@/types"
import { acceptHMRUpdate, defineStore } from "pinia"
import { getTweetAuthors } from "@/services/twitter"

export interface AuthState {
	loading: boolean
	authors: TweetAuthor[]
	totalAuthors: number
	totalEligibles: number
	totalAccounts: number
	totalPages: number
	currentPage: number
	hasPrevPage: boolean
	hasNextPage: boolean
}

const useTwitter = defineStore("twitter", {
	state: (): AuthState => ({
		loading: false,
		authors: [],
		totalAuthors: 0,
		totalEligibles: 0,
		totalAccounts: 0,
		totalPages: 0,
		currentPage: 1,
		hasPrevPage: false,
		hasNextPage: false,
	}),
	actions: {
		async loadAuthors(page = 1, search?: string) {
			try {
				this.loading = true
				this.currentPage = page
				const result = await getTweetAuthors(50, this.currentPage, search)

				this.authors = result.docs
				this.totalAuthors = result.totalDocs
				this.totalEligibles = result.eligibleAccounts
				this.totalAccounts = result.totalAccounts
				this.totalPages = result.totalPages
				this.hasPrevPage = result.hasPrevPage
				this.hasNextPage = result.hasNextPage
			} catch (error) {
				console.error(error)
				throw error
			} finally {
				this.loading = false
			}
		},
	},
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useTwitter, import.meta.hot))
}

export default useTwitter
