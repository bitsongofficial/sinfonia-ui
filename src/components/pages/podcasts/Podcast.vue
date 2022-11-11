<script setup lang="ts">
import useConfig from "@/store/config"
import useSettings from "@/store/settings"
import Spinner from "@/components/Spinner"
import EpisodeItem from "@/components/cards/EpisodeItem.vue"
import Title from "@/components/typography/Title.vue"
import StandardButton from "@/components/buttons/StandardButton.vue"
import { formatShortAddress, isValidContractAddress } from "@/common"
import { computed, onMounted, onUnmounted, watch } from "vue"
import { useRoute, useRouter, RouterLink } from "vue-router"
import { useMeta } from "vue-meta"
import useClipboard from "@/hooks/useClipboard"
import usePodcasts from "@/store/podcasts"
import useAuth from "@/store/auth"

const route = useRoute()
const router = useRouter()
const configStore = useConfig()
const authStore = useAuth()
const settingsStore = useSettings()
const podcastsStore = usePodcasts()

const address = route.params.address as string

const podcast = computed(() => podcastsStore.podcast(address))

const podcastWatcher = watch(
	() => podcast.value,
	(collection) => {
		if (collection && collection.init) {
			settingsStore.breadcrumbPageTitle = collection.init.name
		}
	},
	{ immediate: true }
)

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

onUnmounted(() => {
	podcastWatcher()
})

const { onCopy } = useClipboard()

const metadata = computed(() => ({
	title: `Podcast`,
	description: podcast.value?.metadata?.description,
	og: {
		type: "website",
		url: import.meta.env.VITE_BASE_URL,
		title: `${podcast.value?.init?.name} | NFT`,
		description: podcast.value?.metadata?.description,
		image: podcast.value?.metadata?.image,
	},
	twitter: {
		card: "summary_large_image",
		url: import.meta.env.VITE_BASE_URL,
		title: `${podcast.value?.init?.name} | NFT`,
		description: podcast.value?.metadata?.description,
		image: podcast.value?.metadata?.image,
	},
}))

useMeta(metadata)
</script>

<template>
	<div class="text-white">
		<div v-if="!podcastsStore.loading && podcast">
			<div class="grid grid-cols-12 grid-gap-32 q-mb-42">
				<div class="col-span-12 col-span-md-3">
					<q-img class="rounded-10 shadow-20" :src="podcast?.metadata?.image" />
				</div>
				<div class="col-span-12 col-span-md-9 flex column justify-end">
					<p class="fs-16 opacity-50 q-mb-16">Podcast</p>
					<Title class="text-weight-bold q-mb-24" :font-size="90">{{
						podcast?.init?.name
					}}</Title>
					<p
						class="fs-24 !leading-38 text-weight-medium cursor-pointer"
						@click="onCopy(podcast?.creator)"
					>
						{{ formatShortAddress(podcast?.creator) }}
					</p>
				</div>
			</div>

			<div class="grid grid-cols-12 grid-gap-32">
				<div class="col-span-12 col-span-md-4 col-start-md-9">
					<Title class="text-weight-bold q-mb-16">About</Title>
					<p class="opacity-50 !leading-24 white-space-pre-line">
						{{ podcast.metadata?.description }}
					</p>
				</div>
				<div class="col-span-12 col-span-md-8 row-start-md-1">
					<div class="row justify-between items-center q-mb-16">
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
					</div>

					<div class="grid grid-cols-12 grid-gap-16">
						<p
							class="col-span-12 opacity-50"
							v-if="podcastsStore.episodes.length === 0"
						>
							There are no episodes available
						</p>
						<template v-else>
							<RouterLink
								v-for="episode in podcastsStore.sinfoniaEpisodes"
								class="col-span-12"
								:to="`/podcasts/${address}/episode/${episode.token_id}`"
							>
								<EpisodeItem :episode="episode" />
							</RouterLink>
						</template>
					</div>
				</div>
			</div>
		</div>
		<Spinner class="!w-50 !h-50 q-mx-auto" v-else />
	</div>
</template>
