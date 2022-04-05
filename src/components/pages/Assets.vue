<script setup lang="ts">
import { TableColumn } from "@/types/table"
import { balancedCurrency } from "@/common/numbers"
import { computed, ref, watch, onUnmounted } from "vue"
import { TokenBalance } from "@/types"
import { resolveIcon } from "@/common/resolvers"
import Title from "@/components/typography/Title.vue"
import LightTable from "@/components/LightTable.vue"
import InfoCard from "@/components/cards/InfoCard.vue"
import TransferModal from "@/components/modals/TransferModal.vue"
import useBank from "@/store/bank"
import usePrices from "@/store/prices"
import usePools from "@/store/pools"
import useAuth from "@/store/auth"
import useTransactionManager from "@/store/transaction-manager"

const bankStore = useBank()
const pricesStore = usePrices()
const poolsStore = usePools()
const transactionManagerStore = useTransactionManager()
const authStore = useAuth()
const openTransferDialog = ref(false)
const transferFrom = ref<TokenBalance>()

const broadcastingWatcher = watch(
	() => transactionManagerStore.loadingBroadcasting,
	(oldLoading, newLoading) => {
		if (oldLoading !== newLoading) {
			openTransferDialog.value = false
		}
	}
)

onUnmounted(() => {
	broadcastingWatcher()
})

const columns: TableColumn[] = [
	{
		name: "index",
		required: true,
		label: "",
		align: "left",
		field: "index",
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
		field: (row: TokenBalance) => row.symbol,
		sortable: false,
		format: (val: any) => `${val}`,
	},
	{
		name: "price",
		align: "center",
		label: "Price",
		field: (row: TokenBalance) => row.price,
		sortable: false,
		format: (val: string) => `${balancedCurrency(val)} $`,
	},
	{
		name: "chain",
		align: "center",
		label: "Chain",
		field: "chains",
		sortable: false,
	},
	{ name: "available", label: "Available", field: "total", sortable: true },
	{ name: "quantity", label: "QTY", field: "bonded", sortable: true },
	{ name: "arrows", label: "", field: "", sortable: false },
]

const haveMultiChainBalances = computed(() => {
	return (
		bankStore.balances.find((b) => b.chains && b.chains?.length > 0) !== undefined
	)
})

const columnsWrapper = computed(() => {
	const cols = [...columns]

	if (haveMultiChainBalances.value) {
		cols.push({ name: "expandIcon", label: "", field: "", sortable: false })
	}

	return cols
})

const openTransfer = (from: TokenBalance) => {
	transferFrom.value = from
	openTransferDialog.value = true
}
</script>

<template>
	<Title class="q-mb-36">Assets</Title>
	<div class="row text-weight-medium q-col-gutter-lg q-mb-75">
		<div class="col-8 col-md-4 col-lg-2">
			<InfoCard header="Total assets">
				{{ balancedCurrency(bankStore.total) }} $
			</InfoCard>
		</div>
		<div class="col-8 col-md-4 col-lg-2">
			<InfoCard header="Available assets">
				{{ balancedCurrency(bankStore.available) }} $
			</InfoCard>
		</div>
		<div class="col-8 col-md-4 col-lg-2">
			<InfoCard header="Bonded assets">
				{{ balancedCurrency(poolsStore.totalBondedFiat) }} $
			</InfoCard>
		</div>
		<div class="col-8 col-md-4 col-lg-2">
			<InfoCard header="BTSG price">
				{{ balancedCurrency(pricesStore.btsgPrice) }} $
			</InfoCard>
		</div>
	</div>
	<p class="q-mb-21 fs-21 text-weight-medium">Tokens</p>
	<div>
		<LightTable :columns="columnsWrapper" :rows="bankStore.balances">
			<template v-slot:body="rowProps">
				<q-tr :props="rowProps">
					<q-td>
						<span class="opacity-40">
							{{ rowProps.rowIndex + 1 }}
						</span>
					</q-td>
					<q-td>
						<div class="row items-center no-wrap">
							<q-avatar size="sm" class="q-mr-22">
								<img :src="rowProps.row.logos.default" :alt="rowProps.row.name" />
							</q-avatar>
							<p class="text-weight-medium fs-14">
								{{ rowProps.row.name }}
							</p>
						</div>
					</q-td>
					<q-td>
						<p class="text-white text-center">
							{{ rowProps.row.fantoken ? "$" : "" }}{{ rowProps.row.symbol }}
						</p>
					</q-td>
					<q-td>
						<p class="text-white text-center">
							{{ balancedCurrency(rowProps.row.price) }} $
						</p>
					</q-td>
					<q-td>
						<div class="flex justify-center">
							<q-avatar
								v-for="(chain, i) in rowProps.row.chains"
								:key="i"
								size="20px"
								:class="i > 0 ? 'q-ml-8' : ''"
							>
								<img :src="chain.logos.default" />
							</q-avatar>
						</div>
					</q-td>
					<q-td>
						<p
							:class="
								'text-right ' + (rowProps.row.availableFiat > 0 ? '' : 'opacity-40')
							"
						>
							{{
								rowProps.row.availableFiat
									? `${balancedCurrency(rowProps.row.availableFiat)} $`
									: "-"
							}}
						</p>
					</q-td>
					<q-td>
						<p
							:class="'text-right ' + (rowProps.row.available > 0 ? '' : 'opacity-40')"
						>
							{{
								rowProps.row.available
									? `${balancedCurrency(rowProps.row.available)} ${rowProps.row.symbol}`
									: "-"
							}}
						</p>
					</q-td>
					<q-td>
						<div
							class="opacity-40 hover:opacity-100 cursor-pointer fs-15 text-right light:hover:text-primary"
							@click="openTransfer(rowProps.row)"
							v-if="rowProps.row.ibcEnabled && authStore.session"
						>
							<q-icon :name="resolveIcon('swap', 21, 16)"></q-icon>
						</div>
					</q-td>
					<q-td v-if="haveMultiChainBalances">
						<div
							class="opacity-40 flex justify-end hover:opacity-100 cursor-pointer fs-12"
							@click="rowProps.expand = !rowProps.expand"
							v-if="rowProps.row.chains.length > 0"
						>
							<div :class="'w-fit ' + (rowProps.expand ? 'rotate-180' : '')">
								<q-icon :name="resolveIcon('keyboard-arrow-down', 10, 6)"></q-icon>
							</div>
						</div>
					</q-td>
				</q-tr>
				<q-tr
					v-for="chain in rowProps.row.chains"
					v-show="rowProps.expand"
					:props="rowProps"
					no-hover
				>
					<q-td> </q-td>
					<q-td>
						<div class="flex justify-start q-ml-46">
							<div class="text-capitalize text-primary-light flex items-center">
								<p>
									{{ chain.name }}
								</p>
								<q-avatar size="20px" class="q-ml-10">
									<img :src="chain.logos.default" />
								</q-avatar>
							</div>
						</div>
					</q-td>
					<q-td> </q-td>
					<q-td> </q-td>
					<q-td>
						<p :class="'text-right ' + (chain.availableFiat > 0 ? '' : 'opacity-40')">
							{{
								chain.availableFiat ? `${balancedCurrency(chain.availableFiat)} $` : "-"
							}}
						</p>
					</q-td>
					<q-td>
						<p :class="'text-right ' + (chain.available > 0 ? '' : 'opacity-40')">
							{{
								chain.available
									? `${balancedCurrency(chain.available)} ${rowProps.row.symbol}`
									: "-"
							}}
						</p>
					</q-td>
					<q-td></q-td>
					<q-td v-if="haveMultiChainBalances"></q-td>
				</q-tr>
			</template>
		</LightTable>
		<TransferModal
			v-model="openTransferDialog"
			:coin="transferFrom"
			v-if="transferFrom"
		/>
	</div>
</template>
