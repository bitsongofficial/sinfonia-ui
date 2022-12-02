<script setup lang="ts">
import Title from "@/components/typography/Title.vue"
import GQLPodcastCard from "@/components/cards/GQLPodcastCard.vue"
import EpisodeItem from "@/components/cards/EpisodeItem.vue"
import Spinner from "@/components/Spinner"
import { resolveIcon } from "@/common"
import { computed, onMounted, ref } from "vue"
import { QInput } from "quasar"
import { useLazyQuery } from "@vue/apollo-composable"
import { Search } from "@/graphql"
import { RouterLink, useRoute, useRouter } from "vue-router"
import useFavorite from "@/store/favorite"

const router = useRouter()
const route = useRoute()
const favoriteStore = useFavorite()

const search = route.query.s as string

const searchValue = ref(search ?? "")
const searchInput = ref<QInput>()

const currentPage = ref(1)

const { result, loading, load, fetchMore } = useLazyQuery(Search)

const totalPages = computed(() => {
	if (result.value?.searchPodcasts?.numFound) {
		return Math.ceil(result.value.searchPodcasts.numFound / 20)
	}

	return 1
})

const onSearch = () => {
	currentPage.value = 1

	load(undefined, {
		text: searchValue.value,
		start: 0,
	})

	router.push({ path: "/search", query: { s: searchValue.value } })
}

onMounted(() => {
	if (searchValue.value.length > 0) {
		onSearch()
	}
})

const loadMore = () => {
	if (!result.value) {
		return
	}

	fetchMore({
		variables: {
			text: searchValue.value,
			start: 20 * currentPage.value,
		},
		updateQuery: (previousResult, { fetchMoreResult }) => {
			const newEdges = fetchMoreResult?.searchPodcasts?.docs ?? []
			const previousEdges = previousResult?.searchPodcasts?.docs ?? []

			return newEdges.length
				? {
						...previousResult,
						searchPodcasts: {
							...previousResult.searchPodcasts,
							numFound: previousResult.searchPodcasts?.numFound ?? 0,
							start: previousResult.searchPodcasts?.start ?? 0,
							// Concat edges
							docs: [...previousEdges, ...newEdges],
						},
				  }
				: previousResult
		},
	})

	currentPage.value = currentPage.value + 1
}

onMounted(() => {
	if (searchInput.value) {
		searchInput.value.focus()
	}
})
</script>

<template>
	<div>
		<div class="grid grid-cols-12 q-mb-42">
			<div
				class="relative-position cursor-pointer group col-span-12 col-span-md-3"
			>
				<div
					class="absolute-full bg-white rounded-30 opacity-5 light:opacity-100 shadow-md"
				></div>
				<div class="flex items-center q-px-14 q-py-10">
					<q-icon size="20px" :name="resolveIcon('search', 13, 13)"></q-icon>
					<q-input
						ref="searchInput"
						class="q-ml-10 min-height-input flex-1"
						input-class="q-py-0"
						hide-bottom-space
						borderless
						v-model="searchValue"
						@update:model-value="onSearch"
						debounce="200"
						dense
						placeholder="What do you want to listen to?"
					/>
				</div>
			</div>
		</div>

		<template v-if="!result && favoriteStore.podcastsHistory.length > 0">
			<div class="column row-md align-items-end-md q-mb-42">
				<Title>Recent searches</Title>
			</div>

			<div class="grid grid-cols-min-xs-1 grid-cols-3 grid-cols-md-5 grid-gap-24">
				<RouterLink
					v-for="(podcast, index) in favoriteStore.podcastsHistory"
					:to="`/podcast/${podcast?._id}`"
					class="block full-height"
					:key="index"
				>
					<GQLPodcastCard :podcast="podcast" />
				</RouterLink>
			</div>
		</template>

		<Spinner v-if="loading" class="!w-50 !h-50 q-mx-auto" />

		<template v-else-if="result">
			<q-virtual-scroll
				class="virtual-grid q-mb-42"
				v-if="result?.searchPodcasts?.docs"
				style="max-height: 100%"
				:items="result.searchPodcasts.docs"
				separator
				v-slot="{ item, index }"
			>
				<RouterLink
					:to="`/podcast/${item?._id}`"
					class="block full-height"
					:key="index"
					@click="favoriteStore.appendHistory(item)"
				>
					<GQLPodcastCard :podcast="item" />
				</RouterLink>
			</q-virtual-scroll>

			<div
				class="grid grid-cols-12 grid-gap-16"
				v-if="result.searchPodcastEpisodes?.docs"
			>
				<Title class="q-mb-24 col-span-12">Episodes</Title>
				<template v-for="episode in result.searchPodcastEpisodes.docs">
					<RouterLink
						v-if="episode"
						class="col-span-12 col-span-md-8"
						:to="`/podcast/${episode.podcast_id}/episode/${episode._id}`"
					>
						<EpisodeItem :episode="episode" />
					</RouterLink>
				</template>
			</div>

			<!-- <Spinner v-if="loading && result" class="!w-50 !h-50 q-mx-auto" />

			<div class="flex w-full" v-else-if="currentPage < totalPages">
				<StandardButton
					:padding-x="30"
					:padding-y="14"
					fit
					class="q-mx-auto"
					:disabled="loading"
					@click="loadMore"
				>
					Load More
				</StandardButton>
			</div> -->
		</template>
	</div>
</template>
