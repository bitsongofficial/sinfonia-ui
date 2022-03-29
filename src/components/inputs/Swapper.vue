<script setup lang="ts">
import { balancedCurrency, smallNumberRate } from "@/common/numbers"
import { computed, ref } from "vue"
import { calculateRouteSpotPrice } from "@/common"
import { resolveIcon } from "@/common/resolvers"
import { TokenBalance } from "@/types"
import CardDark from "@/components/cards/CardDark.vue"
import SmallButton from "@/components/buttons/SmallButton.vue"
import CoinSelect from "@/components/inputs/CoinSelect.vue"
import InlineButton from "@/components/buttons/InlineButton.vue"
import LargeButton from "@/components/buttons/LargeButton.vue"
import useBank from "@/store/bank"
import usePools from "@/store/pools"
import BigNumber from "bignumber.js"

const bankStore = useBank()
const poolsStore = usePools()

const props = defineProps<{
	coin1: TokenBalance | null
	coin2: TokenBalance | null
}>()

const emit = defineEmits<{
	(e: "update:coin1", value: TokenBalance | null): void
	(e: "update:coin2", value: TokenBalance | null): void
}>()

const fromCoin = computed<TokenBalance | null>({
	get() {
		return props.coin1
	},
	set(value) {
		emit("update:coin1", value)
	},
})

const toCoin = computed<TokenBalance | null>({
	get() {
		return props.coin2
	},
	set(value) {
		emit("update:coin2", value)
	},
})

const slippage = -0.21

const swapRatio = computed<number>(() => {
	if (fromCoin.value) {
		return calculateRouteSpotPrice(fromCoin.value, swapRoutes.value)
	}

	return 0
})

const swapAmountFiat = computed<string>(() => {
	return new BigNumber(swapAmountWrapper.value)
		.multipliedBy(fromCoin.value?.price ?? "0")
		.toString()
})

const swapAmount = ref("0")

const swapAmountWrapper = computed<string>({
	get() {
		return swapAmount.value
	},
	set(value) {
		swapAmount.value = value != "" && parseInt(value) > 0 ? value : "0"
	},
})

const invert = () => {
	const tmp = fromCoin
	fromCoin.value = toCoin.value
	toCoin.value = tmp.value
}

const show = ref(false)
const slippageExpanded = ref(false)
const maxSlippage = ref(1)
const customSelected = ref(false)

const setSlippage = (index: number) => {
	maxSlippage.value = index
	customSelected.value = false
}

const swapRoutes = computed(() => {
	if (fromCoin.value && toCoin.value) {
		return poolsStore.routesPoolByDenom(fromCoin.value, toCoin.value)
	}

	return []
})

const onAmountChange = () => {
	if (fromCoin.value && toCoin.value) {
		console.log(
			new BigNumber(swapAmountWrapper.value).div(swapRatio.value).toString()
		)
	}
}
</script>

<template>
	<p class="fs-14 q-mb-20 opacity-30">Swap from</p>
	<CardDark>
		<div class="flex justify-between no-wrap">
			<div class="flex-1 flex justify-between items-center q-py-6 no-wrap">
				<div class="q-mr-24">
					<q-input
						borderless
						v-model="swapAmountWrapper"
						@update:model-value="onAmountChange"
						class="fs-24 q-mb-0 text-white"
					/>
					<p v-if="coin1" class="fs-12 text-dark">
						{{ balancedCurrency(swapAmountFiat) }} $
					</p>
				</div>
				<div>
					<SmallButton label="MAX"></SmallButton>
				</div>
			</div>
			<div class="vertical-separator q-mx-28"></div>
			<div class="flex-1">
				<CoinSelect
					v-model="coin1"
					:options="bankStore.allSwappableBalances"
					class="q-mx--30"
				></CoinSelect>
			</div>
		</div>
	</CardDark>
	<div class="flex justify-between q-my-20 items-center">
		<p class="fs-14 opacity-30">Swap to</p>
		<InlineButton @click="invert">
			<p class="fs-12 q-mr-12">Invert tokens</p>
			<span class="fs-10 text-primary">
				<q-icon :name="resolveIcon('swap', 21, 16)" />
			</span>
		</InlineButton>
	</div>
	<CardDark class="q-mb-24">
		<div class="flex justify-between no-wrap">
			<div class="flex-1 flex justify-between items-center q-py-6 no-wrap">
				<div class="q-mr-24">
					<p v-if="coin1 && coin2" class="fs-24">0</p>
				</div>
			</div>
			<div class="vertical-separator q-mx-28"></div>
			<div class="flex-1">
				<CoinSelect
					v-model="coin2"
					:options="bankStore.allSwappableBalances"
					class="q-mx--30"
				></CoinSelect>
			</div>
		</div>
	</CardDark>
	<div class="q-py-15 q-px-30 bg-white-5 rounded-25 fs-14 q-mb-57">
		<div
			class="cursor-pointer flex justify-between items-center"
			@click="slippageExpanded = !slippageExpanded"
		>
			<p>Estimated slippage</p>
			<div class="flex">
				<p :class="'q-mr-14' + (slippage > maxSlippage ? ' text-negative' : '')">
					{{ smallNumberRate(slippage) }} %
				</p>
				<q-icon
					:name="resolveIcon('dropdown', 11, 7)"
					:class="slippageExpanded ? 'rotate-180' : ''"
				></q-icon>
			</div>
		</div>
		<div
			v-if="slippageExpanded"
			class="flex justify-between items-center q-mt-20"
		>
			<div class="flex items-center text-dark">
				<p class="fs-13 font-weight-medium q-mr-9">Slippage Tolerance</p>
				<q-icon size="12px" :name="resolveIcon('info', 15, 15)"></q-icon>
			</div>
			<div class="flex">
				<div
					v-for="i in 3"
					@click="setSlippage(i)"
					:class="
						'rounded-30 border-dark q-px-18 q-py-6 q-mr-6 cursor-pointer' +
						(maxSlippage == i && !customSelected ? ' bg-dark' : '')
					"
				>
					{{ i }} %
				</div>
				<div
					@click="customSelected = true"
					:class="
						'flex rounded-30 border-dark q-px-18 q-py-6 q-mr-6 cursor-pointer ' +
						(customSelected ? 'bg-dark' : 'bg-primary-darker opacity-50')
					"
				>
					<div class="flex">
						<q-input
							class="min-size-input text-right q-mr-4"
							input-class="q-py-0"
							hide-bottom-space
							borderless
							v-show="customSelected"
							v-model="maxSlippage"
							size="1"
							dense
						/>
						<p>%</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="flex items-center q-col-gutter-x-xl">
		<div class="flex-1 flex justify-between" v-if="fromCoin && toCoin">
			<p class="fs-16">Rates</p>
			<div class="fs-12">
				<p class="q-mb-6">
					<span class="opacity-40">{{ fromCoin.symbol }} =</span>
					{{ smallNumberRate(swapRatio) }}
					<span class="opacity-40">{{ toCoin.symbol }}</span>
				</p>
				<p>
					<span class="opacity-40">{{ toCoin.symbol }} =</span>
					{{ smallNumberRate(1 / swapRatio) }}
					<span class="opacity-40">{{ fromCoin.symbol }}</span>
				</p>
			</div>
		</div>
		<div class="flex-1">
			<LargeButton>Swap Tokens</LargeButton>
		</div>
	</div>
</template>
