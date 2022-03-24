<script setup lang="ts">
	import { balancedCurrency as currency, toFiatValue, percentage } from '@/common/numbers'
	import useConfig from '@/store/config'
	import { TableColumn } from '@/types/table'
	import CryptoTable from "../CryptoTable.vue"

	const configStore = useConfig()

	const columns: TableColumn[] = [
		{
			name: 'index',
			required: true,
			label: '',
			align: 'left',
			field: 'index',
		},
		{ 
			name: 'token',
			align: 'left',
			label: 'Token',
			field: 'name',
			sortable: true
		},
		{
			name: 'symbol',
			align: 'center',
			label: 'Symbol',
			field: 'symbol',
			sortable: false,
			format: (val:any) => `$${val}`,
		},
		{ name: 'price', label: 'Price', field: 'price', sortable: true, format: (val: string) => `${currency(val)} $`},
		{
			name: 'marketcap',
			label: 'Market Cap',
			field: 'marketCap',
			sortable: true,
			format: (val: string) => `${currency(val)} $`
			}
	]
</script>
<template>
	<h3 class="q-mb-xl fs-27">Dex</h3>
	<CryptoTable :columns="columns" :rows="configStore.fantokens" />
</template>