<script setup lang="ts">
import Card from "../cards/Card.vue"
import Title from "../typography/Title.vue"
import { newCoin, newUser, newUserCoin } from "@/common/mockups"
import { onMounted, onUnmounted, ref, computed } from "vue"
import { balancedCurrency, smallNumber } from "@/common/numbers"
import CryptoTable from "../CryptoTable.vue"
import { TableColumn } from "@/types/table"
import Swapper from "../inputs/Swapper.vue"
import LightTable from "../LightTable.vue"
import ImagePair from "../ImagePair.vue"
import { formatDistanceToNow } from "date-fns"
import useConfig from "@/store/config"

const configStore = useConfig()

let coin1 = ref(newUserCoin("BTSG", "Bitsong"))
let coin2 = ref(newUserCoin("CLAY", "Adam"))

const transactions = [
	{
		coin1: newCoin("CLAY", "Adam Clay"),
		coin2: newCoin("VBRN", "Vibranium"),
		amount: 2355,
		rate: 2 / 18,
		status: "pending",
	},
	{
		coin1: newCoin("VBRN", "Vibranium"),
		coin2: newCoin("CLAY", "Adam Clay"),
		amount: 20,
		rate: 9,
		status: "failed",
	},
	{
		coin1: newCoin("FNTY", "Fonti"),
		coin2: newCoin("MCX", "Mace"),
		amount: 2355,
		rate: 3 / 18,
		status: "completed",
		time: 1647974156,
	},
]

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
		format: (val: any) => `$${val}`,
	},
	{
		name: "price",
		label: "",
		field: "price",
		sortable: false,
		format: (val: any) => `${smallNumber(val)} $`,
	},
]
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

const swapAmount = ref("0")

const swapAmountWrapper = computed<string>({
	get() {
		return swapAmount.value
	},
	set(value) {
		swapAmount.value = value != "" && parseInt(value) > 0 ? value : "0"
	},
})

const swapRatio = computed<number>(() => {
	return coin1.value.coin.price / coin2.value.coin.price
})

const swapAmountNumber = computed<number>(() => {
	return parseInt(swapAmountWrapper.value)
})

const invert = () => {
	const tmp = coin1.value
	coin1.value = coin2.value
	coin2.value = tmp
}

const dex = [
	newCoin("CLAY", "Adam Clay"),
	newCoin("FNTY", "Fonti"),
	newCoin("VBRN", "Vibranium"),
	newCoin("MCX", "Mace"),
]

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
</script>
<template>
	<div class="text-weight-medium">
		<div class="row q-col-gutter-x-xl">
			<div
				class="col-8 col-lg-4 col-xl-5 q-mb-40 q-mb-md-none flex justify-center"
			>
				<div class="max-w-582">
					<Title class="q-mb-36">Swap Tokens</Title>
					<Card ref="heightRef" class="q-pa-36" transparency="5">
						<Swapper v-model:coin1="coin1" v-model:coin2="coin2"></Swapper>
					</Card>
				</div>
			</div>
			<div class="col-8 col-lg-4 col-xl-3">
				<div class="max-w-582 q-mx-auto">
					<div class="flex justify-between items-center q-mb-30">
						<p class="fs-18">DEX</p>
						<q-btn outline rounded color="white" label="View all" class="q-px-22" />
					</div>
					<Card
						class="q-py-10 q-px-none q-mb-51 scroll-container"
						:padding="0"
						:transparency="5"
						:style="boxesStyle"
					>
						<CryptoTable
							:rows="configStore.fantokens"
							:columns="columns"
							no-background
							hide-header
							class="small-rows full-height"
						>
						</CryptoTable>
					</Card>
					<div class="flex justify-between items-center q-mb-30">
						<p class="fs-18">Transactions</p>
						<q-btn outline rounded color="white" label="View all" class="q-px-22" />
					</div>
					<Card
						class="q-py-10 q-px-none overflow-auto items-center"
						:padding="0"
						:transparency="5"
						:style="boxesStyle"
					>
						<LightTable
							:rows="transactions"
							:columns="transactionColumns"
							no-background
							hide-header
							class="full-height"
						>
							<template v-slot:body-cell-token="slotProps">
								<q-td :props="slotProps">
									<div class="flex no-wrap items-center">
										<ImagePair
											:image1="slotProps.row.coin1.iconUrl"
											:image2="slotProps.row.coin2.iconUrl"
											:size="24"
											:smaller-size="20"
											:offset="[-8, -1]"
										>
										</ImagePair>
									</div>
								</q-td>
							</template>
							<template v-slot:body-cell-transaction="slotProps">
								<q-td :props="slotProps">
									<p class="fs-12 text-gray">
										You swapped
										<span class="text-white font-weight-500 q-mx-4"
											>{{ balancedCurrency(slotProps.row.amount) }}
											{{ slotProps.row.coin1.symbol }}</span
										>
										in
										<span class="text-white font-weight-500 q-mx-4"
											>{{ balancedCurrency(slotProps.row.amount * slotProps.row.rate) }}
											{{ slotProps.row.coin2.symbol }}</span
										>
									</p>
								</q-td>
							</template>
							<template v-slot:body-cell-status="slotProps">
								<q-td :props="slotProps">
									<div class="flex justify-end">
										<p
											v-if="slotProps.row.status != 'completed'"
											:class="
												'rounded-20 q-py-9 q-px-8 text-white text-capitalize fs-9 ' +
												(slotProps.row.status == 'pending' ? 'bg-dark' : 'bg-primary')
											"
										>
											{{ slotProps.row.status }}
										</p>
										<p v-else class="fs-9 text-gray">
											{{ formatDistanceToNow(new Date(slotProps.row.time * 1000)) }}
										</p>
									</div>
								</q-td>
							</template>
						</LightTable>
					</Card>
				</div>
			</div>
		</div>
	</div>
</template>
