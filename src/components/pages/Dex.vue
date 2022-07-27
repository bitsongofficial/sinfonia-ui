<script setup lang="ts">
import { balancedCurrency, resolveIcon } from "@/common"
import { TokenBalance } from "@/types"
import { TableColumn } from "@/types/table"
import { useRouter } from "vue-router"
import { computed, ref } from "vue"
import { reduce } from "lodash"
import { BigNumber } from "bignumber.js"
import useConfig from "@/store/config"
import CryptoTable from "@/components/CryptoTable.vue"
import Title from "@/components/typography/Title.vue"
import Tabs from "@/components/Tabs.vue"

const configStore = useConfig()
const router = useRouter()
const fantokensType = ref("all")
const searchFocussed = ref(false)
const searchValue = ref("")

const searchActive = computed(() => {
	return searchValue.value.length > 0 || searchFocussed.value
})

const focussed = () => {
	searchFocussed.value = true
}

const columns: TableColumn[] = [
	{
		name: "rank",
		required: true,
		label: "",
		align: "left",
		field: "rank",
		headerClasses: "w-1 hidden",
		classes: "w-1",
	},
	{
		name: "token",
		align: "left",
		label: "Token",
		field: "name",
		sortable: true,
		colspan: "2",
	},
	{
		name: "symbol",
		align: "center",
		label: "Symbol",
		field: "symbol",
		sortable: true,
		format: (val: string) => `${val}`,
	},
	{
		name: "price",
		label: "Price",
		field: "price",
		sortable: true,
		sort: (a, b, rowA, rowB) => {
			return parseFloat(a) - parseFloat(b)
		},
		format: (val: string) => `${balancedCurrency(val)} $`,
	},
	{
		name: "marketcap",
		label: "Market Cap",
		field: "marketCap",
		sortable: true,
		sort: (a, b, rowA, rowB) => {
			return parseInt(a, 10) - parseInt(b, 10)
		},
		format: (val: string) => `${balancedCurrency(val)} $`,
	},
]

const pagination = {
	rowsPerPage: -1,
	sortBy: "marketcap",
	descending: true,
}

const onRowClick = (_, row: TokenBalance, index: number) => {
	const coinLookup = row.coinLookup.find((coin) => coin.viewDenom === row.symbol)

	if (coinLookup) {
		router.push(`/fantokens/${coinLookup.fantokenDenom}`)
	}
}

const totalMarketCap = computed(() => {
	const ttlMC = reduce(
		configStore.fantokensRanking,
		(prev, curr) => {
			const currMarketCap = new BigNumber(curr.marketCap ?? 0)

			return prev.plus(currMarketCap)
		},
		new BigNumber(0)
	)

	return balancedCurrency(ttlMC.toString())
})

const tabs = [
	{ name: "all", label: "All Tokens" },
	{ name: "artist", label: "Artists" },
	{ name: "label", label: "Labels" },
	{ name: "magazine", label: "Magazines" },
]

const fantokens = computed(() =>
	configStore.fantokensRanking
		.filter((fantoken) => {
			if (fantokensType.value === "all") {
				return true
			}

			const tags = fantoken.metadata?.tags ?? []

			return tags.includes(fantokensType.value)
		})
		.filter((fantoken) => {
			if (!searchActive.value) {
				return true
			}

			return fantoken.name
				.toLocaleLowerCase()
				.includes(searchValue.value.toLocaleLowerCase())
		})
)
</script>
<template>
	<div class="column row-md items-center-md q-mb-42">
		<Title class="q-mr-32">FanTokens</Title>
		<div class="row items-center q-mt-24 q-mt-md-none">
			<p class="fs-16 !leading-24 q-mr-14 opacity-40">The total market cap is</p>

			<p class="fs-21 !leading-24 text-weight-medium text-gradient">
				$ {{ totalMarketCap }}
			</p>
		</div>
	</div>
	<div class="row items-center justify-between q-mb-42">
		<div class="q-mt-8">
			<Tabs v-model="fantokensType" :options="tabs" border />
		</div>

		<div
			@click="focussed"
			@focusout="searchFocussed = false"
			class="relative-position cursor-pointer group q-mt-24 q-mt-md-none"
		>
			<div
				class="absolute-full bg-white rounded-30 opacity-5 light:opacity-100 shadow-md"
			></div>
			<div class="flex items-center q-px-28 q-py-8 min-h-44">
				<q-input
					class="q-mr-4 min-size-input"
					input-class="q-py-0"
					hide-bottom-space
					borderless
					v-show="searchActive"
					v-model="searchValue"
					:debounce="500"
					dense
				/>
				<q-icon
					class="opacity-40"
					size="15px"
					:name="resolveIcon('search', 13, 13)"
				></q-icon>
			</div>
		</div>
	</div>
	<CryptoTable
		:columns="columns"
		:rows="fantokens"
		:pagination="pagination"
		@row-click="onRowClick"
	/>
</template>
