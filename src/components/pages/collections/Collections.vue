<script setup lang="ts">
import Title from "@/components/typography/Title.vue"
import CollectionCard from "@/components/cards/CollectionCard.vue"
import LightTable from "@/components/LightTable.vue"
import useNFT from "@/store/nft"
import Spinner from "@/components/Spinner"
import { computed } from "vue"
import { useRoute, RouterLink } from "vue-router"
import onAppReady from "@/hooks/onAppReady"
import { TableColumn } from "@/types"

const route = useRoute()
const NFTStore = useNFT()

const code = route.params.codeId
	? parseInt(route.params.codeId as string, 10)
	: parseInt(import.meta.env.VITE_BS721_CODE_ID, 10)

onAppReady(() => {
	NFTStore.loadCollections(code)
})

const collectionsColumns = computed<TableColumn[]>(() => [
	{
		name: "name",
		align: "left",
		label: "Collection",
		field: (row) => row.init.name,
		sortable: true,
	},
	{
		name: "symbol",
		label: "Symbol",
		field: (row) => row.init.symbol,
		align: "center",
	},
	{
		name: "owners",
		label: "Owners",
		field: (row) => "-",
		align: "center",
	},
	{
		name: "items",
		label: "Items",
		field: (row) => "-",
		align: "center",
	},
])
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

		<LightTable
			:rows="NFTStore.latestCollections"
			:columns="collectionsColumns"
			no-background
			header-border
			alternative-no-index
			class="q-px-0 q-py-0 table-no-padding"
			@row-click="
				(_, row) => {
					$router.push(`/nfts/${row.address}/details`)
				}
			"
		>
			<template v-slot:body-cell-name="slotProps">
				<q-td :props="slotProps">
					<div class="flex no-wrap items-center">
						<q-img
							:src="slotProps.row?.metadata?.image"
							class="rounded cover s-40 q-mr-22"
							fit="cover"
						/>
						<p class="fs-14 text-weight-medium">
							{{ slotProps.row.init.name }}
						</p>
					</div>
				</q-td>
			</template>
		</LightTable>
	</div>
</template>
