<script setup lang="ts">
import Title from "@/components/typography/Title.vue"
import PodcastCard from "@/components/cards/PodcastCard.vue"
import PodcastCategoryCard from "@/components/cards/PodcastCategoryCard.vue"
import Spinner from "@/components/Spinner"
import { useRoute, RouterLink } from "vue-router"
import usePodcasts from "@/store/podcasts"
import onAppReady from "@/hooks/onAppReady"

const route = useRoute()
const podcastsStore = usePodcasts()

const code = route.params.codeId
	? parseInt(route.params.codeId as string, 10)
	: parseInt(import.meta.env.VITE_PODCAST_BS721_CODE_ID, 10)

onAppReady(() => {
	podcastsStore.loadPodcasts(code)
})
</script>
<template>
	<div>
		<Spinner v-if="podcastsStore.loading" class="!w-50 !h-50 q-mx-auto" />

		<template v-else>
			<div class="column row-md align-items-end-md q-mb-42">
				<Title>Top Podcasts</Title>
			</div>

			<div
				class="grid grid-cols-min-xs-1 grid-cols-3 grid-cols-md-5 grid-gap-24 q-mb-42"
			>
				<RouterLink
					v-for="podcast of podcastsStore.sinfoniaPodcasts"
					:to="`/podcasts/${podcast.address}/details`"
					class="block full-height"
				>
					<PodcastCard :podcast="podcast" />
				</RouterLink>
			</div>

			<div class="column row-md align-items-end-md q-mb-42">
				<Title>Categories</Title>
			</div>

			<div
				class="grid grid-cols-min-xs-1 grid-cols-3 grid-cols-md-5 grid-gap-24 q-mb-42"
			>
				<RouterLink :to="`/podcasts/category/science`" class="block full-height">
					<PodcastCategoryCard category="Science" icon="" />
				</RouterLink>
				<RouterLink :to="`/podcasts/category/politics`" class="block full-height">
					<PodcastCategoryCard category="Politics" icon="" />
				</RouterLink>
				<RouterLink :to="`/podcasts/category/politics`" class="block full-height">
					<PodcastCategoryCard category="Sports" icon="" />
				</RouterLink>
				<RouterLink :to="`/podcasts/category/true-crime`" class="block full-height">
					<PodcastCategoryCard category="True crime" icon="" />
				</RouterLink>
				<RouterLink :to="`/podcasts/category/comedy`" class="block full-height">
					<PodcastCategoryCard category="Comedy" icon="" />
				</RouterLink>
			</div>
		</template>
	</div>
</template>
