import { Podcast } from "@/graphql/ts/graphql"
import { acceptHMRUpdate, defineStore } from "pinia"

export interface FavoriteState {
	podcastsHistory: Podcast[]
}

const useFavorite = defineStore("favorite", {
	state: (): FavoriteState => ({
		podcastsHistory: [],
	}),
	actions: {
		appendHistory(podcast: Podcast) {
			const podcasts = [...this.podcastsHistory]
			podcasts.unshift(podcast)

			this.podcastsHistory = podcasts.slice(0, 10)
		},
	},
	persistedState: {
		persist: true,
	},
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useFavorite, import.meta.hot))
}

export default useFavorite
