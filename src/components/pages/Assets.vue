<script setup lang="ts">
	import Title from '@/components/typography/Title.vue'
	import LightTable from '@/components/LightTable.vue'
	import IconButton from '@/components/buttons/IconButton.vue'
	import InfoCard from '@/components/cards/InfoCard.vue'
	import { newCoin, newUser } from '@/common/mockups'
	import { Coin } from '@/types/coin'
	import { User } from '@/types/user'
	import { balancedCurrency } from '@/common/numbers'
	import { TableColumn } from '@/types/table'
	import useBank from '@/store/bank'

	const bankStore = useBank()

	const btsg:Coin = newCoin("BTSG")

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
			align: 'left',
			label: '',
			field: 'symbol',
			sortable: false
		},
		{ name: 'available', label: 'Available assets', field: 'total', sortable: true },
		{ name: 'bonded', label: 'Available tokens', field: 'bonded', sortable: true },
		{ name: 'arrows', label: '', field: '', sortable: false},
	]
</script>

<template>
	<Title class="q-mb-36">Assets</Title>
	<div class="row font-weight-medium q-col-gutter-lg q-mb-75">
		<div class="col-2">
			<InfoCard header="Total assets">
				{{ balancedCurrency(bankStore.total) }} $
			</InfoCard>
		</div>
		<div class="col-2">
			<InfoCard header="Available assets">
				{{ balancedCurrency(bankStore.available) }} $
			</InfoCard>
		</div>
		<div class="col-2">
			<InfoCard header="Bonded assets">
				{{ balancedCurrency(bankStore.bonded) }} $
			</InfoCard>
		</div>
		<div class="col-2">
			<InfoCard header="BTSG price">
				{{ balancedCurrency(btsg.price) }} $
			</InfoCard>
		</div>
	</div>
	<p class="q-mb-21 fs-18 font-weight-medium">Tokens</p>
	<div>
		<LightTable :columns="columns" :rows="bankStore.balances">
			<template v-slot:body-cell-token="props">
				<q-td :props="props">
					<div class="row items-center">
						<q-avatar
							size="sm"
							class="q-mr-22">
							<img :src="props.row.logos.default" :alt="props.row.name">                   
						</q-avatar>
						<p class="text-weight-medium fs-14">
							{{ props.row.name }}
						</p>
					</div>
				</q-td>
			</template>
			<template v-slot:body-cell-index="props">
				<q-td :props="props">
					<span class="opacity-40">
						{{ props.rowIndex + 1 }}
					</span>
				</q-td>
			</template>
			<template v-slot:body-cell-symbol="props">
				<q-td :props="props">
					<span class="opacity-40 fs-12">
						{{ props.row.fantoken ? '$' : '' }}{{ props.row.symbol }}
					</span>
				</q-td>
			</template>
			<template v-slot:body-cell-available="props">
				<q-td :props="props">
					<p :class="(props.row.available > 0 ? '' : 'opacity-40')">
						{{ props.row.available ? balancedCurrency(props.row.available) : '-' }}
					</p>
				</q-td>
			</template>
			<template v-slot:body-cell-bonded="props">
				<q-td :props="props">
					<p :class="(props.row.bonded > 0 ? '' : 'opacity-40')">
						{{ props.row.bonded ? balancedCurrency(props.row.bonded) : '-' }}
					</p>
				</q-td>
			</template>
			<template v-slot:body-cell-arrows="props">
				<q-td :props="props">
					<div>
						<IconButton icon="arrow-up" height="12" width="14" class="q-mr-42 fs-12 s-20" />
						<IconButton icon="arrow-up" height="12" width="14" class="rotate-180 fs-12 s-20" />
					</div>
				</q-td>
			</template>
		</LightTable>
	</div>
</template>