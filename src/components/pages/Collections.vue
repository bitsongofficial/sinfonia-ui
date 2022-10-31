<script setup lang="ts">
import Title from "@/components/typography/Title.vue"
import CollectionCard from "@/components/cards/CollectionCard.vue"
import SmallButton from "@/components/buttons/SmallButton.vue"
import useNFT from "@/store/nft"
import Spinner from "@/components/Spinner"
import { onMounted } from "vue"
import { useRoute, RouterLink } from "vue-router"

const route = useRoute()
const NFTStore = useNFT()

const code = route.params.codeId
	? parseInt(route.params.codeId as string, 10)
	: parseInt(import.meta.env.VITE_BS721_CODE_ID, 10)

onMounted(() => {
	NFTStore.loadCollections(code)
})

// TODO: Add virtual scroll
</script>
<template>
	<div>
		<div class="column row-md align-items-end-md q-mb-42">
			<Title class="q-mr-32">
				Collections

				<SmallButton
					class="q-ml-20"
					label="Create"
					:to="`/create-collection/${code}`"
				/>
			</Title>
		</div>
		<Spinner v-if="NFTStore.loading" class="!w-50 !h-50 q-mx-auto" />
		<div
			v-else
			class="grid grid-cols-min-xs-1 grid-cols-2 grid-cols-md-3 grid-cols-lg-4 grid-gap-30 q-mb-74"
		>
			<RouterLink
				v-for="(collection, index) in NFTStore.collections"
				:key="index"
				:to="`/collection/${collection.address}/`"
				class="block full-height"
			>
				<CollectionCard :collection="collection" />
			</RouterLink>
		</div>
	</div>
</template>
