<script setup lang="ts">
import Title from "@/components/typography/Title.vue"
import CollectionCard from "@/components/cards/CollectionCard.vue"
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
	NFTStore.loadCollections(code)
})

const tabs = [
	{ name: "all", label: "All Collections" },
	{ name: "mycollections", label: "My Collections" },
]

// TODO: Add virtual scroll
</script>
<template>
	<div>
		<div class="column row-md align-items-end-md q-mb-42">
			<Title class="q-mr-32">Collections</Title>
		</div>
		<div class="row items-center justify-between q-mb-42">
			<div class="q-mb-xs-20">
				<Tabs v-model="collectionsType" :options="tabs" border />
			</div>

			<LargeButton
				class="q-ml-auto"
				label="Create Collection"
				:to="`/nfts/${code}/create`"
				fit
			/>
		</div>

		<Spinner v-if="NFTStore.loading" class="!w-50 !h-50 q-mx-auto" />

		<template v-if="collectionsType === 'mycollections'">
			<template v-if="NFTStore.myCollections.length > 0">
				<div
					v-if="!NFTStore.loading"
					class="grid grid-cols-min-xs-1 grid-cols-2 grid-cols-md-3 grid-cols-lg-4 grid-gap-30 q-mb-42"
				>
					<RouterLink
						v-for="(collection, index) in NFTStore.myCollections"
						:key="index"
						:to="`/nfts/${collection.address}/details`"
						class="block full-height"
					>
						<CollectionCard :collection="collection" />
					</RouterLink>
				</div>
			</template>
		</template>
		<div
			v-else
			class="grid grid-cols-min-xs-1 grid-cols-2 grid-cols-md-3 grid-cols-lg-4 grid-gap-30 q-mb-74"
		>
			<RouterLink
				v-for="(collection, index) in NFTStore.bitsongCollections"
				:key="index"
				:to="`/nfts/${collection.address}/details`"
				class="block full-height"
			>
				<CollectionCard :collection="collection" />
			</RouterLink>
		</div>
	</div>
</template>
