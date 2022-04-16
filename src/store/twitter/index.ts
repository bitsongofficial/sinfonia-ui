import { TweetAuthor } from "@/types"
import { acceptHMRUpdate, defineStore } from "pinia"
import { getTweetAuthors } from "@/services/twitter"

export interface AuthState {
	loading: boolean
	authors: TweetAuthor[]
}

const useTwitter = defineStore("twitter", {
	state: (): AuthState => ({
		loading: false,
		authors: [],
	}),
	actions: {
		async loadAuthors() {
			try {
				this.loading = true
				const result = await getTweetAuthors()

				this.authors = result.docs
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
