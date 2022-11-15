<script setup lang="ts">
import useConfig from "@/store/config"
import usePodcasts from "@/store/podcasts"
import useSettings from "@/store/settings"
import Spinner from "@/components/Spinner"
import IconButton from "@/components/buttons/IconButton.vue"
import StandardButton from "@/components/buttons/StandardButton.vue"
import Title from "@/components/typography/Title.vue"
import { isValidContractAddress } from "@/common"
import { computed, onMounted, onUnmounted, watch } from "vue"
import { useRoute, useRouter, RouterLink } from "vue-router"
import { useMeta } from "vue-meta"
import { useSinfoniaMediaPlayer } from "@/hooks/useSinfoniaMediaPlayer"
import useClipboard from "@/hooks/useClipboard"

const route = useRoute()
const router = useRouter()
const configStore = useConfig()
const settingsStore = useSettings()
const podcastsStore = usePodcasts()

const address = route.params.address as string
const tokenId = route.params.tokenId as string

const podcast = computed(() => podcastsStore.podcast(address))
const episode = computed(() => podcastsStore.episode(tokenId))

const {
	addTrack,
	play,
	pause,
	isPlaying,
	audioFullDuration,
	sinfoniaCurrentTokenID,
} = useSinfoniaMediaPlayer()

const playTrack = () => {
	if (episode.value && episode.value.metadata?.animation_url) {
		play(episode.value, episode.value.token_id)
	}
}

onMounted(() => {
	if (
		!address ||
		(configStore.bitsongToken &&
			!isValidContractAddress(address, configStore.bitsongToken.addressPrefix))
	) {
		router.replace({ name: "NotFound" })
	}

	podcastsStore.loadPodcast(address)
	podcastsStore.loadEpisodes(address)
})

const episodeWatcher = watch(
	() => episode.value,
	(currentEpisode) => {
		if (currentEpisode && currentEpisode.metadata) {
			settingsStore.breadcrumbPageTitle = currentEpisode.metadata.name
			settingsStore.breadcrumbPrepend = [
				{
					label: podcast.value?.init?.name ?? "",
					to: `/podcasts/${podcast.value?.address}/details`,
				},
			]

			if (currentEpisode.metadata.animation_url) {
				addTrack(currentEpisode.metadata.animation_url)
			}
		}
	},
	{ immediate: true }
)

onUnmounted(() => {
	episodeWatcher()
	settingsStore.breadcrumbPrepend = []
})

const { onCopy } = useClipboard()

const metadata = computed(() => ({
	title: `${episode.value?.metadata?.name} | ${podcast.value?.init?.name}`,
	description: episode.value?.metadata?.description,
	og: {
		type: "website",
		url: import.meta.env.VITE_BASE_URL,
		title: `${episode.value?.metadata?.name} | ${podcast.value?.init?.name}`,
		description: episode.value?.metadata?.description,
		image: episode.value?.metadata?.image,
	},
	twitter: {
		card: "summary_large_image",
		url: import.meta.env.VITE_BASE_URL,
		title: `${episode.value?.metadata?.name} | ${podcast.value?.init?.name}`,
		description: episode.value?.metadata?.description,
		image: episode.value?.metadata?.image,
	},
}))

useMeta(metadata)
</script>

<template>
	<div class="text-white">
		<div v-if="!podcastsStore.loadingEpisodes && episode">
			<div class="grid grid-cols-12 grid-row-gap-32 grid-gap-md-32 q-mb-42">
				<div class="col-span-12 col-span-md-3">
					<q-img class="rounded-10 shadow-20" :src="episode.metadata?.image" />
				</div>
				<div class="col-span-12 col-span-md-9 flex column justify-end">
					<p class="fs-16 opacity-50 q-mb-16">Podcast Episode</p>
					<Title class="text-weight-bold q-mb-24 !fs-28 !fs-md-32">
						{{ episode.metadata?.name }}
					</Title>

					<RouterLink :to="`/podcasts/${podcast?.address}/details`">
						<p class="fs-24 !leading-38 text-weight-medium">
							{{ podcast?.init?.name }}
						</p>
					</RouterLink>
				</div>
			</div>

			<div class="grid grid-cols-12 grid-row-gap-32 grid-gap-md-32">
				<div class="col-span-12 col-span-md-8">
					<div class="row q-mb-32 items-center">
						<IconButton
							v-if="isPlaying && sinfoniaCurrentTokenID === episode.token_id"
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
					</div>

					<Title class="text-weight-bold q-mb-16">Description</Title>

					<p class="opacity-50 !leading-24 q-mb-48">
						{{ episode.metadata?.description }}
					</p>

					<StandardButton :to="`/podcasts/${podcast?.address}/details`">
						See all episodes
					</StandardButton>
				</div>
			</div>
		</div>
		<Spinner class="!w-50 !h-50 q-mx-auto" v-else />
	</div>
</template>
