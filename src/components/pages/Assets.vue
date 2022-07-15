<script setup lang="ts">
import ImagePair from "@/components/ImagePair.vue"
import { TableColumn, GammBalance, Pool } from "@/types"
import { balancedCurrency, balancedGamm, toDecimalGamm } from "@/common/numbers"
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
import PoolContextMenu from "../navigation/PoolContextMenu.vue"
import { useRouter } from "vue-router"
import IconButton from "../buttons/IconButton.vue"
import LiquidityModal from "../modals/LiquidityModal.vue"

const bankStore = useBank()
const pricesStore = usePrices()
const poolsStore = usePools()
const transactionManagerStore = useTransactionManager()
const authStore = useAuth()
const router = useRouter()

const openTransferDialog = ref(false)
const currentGammPool = ref<Pool | undefined>(undefined)
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

const showGammPoolModal = computed({
	get: () => currentGammPool.value !== undefined,
	set: (value) => {
		if (!value) {
			currentGammPool.value = undefined
		}
	},
})

const gammPoolsColumns = computed<TableColumn[]>(() => [
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
		name: "gamm",
		align: "right",
		label: "GAMM",
		field: (row: GammBalance) => {
			return row
		},
		format: (row: GammBalance) =>
			`${balancedGamm(toDecimalGamm(row.coin.amount))} GAMM/${row.pool.id ?? "0"}`,
		sortable: true,
	},
	{
		name: "value",
		label: "value",
		field: (row: GammBalance) => row.pool.lpLiquidity,
		sortable: true,
		format: (val: any) => `${balancedCurrency(val)} $`,
	},
	{
		name: "actions",
		label: "",
		field: "",
		sortable: false,
		headerClasses: "w-5",
		classes: "w-5",
	},
])

const columns: TableColumn[] = [
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
		sort: (a, b, rowA, rowB) => {
			return parseFloat(a) - parseFloat(b)
		},
		format: (val: string) => `${balancedCurrency(val)} $`,
	},
	{
		name: "availableFiat",
		label: "Available",
		field: "availableFiat",
		sortable: true,
		sort: (a, b, rowA, rowB) => {
			return parseFloat(a) - parseFloat(b)
		},
	},
	{
		name: "available",
		label: "QTY",
		field: "available",
		sortable: true,
		sort: (a, b, rowA, rowB) => {
			return parseFloat(a) - parseFloat(b)
		},
	},
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
		cols.splice(3, 0, {
			name: "chain",
			align: "center",
			label: "Chain",
			field: "chains",
			sortable: false,
		})
		cols.push({ name: "expandIcon", label: "", field: "", sortable: false })
	}

	return cols
})

const pagination = {
	rowsPerPage: -1,
	sortBy: "available",
	descending: true,
}

const openTransfer = (from: TokenBalance) => {
	transferFrom.value = from
	openTransferDialog.value = true
}

const onSwapClick = (pool: Pool) => {
	const coins = [...pool.coins]
	const fromCoin = coins.shift()
	const toCoin = coins.shift()

	if (fromCoin && toCoin) {
		router.push(`/swap?from=${fromCoin.token.symbol}&to=${toCoin.token.symbol}`)
	}
}
</script>

<template>
	<Title class="q-mb-16">Assets</Title>
	<div class="row q-mb-46">
		<div class="col-12 col-md-6 col-lg-5">
			<p class="fs-16 opacity-40 !leading-24 q-mb-none q-mt-16">
				Sinfonia is a multi chain platform. On this app you might have assets on
				different chains (ex. BitSong, Osmosis, Cosmos etc.). In order to be able to
				provide liquidity on the pools, you might need to perform interchain
				transfers.
			</p>
		</div>
		<div class="column col-12 col-md-6 col-lg-3">
			<p
				class="fs-12 opacity-50 text-white !leading-24 q-mb-none text-right q-mt-xs-10 q-mt-md-10 text-left-xs text-left-md"
			>
				EPOCH END
			</p>

			<vue-countdown
				:time="poolsStore.payoutTime"
				v-slot="{ hours, minutes }"
				class="fs-32 !leading-48 text-white text-weight-medium text-right text-left-xs text-left-md"
			>
				{{ hours }}h <span class="opacity-20">:</span> {{ minutes }}m
			</vue-countdown>
		</div>
	</div>
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
	<template v-if="bankStore.gammPoolBalances.length > 0">
		<p class="q-mb-21 fs-21 text-weight-medium">GAMM Pool</p>

		<LightTable
			:rows="bankStore.gammPoolBalances"
			:columns="gammPoolsColumns"
			class="q-mb-66"
			@row-click="
				(_, row) => {
					$router.push(`/pools/${row.pool.id}`)
				}
			"
		>
			<template v-slot:body-cell-id="slotProps">
				<q-td :props="slotProps">
					<div class="flex no-wrap items-center">
						<span class="opacity-40 q-mr-10">
							{{ slotProps.row.pool.id }}
						</span>
					</div>
				</q-td>
			</template>
			<template v-slot:body-cell-tokenPair="slotProps">
				<q-td :props="slotProps">
					<div class="flex no-wrap items-center">
						<ImagePair
							:coins="slotProps.row.pool.coins"
							class="q-mr-30"
							:size="30"
							:smaller-size="24"
							:offset="[0, 0]"
							inline
						/>
						<p class="fs-14 text-weight-medium">
							<template v-for="(coin, index) of slotProps.row.pool.coins" :key="index">
								{{ coin.token.symbol
								}}{{ index === slotProps.row.pool.coins.length - 1 ? "" : " · " }}
							</template>
						</p>
					</div>
				</q-td>
			</template>
			<template v-slot:body-cell-actions="slotProps">
				<q-td :props="slotProps">
					<IconButton
						icon="vertical-dots"
						width="4"
						height="16"
						class="fs-14 s-28 q-mr--4 opacity-30 hover:opacity-100"
						@click.stop=""
					>
						<PoolContextMenu
							:no-parent-event="false"
							:touch-position="false"
							@swap="onSwapClick(slotProps.row.pool)"
							@liquidity="currentGammPool = slotProps.row.pool"
						/>
					</IconButton>
				</q-td>
			</template>
		</LightTable>
		<LiquidityModal
			@hide="currentGammPool = undefined"
			v-model="showGammPoolModal"
			:pool="currentGammPool"
			v-if="currentGammPool"
		/>
	</template>

	<p class="q-mb-21 fs-21 text-weight-medium">Tokens</p>
	<div>
		<LightTable
			:pagination="pagination"
			:columns="columnsWrapper"
			:rows="bankStore.balances"
		>
			<template v-slot:body="rowProps">
				<q-tr :props="rowProps">
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
							{{ rowProps.row.symbol }}
						</p>
					</q-td>
					<q-td>
						<p class="text-white text-center">
							{{ balancedCurrency(rowProps.row.price) }} $
						</p>
					</q-td>
					<q-td v-if="haveMultiChainBalances">
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
					:props="rowProps"
					no-hover
					v-show="rowProps.expand"
				>
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
			v-if="transferFrom && openTransferDialog"
		/>
	</div>
</template>
