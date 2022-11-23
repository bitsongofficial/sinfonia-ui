<script setup lang="ts">
import Title from "@/components/typography/Title.vue"
import CollectionCard from "@/components/cards/CollectionCard.vue"
import Spinner from "@/components/Spinner"
import { formatShortAddress, resolveIcon } from "@/common"
import useAuth from "@/store/auth"
import useNFT from "@/store/nft"
import onAppReady from "@/hooks/onAppReady"
import { RouterLink, useRoute } from "vue-router"
import { computed } from "vue"

const route = useRoute()
const authStore = useAuth()
const NFTStore = useNFT()

const code = parseInt(import.meta.env.VITE_BS721_CODE_ID, 10)

const address = computed(() =>
	route.params.address
		? (route.params.address as string)
		: authStore.bitsongAddress
)

const collections = computed(() => {
	if (address.value) {
		return NFTStore.collectionsByAddress(address.value)
	}

	return []
})

onAppReady(() => {
	NFTStore.loadCollections(code)
})
</script>

<template>
	<div class="text-white text-weight-medium">
		<div class="w-full position-relative q-mb-60">
			<q-img
				class="w-full rounded-20 bg-gray opacity-50"
				:src="`https://pimg.sinfonia.zone/1345x300/https://bas-cdn.com/ipfs/`"
				ratio="16/9"
				alt="Cover"
				title="Cover"
				width="100%"
				height="300px"
			/>

			<!-- <img
				class="absolute-bottom !left-24 !-bottom-24 border-white-2 w-126 h-126 rounded-full object-cover z-1"
				:src="`https://pimg.sinfonia.zone/125x125/https://bas-cdn.com/ipfs/QmVRX5JuS8gPG8Hca8bPPauRLkHVjVM1bS8kmRkAoks48R`"
			/> -->
			<div
				class="column justify-center items-center absolute-bottom !left-24 !-bottom-24 border-white-2 w-126 h-126 rounded-full object-cover z-1 bg-gray"
			>
				<q-icon :name="resolveIcon('profile', 15, 17)" size="46px" />
			</div>
		</div>
		<div class="q-mb-40 grid grid-cols-12 gap-24">
			<div class="col-span-12 col-span-md-7">
				<Title :font-size="32" class="q-mb-16">{{
					formatShortAddress(address)
				}}</Title>
			</div>
		</div>

		<Title class="q-mb-24">User Collections</Title>

		<Spinner v-if="NFTStore.loading" class="!w-50 !h-50 q-mx-auto" />

		<template v-else>
			<div
				class="grid grid-cols-min-xs-1 grid-cols-2 grid-cols-md-3 grid-cols-lg-4 grid-gap-30 q-mb-74"
				v-if="collections.length > 0"
			>
				<RouterLink
					v-for="(collection, index) in collections"
					:key="index"
					:to="`/nfts/${collection.address}/details`"
					class="block full-height"
				>
					<CollectionCard :collection="collection" />
				</RouterLink>
			</div>
			<p class="opacity-50" v-else>No collection available</p>
		</template>
	</div>
</template>
