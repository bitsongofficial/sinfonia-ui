<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from "vue-router"
import { useQuery } from "@vue/apollo-composable"
import Title from "@/components/typography/Title.vue"
import GQLPodcastCard from "@/components/cards/GQLPodcastCard.vue"
import Spinner from "@/components/Spinner"
import { PodcastExploreSection } from "@/graphql"
import { computed, ref } from "vue"
import { useMetadata } from "@/hooks/useMetadata"
import useSettings from "@/store/settings"
import { startCase } from "lodash"

const route = useRoute()
const router = useRouter()
const settingsStore = useSettings()

// Base64 has more id
const sectionId = route.params.id as string

const start = ref(
	route.query.start ? parseInt(route.query.start as string, 10) : 0
)

const { result, loading, fetchMore, onResult } = useQuery(
	PodcastExploreSection,
	{
		section: sectionId,
		start: start.value,
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

const loadMore = (_: number, done: (stop: boolean) => void) => {
	if (!result.value || loading.value) {
		return
	}

	start.value = start.value + 20

	fetchMore({
		variables: {
			section: sectionId,
			start: start.value,
		},
		updateQuery: (previousResult, { fetchMoreResult }) => {
			const newElements = fetchMoreResult?.podcastExploreSection.elements ?? []
			const previousElements = previousResult.podcastExploreSection.elements ?? []
			let disablePagination = false

			const [newElement] = newElements
			const [prevElement] = previousElements

			if (
				newElement &&
				(newElement.items.length === 0 || newElement.items.length < 20)
			) {
				disablePagination = true
			}

			if (!prevElement) {
				disablePagination = true
				done(disablePagination)
				return previousResult
			}

			if (!newElement) {
				disablePagination = true
			}

			done(disablePagination)

			router.push({
				path: `/podcasts/section/${sectionId}`,
				query: { start: start.value },
			})

			return newElements.length
				? {
						...previousResult,
						podcastExploreSection: {
							...previousResult.podcastExploreSection,
							// Concat elements
							elements: [
								{
									...prevElement,
									...newElement,
									items: [...prevElement.items, ...(newElement?.items ?? [])],
								},
							],
						},
				  }
				: previousResult
		},
	})
}

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

		<div
			class="column row-md align-items-end-md q-mb-42"
			v-if="!loading && section"
		>
			<Title>{{ section?.title }}</Title>
		</div>

		<div v-if="section?.items">
			<q-infinite-scroll
				:disable="loading"
				@load="loadMore"
				:offset="500"
				class="q-mb-48"
				scroll-target="#app"
			>
				<div
					class="grid grid-cols-min-xs-1 grid-cols-3 grid-cols-md-5 grid-gap-24"
					id="element"
				>
					<RouterLink
						v-for="item of section.items"
						:key="item?._id"
						:to="`/${item?.link}`"
						class="block full-height"
					>
						<GQLPodcastCard
							v-if="item"
							:title="item.title"
							:image="item.image"
							:subtitle="item.subtitle"
						/>
					</RouterLink>
				</div>

				<template v-slot:loading>
					<div class="row justify-center q-my-md">
						<Spinner class="!w-50 !h-50" />
					</div>
				</template>
			</q-infinite-scroll>
		</div>
	</div>
</template>
