<script setup lang="ts">
import { TableColumn } from "@/types/table"

withDefaults(
	defineProps<{
		rows: any[]
		columns: TableColumn[]
		alternative?: boolean
		alternativeIndex?: boolean
		headerBorder?: boolean
		noBackground?: boolean
	}>(),
	{
		alternative: false,
		alternativeIndex: false,
		headerBorder: false,
	}
)

const pagination = {
	rowsPerPage: -1,
}
</script>

<template>
	<q-table
		row-key="name"
		:rows="rows"
		:columns="columns"
		:pagination="pagination"
		class="footer-h-0"
		:class="{
			'table-no-background': noBackground || alternative,
			'table-header-border': headerBorder,
			alternative,
			'alternative-index': alternativeIndex,
			'table-empty': rows.length === 0,
		}"
		hide-bottom
	>
		<template v-slot:header="slotProps">
			<q-tr :props="slotProps">
				<q-th
					v-for="col in slotProps.cols"
					:key="col.name"
					:props="slotProps"
					class="fs-13 text-uppercase text-weight-medium transactions-table-head-row"
					:colspan="col.colspan"
				>
					{{ col.label }}
				</q-th>
			</q-tr>
		</template>
		<template v-for="(_, slot) of $slots" v-slot:[slot]="scope">
			<slot :name="slot" v-bind="scope"></slot>
		</template>
		<template v-slot:no-data="{ message }">
			<div
				class="q-py-16 q-pr-16 q-pl-10 flex justify-center items-center fs-18 opacity-40"
			>
				<p>
					{{ message ?? "No data" }}
				</p>
			</div>
		</template>
	</q-table>
</template>
