<script setup lang="ts">
import useConfig from "@/store/config"
import useSettings from "@/store/settings"
import Spinner from "@/components/Spinner"
import Card from "@/components/cards/Card.vue"
import IconButton from "@/components/buttons/IconButton.vue"
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
							:to="`/podcasts/${address}/mint`"
							v-if="authStore.bitsongAddress === podcast.creator"
						>
							New Episode
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
								v-for="episode in podcastsStore.episodes"
								class="col-span-12"
								to="/podcasts/test/id/1"
							>
								<Card
									class="!grid grid-cols-12 grid-gap-24 hover:bg-white-10 cursor-pointer transition-all"
									:transparency="5"
								>
									<q-img
										class="col-span-2 rounded-10 shadow-20"
										src="https://via.placeholder.com/3000"
										height="100px"
										width="100px"
									/>

									<div class="col-span-10">
										<Title class="text-weight-bold q-mb-16" :font-size="16">
											Mele Marce - Trailer
										</Title>

										<p class="fs-14 !leading-22 opacity-50 text-container q-mb-16">
											La storia di WeWork, una società che affitta spazi di coworking
											arrivata, seppur per poco, a valere 47 miliardi di dollari. Non una
											semplice società “immobiliare” di affitto di spazi-ufficio condivisi
											ma molto di più: è tech, è software è “space as a service”. E in
											quelle quattro parole c’è la sintesi di tutta un’epoca. Quelle
											quattro parole riassumono il personaggio e il nuovo volto del
											capitalismo digitale: Adam Neumann e la Silicon Valley ideology Learn
											more about your ad choices. Visit podcastchoices.com/adchoices
										</p>

										<div class="row items-center">
											<IconButton
												icon="pause"
												width="24"
												height="24"
												class="text-white light:text-white fs-14 q-mr-16 w-36"
												icon-class="rotate-90 !fs-20"
												color="none"
												:solid="true"
											/>

											<p class="opacity-50">Nov 8 · 2 min 9 sec</p>
										</div>
									</div>
								</Card>
							</RouterLink>
						</template>
						<!-- <Card
							class="!grid grid-cols-12 grid-gap-24 col-span-12 hover:bg-white-10 cursor-pointer transition-all"
							:transparency="5"
						>
							<q-img
								class="col-span-2 rounded-10 shadow-20"
								src="https://via.placeholder.com/3000"
								height="100px"
								width="100px"
							/>

							<div class="col-span-10">
								<Title class="text-weight-bold q-mb-16" :font-size="16">
									Mele Marce - Trailer
								</Title>

								<p class="fs-14 !leading-22 opacity-50 text-container q-mb-16">
									La storia di WeWork, una società che affitta spazi di coworking
									arrivata, seppur per poco, a valere 47 miliardi di dollari. Non una
									semplice società “immobiliare” di affitto di spazi-ufficio condivisi ma
									molto di più: è tech, è software è “space as a service”. E in quelle
									quattro parole c’è la sintesi di tutta un’epoca. Quelle quattro parole
									riassumono il personaggio e il nuovo volto del capitalismo digitale:
									Adam Neumann e la Silicon Valley ideology Learn more about your ad
									choices. Visit podcastchoices.com/adchoices
								</p>

								<div class="row items-center">
									<IconButton
										icon="triangle"
										width="22"
										height="17"
										class="text-white light:text-white fs-14 q-mr-16 w-36"
										icon-class="rotate-90"
										color="none"
										:solid="true"
									/>

									<p class="opacity-50">Nov 8 · 2 min 9 sec</p>
								</div>
							</div>
						</Card> -->
					</div>
				</div>
			</div>
		</div>
		<Spinner class="!w-50 !h-50 q-mx-auto" v-else />
	</div>
</template>
