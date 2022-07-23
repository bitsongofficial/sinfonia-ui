<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue"
import { balancedCurrency, smallNumber } from "@/common/numbers"
import { TableColumn } from "@/types/table"
import { formatDistanceToNow } from "date-fns"
import { TokenBalance, Transaction } from "@/types"
import { useRoute, useRouter } from "vue-router"
import { externalWebsites } from "@/configs/config"
import { resolveIcon } from "@/common/resolvers"
import { disabledTransactions } from "@/configs/routes"
import Card from "@/components/cards/Card.vue"
import Title from "@/components/typography/Title.vue"
import CryptoTable from "@/components/CryptoTable.vue"
import Swapper from "@/components/inputs/Swapper.vue"
import LightTable from "@/components/LightTable.vue"
import useConfig from "@/store/config"
import useAuth from "@/store/auth"
import useTransactionManager from "@/store/transaction-manager"
import ImagePair from "../ImagePair.vue"

const configStore = useConfig()
const transactionManagerStore = useTransactionManager()
const authStore = useAuth()
const router = useRouter()
const route = useRoute()

const props = withDefaults(
	defineProps<{
		from: string
		to: string
	}>(),
	{
		from: "BTSG",
		to: "CLAY",
	}
)

let coin1 = ref<TokenBalance | null>(null)
let coin2 = ref<TokenBalance | null>(null)

const columns: TableColumn[] = [
	{
		name: "token",
		align: "left",
		label: "",
		field: "name",
		sortable: false,
	},
	{
		name: "symbol",
		align: "left",
		label: "",
		field: "symbol",
		sortable: false,
		format: (val: any) => `${val}`,
	},
	{
		name: "price",
		label: "",
		field: "price",
		sortable: false,
		format: (val: any) => `${balancedCurrency(val)} $`,
	},
]

const pagination = {
	rowsPerPage: -1,
	sortBy: "price",
	descending: true,
}

const transactionColumns: TableColumn[] = [
	{
		name: "token",
		align: "left",
		label: "",
		field: "",
		sortable: false,
	},
	{
		name: "transaction",
		align: "left",
		label: "",
		field: "",
		sortable: false,
	},
	{
		name: "status",
		align: "center",
		label: "",
		field: "",
		sortable: false,
	},
]

const boxesStyle = ref({ height: "0" })
const heightRef = ref<{ element: HTMLElement } | null>(null)

const setSize = () => {
	if (heightRef.value && heightRef.value.element) {
		boxesStyle.value.height =
			(heightRef.value.element.clientHeight - 122) / 2 + "px"
	}
}

onMounted(() => {
	window.addEventListener("resize", setSize)
	setSize()
})

onUnmounted(() => {
	window.removeEventListener("resize", setSize)
})

const swapperTokenChange = () => {
	let from = props.from
	let to = props.to

	if (coin1.value) {
		from = coin1.value.symbol
	}

	if (coin2.value) {
		to = coin2.value.symbol
	}

	router.replace({ ...route, query: { from, to } })
}

const onTxClick = (tx: Transaction) => {
	if (tx.fromSwap && tx.tx) {
		window.open(
			`${externalWebsites.mintscan}${tx.from.coinGeckoId}/txs/${tx.tx.transactionHash}`,
			"_blank"
		)
	}
}

const onRowClick = (index: number, row: TokenBalance) => {
	const coinLookup = row.coinLookup.find((coin) => coin.viewDenom === row.symbol)

	if (coinLookup) {
		router.push(`/fantokens/${coinLookup.fantokenDenom}`)
	}
}
</script>
<template>
	<div class="text-weight-medium">
		<div class="grid grid-cols-8">
			<div class="col-span-12 col-span-md-4 col-start-md-2">
				<div class="max-w-600 q-ml-auto q-mr-auto q-mr-md-none">
					<Title class="q-mb-24">Swap Tokens</Title>
					<div class="flex row no-wrap items-start q-mb-24">
						<q-icon :name="resolveIcon('info', 15, 15)" size="15px" color="primary" />
						<p
							class="fs-14 !leading-18 q-ml-20 q-mt-none opacity-50 text-white text-weight-regular"
						>
							Remember to move your funds from the BitSong chain to the Osmosis chain
							to have them available on Sinfonia.
						</p>
					</div>
					<Card
						ref="heightRef"
						:padding="0"
						class="q-px-12 q-pt-32 q-pb-20 q-pa-sm-20 q-pa-md-36"
						transparency="5"
					>
						<Swapper
							:default-from="from"
							:default-to="to"
							v-model:coin1="coin1"
							v-model:coin2="coin2"
							@update:coin1="swapperTokenChange"
							@update:coin2="swapperTokenChange"
						/>
					</Card>
				</div>
			</div>
			<!-- <div class="col-8 col-lg-4 col-xl-3">
				<div class="max-w-582 q-mx-auto">
					<div class="flex justify-between items-center q-mb-30">
						<p class="fs-18">FanTokens</p>
						<q-btn
							outline
							rounded
							to="/fantokens"
							color="white"
							label="View all"
							class="q-px-22 text-secondry-390 btn-outline-minimal light:before:border-2 light:hover:helper-white text-capitalize"
						/>
					</div>
					<Card
						class="q-py-10 q-px-none q-mb-51 overflow-hidden"
						:padding="0"
						:transparency="5"
						:style="boxesStyle"
					>
						<CryptoTable
							:rows="configStore.fantokens"
							:columns="columns"
							:pagination="pagination"
							no-background
							hide-header
							class="small-rows full-height"
							@row-click="onRowClick"
						>
						</CryptoTable>
					</Card>
					<div class="flex justify-between items-center q-mb-30 overflow-hidden">
						<p class="fs-18">Transactions</p>
						<q-btn
							v-if="authStore.osmosisAddress"
							outline
							rounded
							color="white"
							:href="`${externalWebsites.mintscan}osmosis/account/${authStore.osmosisAddress}`"
							target="_blank"
							label="View all"
							:disable="disabledTransactions"
							class="q-px-22 text-secondry-390 btn-outline-minimal light:before:border-2 light:hover:helper-white text-capitalize"
						/>
					</div>
					<Card
						class="q-py-10 q-px-none overflow-auto items-center"
						:padding="0"
						:transparency="5"
						:style="boxesStyle"
					>
						<LightTable
							:rows="transactionManagerStore.swapTransactions"
							:columns="transactionColumns"
							no-background
							hide-header
							no-data-label="No transactions yet."
							class="full-height"
							@row-click="
								(_, row) => {
									if (!disabledTransactions) {
										onTxClick(row)
									}
								}
							"
						>
							<template v-slot:body-cell-token="slotProps">
								<q-td :props="slotProps">
									<div class="flex no-wrap items-center">
										<ImagePair
											v-if="slotProps.row.fromSwap && slotProps.row.toSwap"
											:tokens="[slotProps.row.fromSwap, slotProps.row.toSwap]"
											:size="24"
											:smaller-size="20"
											:offset="[-8, -1]"
										/>
									</div>
								</q-td>
							</template>
							<template v-slot:body-cell-transaction="slotProps">
								<q-td :props="slotProps" class="white-space-pre-line">
									<p class="fs-12 !leading-18 text-gray row wrap">
										You swapped
										<span
											class="text-white font-weight-500 q-mx-4"
											v-if="slotProps.row.fromSwap"
										>
											{{ balancedCurrency(slotProps.row.fromAmount) }}
											{{ slotProps.row.fromSwap.symbol }}
										</span>
										in
										<span
											class="text-white font-weight-500 q-mx-4"
											v-if="slotProps.row.toSwap"
										>
											{{ balancedCurrency(slotProps.row.toAmount) }}
											{{ slotProps.row.toSwap.symbol }}
										</span>
									</p>
								</q-td>
							</template>
							<template v-slot:body-cell-status="slotProps">
								<q-td :props="slotProps">
									<div class="flex justify-end">
										<p
											v-if="slotProps.row.status != 'success'"
											:class="
												'rounded-20 q-py-6 q-px-8 text-white light:text- text-capitalize fs-9 !leading-11 ' +
												(slotProps.row.status == 'pending' ? 'bg-dark' : 'bg-primary')
											"
										>
											{{ slotProps.row.status }}
										</p>
										<p v-else class="fs-9 !leading-11 text-gray">
											{{ formatDistanceToNow(new Date(slotProps.row.time)) }}
										</p>
									</div>
								</q-td>
							</template>
						</LightTable>
					</Card>
				</div>
			</div> -->
		</div>
	</div>
</template>
