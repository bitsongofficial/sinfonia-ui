<script setup lang="ts">
import useConfig from "@/store/config"
import useNFT from "@/store/nft"
import useSettings from "@/store/settings"
import Spinner from "@/components/Spinner"
import Card from "@/components/cards/Card.vue"
import IconButton from "@/components/buttons/IconButton.vue"
import Title from "@/components/typography/Title.vue"
import NFTCard from "@/components/cards/NFTCard.vue"
import LargeButton from "@/components/buttons/LargeButton.vue"
import { formatShortAddress, isValidContractAddress } from "@/common"
import { computed, onMounted, onUnmounted, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useMeta } from "vue-meta"
import useClipboard from "@/hooks/useClipboard"

const route = useRoute()
const router = useRouter()
const configStore = useConfig()
const settingsStore = useSettings()
const NFTStore = useNFT()

const address = route.params.address as string

/* const collection = computed(() => NFTStore.collection(address))

const collectionWatcher = watch(
	() => NFTStore.collection(address),
	(collection) => {
		if (collection && collection.init) {
			settingsStore.breadcrumbPageTitle = collection.init.name
		}
	},
	{ immediate: true }
) */

/* onMounted(() => {
	if (
		!address ||
		(configStore.bitsongToken &&
			!isValidContractAddress(address, configStore.bitsongToken.addressPrefix))
	) {
		router.replace({ name: "NotFound" })
	}

	NFTStore.loadCollection(address)
	NFTStore.loadNFTs(address)
}) */

/* onUnmounted(() => {
	collectionWatcher()
}) */

const { onCopy } = useClipboard()

const metadata = computed(() => ({
	title: `Podcast`,
	/* description: collection.value?.metadata?.description,
	og: {
		type: "website",
		url: import.meta.env.VITE_BASE_URL,
		title: `${collection.value?.init?.name} | NFT`,
		description: collection.value?.metadata?.description,
		image: collection.value?.metadata?.cover,
	},
	twitter: {
		card: "summary_large_image",
		url: import.meta.env.VITE_BASE_URL,
		title: `${collection.value?.init?.name} | NFT`,
		description: collection.value?.metadata?.description,
		image: collection.value?.metadata?.cover,
	}, */
}))

useMeta(metadata)
</script>

<template>
	<div class="text-white">
		<div class="grid grid-cols-12 grid-gap-32 q-mb-42">
			<div class="col-span-12 col-span-md-3">
				<q-img
					class="rounded-10 shadow-20"
					src="https://via.placeholder.com/3000"
				/>
			</div>
			<div class="col-span-12 col-span-md-9 flex column justify-end">
				<p class="fs-16 opacity-50 q-mb-16">Podcast</p>
				<Title class="text-weight-bold q-mb-32" :font-size="90">Mele Marce</Title>
				<p class="fs-18 text-weight-medium q-mb-42">Spotify Studios</p>
			</div>
		</div>

		<div class="grid grid-cols-12 grid-gap-32">
			<div class="col-span-12 col-span-md-4 col-start-md-9">
				<Title class="text-weight-bold q-mb-16">About</Title>
				<p class="opacity-50 !leading-24">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec tortor et
					metus luctus eleifend eget quis mi. Etiam nec sapien et neque semper
					convallis. Sed tempor nisl id neque vulputate vehicula. Vivamus congue quam
					nunc, et auctor odio bibendum at. Morbi vel dui id nisl aliquet imperdiet.
					Vivamus eget iaculis nisl, eu egestas est. Nullam quis libero id arcu
					porttitor volutpat. Praesent bibendum metus nibh, non finibus turpis rutrum
					ac. Nulla aliquet est tincidunt urna viverra posuere. Duis ac justo
					laoreet, vehicula massa eu, facilisis neque. Vestibulum sed rhoncus sem,
					quis euismod nisl. Aenean commodo pulvinar imperdiet. Vestibulum ac eros
					nibh. Aenean interdum lacinia libero, quis vehicula mauris commodo eget.
					Mauris tincidunt venenatis risus cursus posuere.
				</p>
			</div>
			<div class="col-span-12 col-span-md-8 row-start-md-1">
				<Title class="text-weight-bold q-mb-16">All Episodes</Title>

				<div class="grid grid-cols-12 grid-gap-16">
					<Card
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
					</Card>
					<Card
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
					</Card>
				</div>
			</div>
		</div>
	</div>
</template>
