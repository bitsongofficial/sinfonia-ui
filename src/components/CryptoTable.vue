<script setup lang="ts">
	import { TableColumn, TokenBalance } from '@/types'
	import LightTable from './LightTable.vue'

	defineProps<{
		rows: TokenBalance[],
		columns: TableColumn[]
	}>()
</script>

<template>
    <LightTable :rows="rows" :columns="columns">
			<template v-slot:body-cell-symbol="slotProps">
				<q-td :props="slotProps">
					<span class="opacity-40 fs-10">
						${{ slotProps.row.symbol }}
					</span>
				</q-td>
			</template>
			<template v-slot:body-cell-token="slotProps">
				<q-td :props="slotProps">
					<div class="row items-center no-wrap">
						<q-avatar
							size="sm"
							class="q-mr-22">
							<img :src="slotProps.row.logos.default" :alt="slotProps.row.name">                   
						</q-avatar>
						<p class="text-weight-medium">
							{{ slotProps.row.name }}
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
			<template v-for="(_, slot) of $slots" v-slot:[slot]="scope">
				<slot :name="slot" v-bind="scope"></slot>
			</template>
	</LightTable>
</template>