<script setup lang="ts">
import { RouterLink } from "vue-router"
import { useQuery } from "@vue/apollo-composable"
import Title from "@/components/typography/Title.vue"
import GQLPodcastCard from "@/components/cards/GQLPodcastCard.vue"
import StandardButton from "@/components/buttons/StandardButton.vue"
import Spinner from "@/components/Spinner"
import { PodcastsPaginated } from "@/graphql"

const { result, loading, fetchMore } = useQuery(PodcastsPaginated, {
	first: 20,
})

const loadMore = () => {
	if (!result.value) {
		return
	}

	fetchMore({
		variables: {
			first: 20,
			after: result.value.podcasts.pageInfo.endCursor,
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
}
</script>

<template>
	<div>
		<Spinner v-if="loading && !result" class="!w-50 !h-50 q-mx-auto" />

		<template v-else>
			<div class="column row-md align-items-end-md q-mb-42">
				<Title>Top Podcasts</Title>
			</div>

			<q-virtual-scroll
				class="virtual-grid q-mb-42"
				v-if="result && result.podcasts.edges"
				style="max-height: 100%"
				:items="result.podcasts.edges"
				separator
				v-slot="{ item, index }"
			>
				<RouterLink
					:key="index"
					:to="`/podcasts/${item.node._id}/details`"
					class="block full-height"
				>
					<GQLPodcastCard :podcast="item.node" />
				</RouterLink>
			</q-virtual-scroll>

			<Spinner v-if="loading && result" class="!w-50 !h-50 q-mx-auto" />

			<div class="flex w-full" v-else>
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
			</div>

			<!-- <div class="column row-md align-items-end-md q-mb-42">
				<Title>Categories</Title>
			</div>

			<div
				class="grid grid-cols-min-xs-1 grid-cols-3 grid-cols-md-5 grid-gap-24 q-mb-42"
			>
				<RouterLink :to="`/podcasts/category/science`" class="block full-height">
					<PodcastCategoryCard category="Science">
						<template #image>
							<q-img
								src="@/assets/images/podcast-science.png"
								ratio="1/1"
								width="100%"
								fit="contain"
								height="100%"
							/>
						</template>
					</PodcastCategoryCard>
				</RouterLink>
				<RouterLink :to="`/podcasts/category/politics`" class="block full-height">
					<PodcastCategoryCard category="Politics">
						<template #image>
							<q-img
								src="@/assets/images/podcast-politics.png"
								ratio="1/1"
								width="100%"
								fit="contain"
								height="100%"
							/>
						</template>
					</PodcastCategoryCard>
				</RouterLink>
				<RouterLink :to="`/podcasts/category/sports`" class="block full-height">
					<PodcastCategoryCard category="Sports">
						<template #image>
							<q-img
								src="@/assets/images/podcast-sports.png"
								ratio="1/1"
								width="100%"
								fit="contain"
								height="100%"
							/>
						</template>
					</PodcastCategoryCard>
				</RouterLink>
				<RouterLink :to="`/podcasts/category/true-crime`" class="block full-height">
					<PodcastCategoryCard category="True crime">
						<template #image>
							<q-img
								src="@/assets/images/podcast-true-crime.png"
								ratio="1/1"
								width="100%"
								fit="contain"
								height="100%"
							/>
						</template>
					</PodcastCategoryCard>
				</RouterLink>
				<RouterLink :to="`/podcasts/category/music`" class="block full-height">
					<PodcastCategoryCard category="Music">
						<template #image>
							<q-img
								src="@/assets/images/podcast-music.png"
								ratio="1/1"
								width="100%"
								fit="contain"
								height="100%"
							/>
						</template>
					</PodcastCategoryCard>
				</RouterLink>
			</div> -->
		</template>
	</div>
</template>
