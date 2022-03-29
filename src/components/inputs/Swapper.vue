<script setup lang="ts">
import { balancedCurrency, smallNumber } from "@/common/numbers"
import { UserCoinInfo } from "@/types/user"
import { computed, ref } from "vue"
import CardDark from "../cards/CardDark.vue"
import SmallButton from "../buttons/SmallButton.vue"
import CoinSelect from "./CoinSelect.vue"
import InlineButton from "../buttons/InlineButton.vue"
import { resolveIcon } from "@/common/resolvers"
import LargeButton from "../buttons/LargeButton.vue"
import InformativeTooltip from "../tooltips/InformativeTooltip.vue"
const props = defineProps<{
	coin1: UserCoinInfo | null
	coin2: UserCoinInfo | null
}>()
const emit = defineEmits<{
	(e: "update:coin1", value: UserCoinInfo | null): void
	(e: "update:coin2", value: UserCoinInfo | null): void
}>()
const coin1Wrapper = computed({
	get(): UserCoinInfo | null {
		return props.coin1
	},
	set(value: UserCoinInfo | null) {
		emit("update:coin1", value)
	},
})
const coin2Wrapper = computed({
	get(): UserCoinInfo | null {
		return props.coin2
	},
	set(value: UserCoinInfo | null) {
		emit("update:coin2", value)
	},
})
const slippage = -0.21

const swapRatio = computed<number>(() => {
	if (coin1Wrapper.value && coin2Wrapper.value)
		return coin1Wrapper.value.coin.price / coin2Wrapper.value.coin.price
	return 0
})

const swapAmountNumber = computed<number>(() => {
	return parseInt(swapAmountWrapper.value)
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

const toAmount = computed({
	get():string {
		return balancedCurrency(parseFloat(swapAmount.value) * swapAmountNumber.value)
	},
	set(value:string):void {

	},
})

const invert = () => {
	const tmp = coin1Wrapper
	coin1Wrapper.value = coin2Wrapper.value
	coin2Wrapper.value = tmp.value
}

const show = ref(false)
const slippageExpanded = ref(false)
const maxSlippage = ref(1)
const customSelected = ref(false)
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
						class="fs-24 q-mb-0 text-white"
					/>
					<p v-if="coin1" class="fs-12 text-dark">
						{{ balancedCurrency(swapAmountNumber * coin1.coin.price) }} $
					</p>
				</div>
				<div>
					<SmallButton label="MAX"></SmallButton>
				</div>
			</div>
			<div class="vertical-separator q-mx-28"></div>
			<div class="flex-1">
				<CoinSelect v-model="coin1" class="q-mx--30"></CoinSelect>
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
					<q-input
						borderless
						v-model="toAmount"
						class="fs-24 q-mb-0 text-white"
						v-if="coin1 && coin2"
					/>
				</div>
			</div>
			<div class="vertical-separator q-mx-28"></div>
			<div class="flex-1">
				<CoinSelect v-model="coin2" class="q-mx--30"></CoinSelect>
			</div>
		</div>
	</CardDark>
	<div
		class="q-py-15 q-px-30 bg-white-5 rounded-25 fs-14 q-mb-57"
	>
		<div
			class="cursor-pointer flex justify-between items-center"
			@click="slippageExpanded=!slippageExpanded"
		>
			<p>Estimated slippage</p>
			<div class="flex">
				<p :class="'q-mr-14' + (slippage > maxSlippage ? ' text-negative' : '')">{{ smallNumber(slippage) }} %</p>
				<q-icon :name="resolveIcon('dropdown', 11, 7)" :class="slippageExpanded ? 'rotate-180' : ''"></q-icon>
			</div>
		</div>
		<div
			v-if="slippageExpanded"
			class="flex justify-between items-center q-mt-20"
		>
			<div class="flex items-center text-dark">
				<p class="fs-13 font-weight-medium q-mr-9">Slippage Tolerance</p>
				<q-icon
					size="12px"
					:name="resolveIcon('info', 15, 15)"
				>
					<InformativeTooltip
						anchor="center right"
						self="center left"
					>
						Your transaction will revert if the price changes unfavorably by more than this percentage.
					</InformativeTooltip>
				</q-icon>
			</div>
			<div class="flex">
				<div
					v-for="i in 3"
					@click="maxSlippage = i; customSelected = false"
					:class="'rounded-30 border-dark q-px-18 q-py-6 q-mr-6 cursor-pointer' + ((maxSlippage == i && !customSelected) ? ' bg-dark' : '')"
				>
					{{i}} %
				</div>
				<div
					@click="customSelected = true"
					:class="'flex rounded-30 border-dark q-px-18 q-py-6 q-mr-6 cursor-pointer ' + (customSelected ? 'bg-dark' : 'bg-primary-darker opacity-50')"
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
							dense />
						<p>%</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="flex items-center q-col-gutter-x-xl">
		<div class="flex-1 flex justify-between" v-if="coin1Wrapper && coin2Wrapper">
			<p class="fs-16">Rates</p>
			<div class="fs-12">
				<p class="q-mb-6">
					<span class="opacity-40">{{ coin1Wrapper.coin.symbol }} =</span>
					{{ smallNumber(swapRatio) }}
					<span class="opacity-40">{{ coin2Wrapper.coin.symbol }}</span>
				</p>
				<p>
					<span class="opacity-40">{{ coin2Wrapper.coin.symbol }} =</span>
					{{ smallNumber(1 / swapRatio) }}
					<span class="opacity-40">{{ coin1Wrapper.coin.symbol }}</span>
				</p>
			</div>
		</div>
		<div class="flex-1">
			<LargeButton>Swap Tokens</LargeButton>
		</div>
	</div>
</template>
