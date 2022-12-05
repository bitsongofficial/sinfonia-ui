<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router"
import { useQuery } from "@vue/apollo-composable"
import Title from "@/components/typography/Title.vue"
import GQLPodcastCard from "@/components/cards/GQLPodcastCard.vue"
import StandardButton from "@/components/buttons/StandardButton.vue"
import Spinner from "@/components/Spinner"
import { PodcastExploreSection } from "@/graphql"
import { computed } from "vue"
import { useMetadata } from "@/hooks/useMetadata"
import useSettings from "@/store/settings"

const route = useRoute()
const settingsStore = useSettings()

// Base64 has more id
const sectionId = route.params.id as string
const start = route.query.start ? parseInt(route.query.start as string, 10) : 0

const { result, loading, fetchMore, onResult } = useQuery(
	PodcastExploreSection,
	{
		section: sectionId,
		start,
	}
)

const section = computed(() => {
	if (result.value) {
		const [element] = result.value.podcastExploreSection.elements

		return element
	}

	return null
})

onResult(() => {
	if (section.value) {
		settingsStore.breadcrumbPageTitle = section.value?.title ?? ""
	}
})

/* const loadMore = () => {
	if (!result.value) {
		return
	}

	fetchMore({
		variables: {
			first: 0,
			after: "",
			last: 20,
			before: result.value.podcasts.pageInfo.startCursor ?? "",
		},
		updateQuery: (previousResult, { fetchMoreResult }) => {
			const newEdges = fetchMoreResult?.podcasts.edges ?? []
			const pageInfo =
				fetchMoreResult?.podcasts.pageInfo ?? previousResult.podcasts.pageInfo
			const previousEdges = previousResult.podcasts.edges ?? []

			return newEdges.length
				? {
						...previousResult,
						podcasts: {
							...previousResult.podcasts,
							// Concat edges
							edges: [...previousEdges, ...newEdges],
							// Override with new pageInfo
							pageInfo,
						},
				  }
				: previousResult
		},
	})
} */

const metadata = computed(() => ({
	title: `${section.value?.title}`,
	description: `Section related to ${section.value?.title}`,
	og: {
		type: "website",
		url: import.meta.env.VITE_BASE_URL,
		title: `${section.value?.title}`,
		description: `Section related to ${section.value?.title}`,
		image: `${import.meta.env.VITE_BASE_URL}cover.jpeg`,
	},
	twitter: {
		card: "summary_large_image",
		url: import.meta.env.VITE_BASE_URL,
		title: `${section.value?.title}`,
		description: `Section related to ${section.value?.title}`,
		image: `${import.meta.env.VITE_BASE_URL}cover.jpeg`,
	},
}))

useMetadata(metadata)
</script>

<template>
	<div>
		<Spinner v-if="loading && !section" class="!w-50 !h-50 q-mx-auto" />

		<template v-else>
			<div class="column row-md align-items-end-md q-mb-42">
				<Title>{{ section?.title }}</Title>
			</div>

			<q-virtual-scroll
				class="virtual-grid q-mb-42"
				v-if="section?.items"
				style="max-height: 100%"
				:items="section.items"
				separator
				v-slot="{ item, index }"
			>
				<RouterLink :key="index" :to="`/${item.link}`" class="block full-height">
					<GQLPodcastCard
						v-if="item"
						:title="item.title"
						:image="item.image"
						:subtitle="item.subtitle"
					/>
				</RouterLink>
			</q-virtual-scroll>

			<!-- <Spinner v-if="loading && result" class="!w-50 !h-50 q-mx-auto" />

			<div
				class="flex w-full"
				v-else-if="result?.podcasts.pageInfo.hasPreviousPage"
			>
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
