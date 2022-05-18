import { Leaderboard, TweetAuthor } from "@/types"
import { acceptHMRUpdate, defineStore } from "pinia"
import { getLeaderboard, getTweetAuthors } from "@/services/twitter"
import { amountToCoin, gtCompare } from "@/common"
import useConfig from "../config"

export interface AuthState {
	loading: boolean
	authors: TweetAuthor[]
	leaderboard: Leaderboard[]
	totalAuthors: number
	totalLeaderboard: number
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
		leaderboard: [],
		totalAuthors: 0,
		totalLeaderboard: 0,
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
				this.totalEligibles = result.eligibleAccounts ?? 0
				this.totalAccounts = result.totalAccounts ?? 0
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
		async loadLeaderboard(page = 1, search?: string) {
			try {
				this.loading = true
				this.currentPage = page
				const result = await getLeaderboard(50, this.currentPage, search)

				this.leaderboard = result.docs
				this.totalLeaderboard = result.totalDocs
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
	getters: {
		leaderboardMap: ({ leaderboard }) => {
			const configStore = useConfig()
			const bitsongToken = configStore.bitsongToken

			return leaderboard.map((author) => {
				let balance = { ...author.balance }

				if (bitsongToken) {
					const coin = amountToCoin(balance.amount, bitsongToken)

					if (coin) {
						balance = { ...coin }
					}
				}

				return {
					...author,
					balance,
					valid: gtCompare(balance.amount, "10000"),
				}
			})
		},
	},
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useTwitter, import.meta.hot))
}

export default useTwitter
