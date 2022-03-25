<script setup lang="ts">
	import { balancedCurrency as  balancedCurrency } from '@/common/numbers'
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
			format: (val: string) => `$${val}`,
		},
		{
			name: 'price',
			label: 'Price',
			field: 'price',
			sortable: true,
			format: (val: string) => `${balancedCurrency(val)} $`
		},
		{
			name: 'marketcap',
			label: 'Market Cap',
			field: 'marketCap',
			sortable: true,
			format: (val: string) => `${balancedCurrency(val)} $`
		}
	]
</script>
<template>
	<h3 class="q-mb-xl fs-27">DEx</h3>
	<CryptoTable :columns="columns" :rows="configStore.fantokens" @row-click="(_, row, index) => {$router.push('/fantokens/prova')}" />
</template>