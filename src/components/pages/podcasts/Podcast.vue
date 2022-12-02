<script setup lang="ts">
import Spinner from "@/components/Spinner"
import Title from "@/components/typography/Title.vue"
import EpisodeItem from "@/components/cards/EpisodeItem.vue"
import IconButton from "@/components/buttons/IconButton.vue"
import { computed, ref } from "vue"
import { useRoute, RouterLink } from "vue-router"
import { useMetadata } from "@/hooks/useMetadata"
import { useQuery } from "@vue/apollo-composable"
import { PodcastWithEpisodes } from "@/graphql"
import useSettings from "@/store/settings"
import { useSinfoniaMediaPlayer } from "@/hooks/useSinfoniaMediaPlayer"
import { compact } from "lodash"
import { episodePlaceholderImage } from "@/common"

const route = useRoute()
const settingsStore = useSettings()

const { play, addTracksToPlaylist } = useSinfoniaMediaPlayer()

const like = ref(false)

// MongoDB ObjectID
const id = route.params.id as string

const { result, loading, onResult } = useQuery(PodcastWithEpisodes, {
	id,
})

onResult(() => {
	if (result.value) {
		settingsStore.breadcrumbPageTitle = result.value.podcast?.title ?? ""
	}
})

const addEpisodesToPlaylist = () => {
	if (
		result.value?.podcastEpisodes &&
		result.value?.podcastEpisodes.length > 0
	) {
		const episodes = [...result.value.podcastEpisodes]
		const episode = episodes.shift()

		if (episode) {
			const placeholder = episodePlaceholderImage(
				episode,
				result.value?.podcast?.image
			)

			play({
				...episode,
				image: placeholder,
			})

			addTracksToPlaylist(
				compact(episodes).map((el) => {
					const placeholder = episodePlaceholderImage(
						el,
						result.value?.podcast?.image
					)
					return {
						...el,
						image: placeholder,
					}
				})
			)
		}
	}
}

const metadata = computed(() => ({
	title: `${result.value?.podcast?.title} | Podcast`,
	description: result.value?.podcast?.description,
	og: {
		type: "website",
		url: import.meta.env.VITE_BASE_URL,
		title: `${result.value?.podcast?.title} | Podcast`,
		description: result.value?.podcast?.description,
		image: result.value?.podcast?.image,
	},
	twitter: {
		card: "summary_large_image",
		url: import.meta.env.VITE_BASE_URL,
		title: `${result.value?.podcast?.title} | Podcast`,
		description: result.value?.podcast?.description,
		image: result.value?.podcast?.image,
	},
}))

useMetadata(metadata)
</script>

<template>
	<div class="text-white">
		<div v-if="!loading && result && result.podcast">
			<div class="grid grid-cols-12 grid-row-gap-32 grid-gap-md-32 q-mb-42">
				<div class="col-span-12 col-span-md-3">
					<q-img class="rounded-10 shadow-20" :src="result.podcast.image ?? ''" />
				</div>
				<div class="col-span-12 col-span-md-9 flex column justify-end">
					<p class="fs-16 opacity-50 q-mb-16">Podcast</p>
					<Title class="text-weight-bold q-mb-24 fs-40 fs-md-90">{{
						result.podcast.title
					}}</Title>
					<p class="fs-24 !leading-38 text-weight-medium">
						{{ result.podcast.author }}
					</p>
				</div>
			</div>

			<div class="grid grid-cols-12 grid-gap-32">
				<div class="col-span-12 col-span-md-4 col-start-md-9">
					<Title class="text-weight-bold q-mb-16">About</Title>
					<p class="opacity-50 !leading-24 white-space-pre-line">
						{{ result.podcast.description }}
					</p>
				</div>
				<div class="col-span-12 col-span-md-8 row-start-md-1">
					<div class="row q-mb-32 items-center">
						<IconButton
							icon="triangle"
							width="22"
							height="17"
							class="text-white light:text-white fs-16 q-mr-20 w-48 h-48"
							icon-class="rotate-90"
							color="none"
							:solid="true"
							@click="addEpisodesToPlaylist"
						/>

						<IconButton
							:icon="!like ? 'heart' : 'heart-fill'"
							width="24"
							height="24"
							class="fs-28 s-28"
							@click.native.prevent="like = !like"
							:color="!like ? 'white' : 'primary'"
						/>
					</div>
					<!-- <div class="row justify-between items-center q-mb-16">
						<Title class="text-weight-bold">All Episodes</Title>
						<StandardButton
							:padding-x="30"
							:padding-y="14"
							fit
							:to="`/podcasts/${address}/create-episode`"
							v-if="authStore.bitsongAddress === podcast.creator"
						>
							Create Episode
						</StandardButton>
					</div> -->

					<div class="grid grid-cols-12 grid-gap-16">
						<p
							class="col-span-12 opacity-50"
							v-if="!result.podcastEpisodes || result.podcastEpisodes.length === 0"
						>
							There are no episodes available
						</p>
						<template v-else-if="result.podcastEpisodes">
							<template v-for="episode in result.podcastEpisodes">
								<RouterLink
									v-if="episode"
									class="col-span-12"
									:to="`/podcast/${id}/episode/${episode?._id}`"
								>
									<EpisodeItem
										:episode="episode"
										:placeholder-src="result.podcast.image ?? ''"
									/>
								</RouterLink>
							</template>
						</template>
					</div>
				</div>
			</div>
		</div>
		<Spinner class="!w-50 !h-50 q-mx-auto" v-else />
	</div>
</template>
