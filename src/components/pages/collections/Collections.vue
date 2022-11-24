<script setup lang="ts">
import Title from "@/components/typography/Title.vue"
import CollectionCard from "@/components/cards/CollectionCard.vue"
import LargeButton from "@/components/buttons/LargeButton.vue"
import useNFT from "@/store/nft"
import Spinner from "@/components/Spinner"
import Tabs from "@/components/Tabs.vue"
import { ref } from "vue"
import { useRoute, RouterLink } from "vue-router"
import onAppReady from "@/hooks/onAppReady"

const route = useRoute()
const NFTStore = useNFT()
const collectionsType = ref("featured")

const code = route.params.codeId
	? parseInt(route.params.codeId as string, 10)
	: parseInt(import.meta.env.VITE_BS721_CODE_ID, 10)

onAppReady(() => {
	NFTStore.loadCollections(code)
})

// TODO: Add virtual scroll
</script>
<template>
	<div>
		<div class="column row-md align-items-end-md q-mb-42">
			<Title class="q-mr-32">Featured Collections</Title>
		</div>

		<Spinner v-if="NFTStore.loading" class="!w-50 !h-50 q-mx-auto" />

		<div
			class="grid grid-cols-min-xs-1 grid-cols-2 grid-cols-md-3 grid-gap-30 q-mb-74"
		>
			<RouterLink
				v-for="(collection, index) in NFTStore.whitelistCollections"
				:key="index"
				:to="`/nfts/${collection.address}/details`"
				class="block full-height"
			>
				<CollectionCard :collection="collection" />
			</RouterLink>
		</div>

		<div
			class="column row-md align-items-end-md q-mb-42"
			v-if="!NFTStore.loading"
		>
			<Title :font-size="24" class="q-mr-32">Latest Collections</Title>
		</div>

		<div
			class="grid grid-cols-min-xs-1 grid-cols-2 grid-cols-md-3 grid-gap-30 q-mb-74"
		>
			<RouterLink
				v-for="(collection, index) in NFTStore.latestCollections"
				:key="index"
				:to="`/nfts/${collection.address}/details`"
				class="block full-height"
			>
				<CollectionCard :collection="collection" />
			</RouterLink>
		</div>
	</div>
</template>
