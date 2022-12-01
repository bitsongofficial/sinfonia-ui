<script setup lang="ts">
import useSettings from "@/store/settings"
import Spinner from "@/components/Spinner"
import IconButton from "@/components/buttons/IconButton.vue"
import StandardButton from "@/components/buttons/StandardButton.vue"
import Title from "@/components/typography/Title.vue"
import EpisodeContextMenu from "@/components/navigation/EpisodeContextMenu.vue"
import { computed, onUnmounted, watch, ref } from "vue"
import { useRoute, RouterLink } from "vue-router"
import { useMetadata } from "@/hooks/useMetadata"
import { useSinfoniaMediaPlayer } from "@/hooks/useSinfoniaMediaPlayer"
import { useQuery } from "@vue/apollo-composable"
import { PodcastEpisode } from "@/graphql"

const route = useRoute()
const settingsStore = useSettings()

const podcastId = route.params.podcastId as string
const episodeId = route.params.episodeId as string

const show = ref(false)

const { result, loading } = useQuery(PodcastEpisode, {
	id: episodeId,
	podcast_id: podcastId,
})

const {
	addTrack,
	play,
	pause,
	addTrackToPlaylist,
	isPlaying,
	audioFullDuration,
	sinfoniaCurrentTokenID,
} = useSinfoniaMediaPlayer()

const playTrack = () => {
	if (result.value && result.value.podcastEpisode) {
		play(result.value.podcastEpisode)
	}
}

const addToPlaylist = () => {
	if (result.value && result.value.podcastEpisode) {
		addTrackToPlaylist(result.value.podcastEpisode)
	}
}

const episodeWatcher = watch(
	() => result.value,
	(currentEpisode) => {
		if (currentEpisode && currentEpisode.podcastEpisode) {
			settingsStore.breadcrumbPageTitle = currentEpisode.podcastEpisode.title ?? ""
			settingsStore.breadcrumbPrepend = [
				{
					label: currentEpisode.podcast?.title ?? "",
					to: `/podcast/${podcastId}`,
				},
			]

			if (currentEpisode.podcastEpisode.enclosures) {
				const [enclosure] = currentEpisode.podcastEpisode.enclosures

				if (enclosure && enclosure.url) {
					addTrack(enclosure.url)
				}
			}
		}
	},
	{ immediate: true }
)

onUnmounted(() => {
	episodeWatcher()
	settingsStore.breadcrumbPrepend = []
})

const metadata = computed(() => ({
	title: `${result.value?.podcastEpisode?.title} | ${result.value?.podcast?.title}`,
	description: result.value?.podcastEpisode?.description,
	og: {
		type: "website",
		url: import.meta.env.VITE_BASE_URL,
		title: `${result.value?.podcastEpisode?.title} | ${result.value?.podcast?.title}`,
		description: result.value?.podcastEpisode?.description,
		image: result.value?.podcastEpisode?.image,
	},
	twitter: {
		card: "summary_large_image",
		url: import.meta.env.VITE_BASE_URL,
		title: `${result.value?.podcastEpisode?.title} | ${result.value?.podcast?.title}`,
		description: result.value?.podcastEpisode?.description,
		image: result.value?.podcastEpisode?.image,
	},
}))

useMetadata(metadata)
</script>

<template>
	<div class="text-white">
		<div v-if="!loading && result && result.podcastEpisode">
			<div class="grid grid-cols-12 grid-row-gap-32 grid-gap-md-32 q-mb-42">
				<div class="col-span-12 col-span-md-3">
					<q-img
						class="rounded-10 shadow-20"
						:src="result.podcastEpisode.image ?? ''"
					/>
				</div>
				<div class="col-span-12 col-span-md-9 flex column justify-end items-start">
					<p class="fs-16 opacity-50 q-mb-16">Podcast Episode</p>
					<Title class="text-weight-bold q-mb-24 !fs-28 !fs-md-32">
						{{ result.podcastEpisode.title }}
					</Title>

					<RouterLink :to="`/podcast/${podcastId}`">
						<p class="fs-24 !leading-38 text-weight-medium">
							{{ result.podcast?.title }}
						</p>
					</RouterLink>
				</div>
			</div>

			<div class="grid grid-cols-12 grid-row-gap-32 grid-gap-md-32">
				<div class="col-span-12 col-span-md-8">
					<div class="row q-mb-32 items-center">
						<IconButton
							v-if="isPlaying && sinfoniaCurrentTokenID === result.podcastEpisode._id"
							icon="pause"
							width="24"
							height="24"
							class="text-white light:text-white fs-14 q-mr-20 w-48 h-48"
							icon-class="rotate-90 !fs-22"
							color="none"
							:solid="true"
							@click.prevent.stop="pause"
						/>
						<IconButton
							v-else
							icon="triangle"
							width="22"
							height="17"
							class="text-white light:text-white fs-16 q-mr-20 w-48 h-48"
							icon-class="rotate-90"
							color="none"
							:solid="true"
							@click.prevent.stop="playTrack"
						/>

						<p class="fs-18 opacity-50">{{ audioFullDuration }}</p>

						<IconButton
							icon="vertical-dots"
							width="4"
							height="16"
							class="fs-20 s-28 q-ml-auto opacity-50 hover:opacity-100"
							@click.native.prevent="show = true"
							v-if="result.podcastEpisode"
						>
							<EpisodeContextMenu v-model="show" @addtoplaylist="addToPlaylist" />
						</IconButton>
					</div>

					<Title class="text-weight-bold q-mb-16">Description</Title>

					<p class="opacity-50 !leading-24 q-mb-48">
						{{ result.podcastEpisode.description }}
					</p>

					<StandardButton :to="`/podcasts/${podcastId}/details`">
						See all episodes
					</StandardButton>
				</div>
			</div>
		</div>
		<Spinner class="!w-50 !h-50 q-mx-auto" v-else />
	</div>
</template>
