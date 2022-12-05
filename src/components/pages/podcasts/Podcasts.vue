<script setup lang="ts">
import { RouterLink } from "vue-router"
import { useQuery } from "@vue/apollo-composable"
import Title from "@/components/typography/Title.vue"
import GQLPodcastCard from "@/components/cards/GQLPodcastCard.vue"
import StandardButton from "@/components/buttons/StandardButton.vue"
import Spinner from "@/components/Spinner"
import { PodcastExplore } from "@/graphql"

const { result, loading } = useQuery(PodcastExplore)
</script>

<template>
	<div>
		<Spinner v-if="loading && !result" class="!w-50 !h-50 q-mx-auto" />

		<template v-else>
			<div class="q-mb-48" v-for="section of result?.podcastExplore.elements">
				<div
					class="column row-md align-items-end-md justify-between q-mt-20 q-mb-20 full-width"
				>
					<Title>{{ section?.title }}</Title>

					<RouterLink
						:to="`/podcasts/section/${section.hasMore}`"
						v-if="section?.hasMore"
						class="text-bold opacity-50 hover:opacity-100"
					>
						Show More
					</RouterLink>
				</div>

				<div
					class="grid grid-cols-min-xs-1 grid-cols-3 grid-cols-md-5 grid-gap-24"
					v-if="section?.items"
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
