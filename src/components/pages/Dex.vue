<script setup lang="ts">
import { balancedCurrency as balancedCurrency } from "@/common/numbers"
import useConfig from "@/store/config"
import { TokenBalance } from "@/types"
import { TableColumn } from "@/types/table"
import { useRouter } from "vue-router"
import CryptoTable from "../CryptoTable.vue"

const configStore = useConfig()
const router = useRouter()

const columns: TableColumn[] = [
	{
		name: "rank",
		required: true,
		label: "",
		align: "left",
		field: "rank",
	},
	{
		name: "token",
		align: "left",
		label: "Token",
		field: "name",
		sortable: true,
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
</script>
<template>
	<h3 class="q-mb-xl fs-27 light:text-weight-medium">FanTokens</h3>
	<CryptoTable
		:columns="columns"
		:rows="configStore.fantokensRanking"
		:pagination="pagination"
		@row-click="onRowClick"
	/>
</template>
