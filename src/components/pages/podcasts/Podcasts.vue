<script setup lang="ts">
import Title from "@/components/typography/Title.vue"
import PodcastCard from "@/components/cards/PodcastCard.vue"
import LargeButton from "@/components/buttons/LargeButton.vue"
import useNFT from "@/store/nft"
import Spinner from "@/components/Spinner"
import Tabs from "@/components/Tabs.vue"
import { onMounted, ref } from "vue"
import { useRoute, RouterLink } from "vue-router"

const route = useRoute()
const NFTStore = useNFT()
const collectionsType = ref("all")

const code = route.params.codeId
	? parseInt(route.params.codeId as string, 10)
	: parseInt(import.meta.env.VITE_BS721_CODE_ID, 10)

onMounted(() => {
	/* NFTStore.loadCollections(code) */
})

const tabs = [
	{ name: "all", label: "All Podcasts" },
	{ name: "mypodcasts", label: "My Podcasts" },
]

// TODO: Add virtual scroll
</script>
<template>
	<div>
		<div class="column row-md align-items-end-md q-mb-42">
			<Title class="q-mr-32">Podcasts</Title>
		</div>
		<div class="row items-center justify-between q-mb-42">
			<div class="q-mb-xs-20">
				<Tabs v-model="collectionsType" :options="tabs" border />
			</div>

			<LargeButton
				class="q-ml-auto"
				label="Create Podcast"
				:to="`/podcasts/${code}/create`"
				fit
			/>
		</div>

		<Spinner v-if="NFTStore.loading" class="!w-50 !h-50 q-mx-auto" />

		<div
			v-else
			class="grid grid-cols-min-xs-1 grid-cols-3 grid-cols-md-5 grid-gap-24 q-mb-42"
		>
			<RouterLink to="/podcasts/test/details" class="block full-height">
				<PodcastCard :podcast="1" />
			</RouterLink>
			<RouterLink to="/podcasts/test/details" class="block full-height">
				<PodcastCard :podcast="1" />
			</RouterLink>
			<RouterLink to="/podcasts/test/details" class="block full-height">
				<PodcastCard :podcast="1" />
			</RouterLink>
			<RouterLink to="/podcasts/test/details" class="block full-height">
				<PodcastCard :podcast="1" />
			</RouterLink>
			<RouterLink to="/podcasts/test/details" class="block full-height">
				<PodcastCard :podcast="1" />
			</RouterLink>
			<RouterLink to="/podcasts/test/details" class="block full-height">
				<PodcastCard :podcast="1" />
			</RouterLink>
			<RouterLink to="/podcasts/test/details" class="block full-height">
				<PodcastCard :podcast="1" />
			</RouterLink>
			<RouterLink to="/podcasts/test/details" class="block full-height">
				<PodcastCard :podcast="1" />
			</RouterLink>
			<RouterLink to="/podcasts/test/details" class="block full-height">
				<PodcastCard :podcast="1" />
			</RouterLink>
			<RouterLink to="/podcasts/test/details" class="block full-height">
				<PodcastCard :podcast="1" />
			</RouterLink>
		</div>
	</div>
</template>
