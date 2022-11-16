<script setup lang="ts">
import { computed, ref } from "vue"
import { RouterLink } from "vue-router"
import { Pool, TableColumn } from "@/types"
import { balancedCurrency, percentage } from "@/common"
import { reduce } from "lodash"
import { BigNumber } from "bignumber.js"
import Title from "@/components/typography/Title.vue"
import usePools from "@/store/pools"
import PoolCard from "@/components/cards/PoolCard.vue"
import FillSelect from "@/components/inputs/FillSelect.vue"
import LightTable from "@/components/LightTable.vue"
import ImagePair from "@/components/ImagePair.vue"
const poolsStore = usePools()

const poolsViewType = ref("GRID")
const myPoolsViewType = ref("GRID")

const poolsViewTypes = [
	{
		label: "Grid",
		value: "GRID",
		icon: {
			name: "grid",
		},
	},
	{
		label: "List",
		value: "LIST",
		icon: {
			name: "pause",
		},
	},
]

const pagination = {
	rowsPerPage: -1,
	sortBy: "apr",
	descending: true,
}

const poolsColumns = computed<TableColumn[]>(() => [
	{
		name: "id",
		align: "left",
		label: "",
		field: "id",
		sortable: true,
		headerClasses: "w-5",
		classes: "w-5",
	},
	{
		name: "tokenPair",
		align: "left",
		label: "Pool",
		field: "name",
		sortable: true,
	},
	{
		name: "apr",
		label: "APR",
		field: (row: Pool) => row.APR,
		sortable: true,
		format: (val: any) => `${percentage(val)} %`,
		sort: (a, b, rowA, rowB) => {
			return parseFloat(a) - parseFloat(b)
		},
	},
	{
		name: "liquidity",
		label: "Liquidity",
		field: (row: Pool) => row.liquidity,
		sortable: true,
		format: (val: any) => `${balancedCurrency(val)} $`,
		sort: (a, b, rowA, rowB) => {
			return parseFloat(a) - parseFloat(b)
		},
	},
	{
		name: "my_liquidity",
		label: "My Liquidity",
		field: (row: Pool) => row.userLiquidity,
		sortable: true,
		format: (val: any) => `${balancedCurrency(val)} $`,
		sort: (a, b, rowA, rowB) => {
			return parseFloat(a) - parseFloat(b)
		},
	},
	{
		name: "my_bonding",
		label: "My Bonding",
		field: (row: Pool) => row.bonded,
		sortable: true,
		format: (val: any) => `${balancedCurrency(val)} $`,
		sort: (a, b, rowA, rowB) => {
			return parseFloat(a) - parseFloat(b)
		},
	},
])

const totalLiquidity = computed(() => {
	const liquidity = reduce(
		poolsStore.pools,
		(prev, pool) => {
			const currLiquidity = new BigNumber(pool.liquidity)

			return prev.plus(currLiquidity)
		},
		new BigNumber(0)
	)

	return balancedCurrency(liquidity.toString())
})
</script>

<template>
	<div>
		<template v-if="poolsStore.myPools.length > 0">
			<div class="grid grid-cols-8 q-mb-42">
				<div class="column row-md align-items-end-md col-span-8 col-span-md-4">
					<Title class="q-mr-42 q-mb-xs-24">My Pools</Title>
				</div>

				<FillSelect
					name="myPools"
					class="col-start-span-md-1 col-span-8 col-span-md-1 col-start-md-8"
					v-model="myPoolsViewType"
					:options="poolsViewTypes"
				/>
			</div>
			<div
				class="grid grid-cols-min-xs-1 grid-cols-2 grid-cols-md-3 grid-cols-lg-4 grid-gap-30 q-mb-74"
				v-if="myPoolsViewType === 'GRID'"
			>
				<RouterLink
					v-for="(userPool, index) in poolsStore.myPools"
					:key="index"
					:to="'/pools/' + userPool.id"
					class="block full-height"
				>
					<PoolCard :pool="userPool" user-pool />
				</RouterLink>
			</div>
			<LightTable
				v-else
				:pagination="pagination"
				:rows="poolsStore.myPools"
				:columns="poolsColumns"
				class="q-mb-74"
				@row-click="
					(_, row) => {
						$router.push(`/pools/${row.id}`)
					}
				"
			>
				<template v-slot:body-cell-id="slotProps">
					<q-td :props="slotProps">
						<div class="flex no-wrap items-center">
							<span class="opacity-40 q-mr-10">
								{{ slotProps.row.id }}
							</span>
						</div>
					</q-td>
				</template>
				<template v-slot:body-cell-tokenPair="slotProps">
					<q-td :props="slotProps">
						<div class="flex no-wrap items-center">
							<ImagePair
								:coins="slotProps.row.coins"
								class="q-mr-30"
								:size="30"
								:smaller-size="24"
								:offset="[0, 0]"
								inline
							/>
							<p class="fs-14 text-weight-medium">
								<template v-for="(coin, index) of slotProps.row.coins" :key="index">
									{{ coin.token.symbol
									}}{{ index === slotProps.row.coins.length - 1 ? "" : " · " }}
								</template>
							</p>
						</div>
					</q-td>
				</template>
			</LightTable>
		</template>
		<div class="grid grid-cols-8 q-mb-42">
			<div class="column row-md align-items-end-md col-span-8 q-mb-32">
				<Title class="q-mr-32">All Pools</Title>
				<div class="row items-end q-mt-24 q-mt-md-none">
					<p class="fs-16 !leading-22 q-mr-14 opacity-40">The total liquidity is</p>

					<p class="fs-24 !leading-24 text-weight-medium text-gradient">
						$ {{ totalLiquidity }}
					</p>
				</div>
			</div>
			<p
				class="fs-16 !leading-24 q-mb-md-none opacity-40 col-span-12 col-span-md-5 q-mb-xs-24"
			>
				On this page you can become a Liquidity Provider participating on the
				Sinfonia Pools. Bond your tokens to provide security to the network and earn
				rewards
			</p>

			<FillSelect
				name="poolsType"
				class="col-start-span-md-1 col-span-8 col-span-md-1 col-end-md-9"
				v-model="poolsViewType"
				:options="poolsViewTypes"
			/>
		</div>
		<div
			class="grid grid-cols-min-xs-1 grid-cols-2 grid-cols-md-3 grid-cols-lg-4 grid-gap-30"
			v-if="poolsViewType === 'GRID'"
		>
			<RouterLink
				v-for="(pool, index) in poolsStore.pools"
				:key="index"
				:to="'/pools/' + pool.id"
				class="block full-height"
			>
				<PoolCard :pool="pool" />
			</RouterLink>
		</div>
		<LightTable
			v-else
			:pagination="pagination"
			:rows="poolsStore.pools"
			:columns="poolsColumns"
			@row-click="
				(_, row) => {
					$router.push(`/pools/${row.id}`)
				}
			"
		>
			<template v-slot:body-cell-id="slotProps">
				<q-td :props="slotProps">
					<div class="flex no-wrap items-center">
						<span class="opacity-40 q-mr-10">
							{{ slotProps.row.id }}
						</span>
					</div>
				</q-td>
			</template>
			<template v-slot:body-cell-tokenPair="slotProps">
				<q-td :props="slotProps">
					<div class="flex no-wrap items-center">
						<ImagePair
							:coins="slotProps.row.coins"
							class="q-mr-30"
							:size="30"
							:smaller-size="24"
							:offset="[0, 0]"
							inline
						/>
						<p class="fs-14 text-weight-medium">
							<template v-for="(coin, index) of slotProps.row.coins" :key="index">
								{{ coin.token.symbol
								}}{{ index === slotProps.row.coins.length - 1 ? "" : " · " }}
							</template>
						</p>
					</div>
				</q-td>
			</template>
		</LightTable>
	</div>
</template>
