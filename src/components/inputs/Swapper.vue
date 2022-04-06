<script setup lang="ts">
import {
	balancedCurrency,
	smallNumberRate,
	gtnZero,
	isNaN,
	compareBalance,
} from "@/common/numbers"
import { computed, ref, watch, onUnmounted, onMounted } from "vue"
import {
	calculateRouteSpotPrice,
	estimateHopSwapExactAmountIn,
	amountIBCFromCoin,
	percentageRange,
	calculateSlippageTokenIn,
} from "@/common"
import { resolveIcon } from "@/common/resolvers"
import { TokenBalance } from "@/types"
import CardDark from "@/components/cards/CardDark.vue"
import SmallButton from "@/components/buttons/SmallButton.vue"
import CoinSelect from "@/components/inputs/CoinSelect.vue"
import InlineButton from "@/components/buttons/InlineButton.vue"
import LargeButton from "@/components/buttons/LargeButton.vue"
import InformativeTooltip from "@/components/tooltips/InformativeTooltip.vue"
import useBank from "@/store/bank"
import usePools from "@/store/pools"
import BigNumber from "bignumber.js"
import Decimal from "decimal.js"
import useConfig from "@/store/config"
import useTransactionManager from "@/store/transaction-manager"
import useAuth from "@/store/auth"
import { validateRules } from "@/common/inputs"
import SwapperField from "./SwapperField.vue"

const bankStore = useBank()
const poolsStore = usePools()
const configStore = useConfig()
const authStore = useAuth()
const transactionManagerStore = useTransactionManager()

const props = defineProps<{
	defaultFrom: string
	defaultTo: string
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

const setDefaultValues = (newBalances: TokenBalance[]) => {
	const balances = [...newBalances]
	const fromCoinTemp =
		balances.find((balance) => balance.symbol === props.defaultFrom) ?? null

	const toCoinTemp =
		balances.find((balance) => balance.symbol === props.defaultTo) ?? null

	if (toCoinTemp && fromCoinTemp) {
		const swappableBalances = bankStore.swappableBalancesByRouteDenom(toCoinTemp)
		const allowedFrom = swappableBalances.find(
			(balance) => balance.symbol === fromCoinTemp.symbol
		)

		if (allowedFrom) {
			fromCoin.value = allowedFrom !== undefined ? allowedFrom : null
		} else {
			fromCoin.value = balances.shift() ?? null
		}
	}

	if (!fromCoinTemp) {
		fromCoin.value = balances.shift() ?? null
	}

	if (toCoinTemp && fromCoinTemp) {
		const swappableBalances =
			bankStore.swappableBalancesByRouteDenom(fromCoinTemp)
		const allowedTo = swappableBalances.find(
			(balance) => balance.symbol === toCoinTemp.symbol
		)

		if (allowedTo) {
			toCoin.value = allowedTo !== undefined ? allowedTo : null
		} else {
			toCoin.value = balances.pop() ?? null
		}
	}

	if (!toCoinTemp) {
		toCoin.value = balances.pop() ?? null
	}
}

const balancesWatcher = watch(
	() => bankStore.allSwappableBalances,
	(balances, oldBalances) => {
		if (balances.length > oldBalances.length) {
			setDefaultValues(balances)
		}
	}
)

const fromSwappableBalances = computed(() => {
	if (toCoin.value) {
		return bankStore.swappableBalancesByRouteDenom(toCoin.value)
	}

	return []
})

const toSwappableBalances = computed(() => {
	if (fromCoin.value) {
		return bankStore.swappableBalancesByRouteDenom(fromCoin.value)
	}

	return []
})

onMounted(() => {
	setDefaultValues(bankStore.allSwappableBalances)
})

onUnmounted(() => {
	balancesWatcher()
})

const field1 = ref()
const field2 = ref()

const swapRatio = computed<number>(() => {
	if (fromCoin.value) {
		return calculateRouteSpotPrice(fromCoin.value, swapRoutes.value)
	}

	return 0
})

const swapAmount = ref("0")
const toAmount = ref("0")

const rule1 = [
							(val) => !!val || 'Required field',
							(val) => !isNaN(val) || 'Amount must be a decimal value',
							(val) => gtnZero(val) || 'Amount must be a greater then zero',
							(val) =>
								compareBalance(val, available.value) || 'You don\'t have enough coins',
						]

const swapAmountWrapper = computed<string>({
	get() {
		return swapAmount.value
	},
	set(value) {
		const amount = new BigNumber(value)

		if (value.length > 0) {
			if (!amount.isNaN()) {
				swapAmount.value = value
				toAmount.value = amount.div(swapRatio.value).toFixed(6)
			}
		} else {
			swapAmount.value = ""
		}
		field2.value.validate(toAmount.value)
	},
})

const rule2 = [
							(val) => !!val || 'Required field',
							(val) => !isNaN(val) || 'Amount must be a decimal value',
							(val) => gtnZero(val) || 'Amount must be a greater then zero',
						]

const toAmountWrapper = computed<string>({
	get() {
		return toAmount.value
	},
	set(value) {
		const amount = new BigNumber(value)

		if (value.length > 0) {
			if (!amount.isNaN()) {
				toAmount.value = value
				swapAmount.value = amount.div(1 / swapRatio.value).toFixed(6)
			}
		} else {
			toAmount.value = ""
		}

		field1.value.validate(swapAmount.value)
	},
})

const swapAmountFiat = computed<string>(() => {
	if (swapAmountWrapper.value.length > 0 ) {
		return new Decimal(swapAmountWrapper.value)
			.mul(fromCoin.value?.price ?? "0")
			.toString()
	}

	return "0"
})

const swapCoin = computed(() => {
	if (fromCoin.value && swapAmountWrapper.value.length > 0 ) {
		return amountIBCFromCoin(swapAmountWrapper.value, fromCoin.value)
	}

	return undefined
})

const estimatedHopSwap = computed(() => {
	if (fromCoin.value && swapCoin.value) {
		return estimateHopSwapExactAmountIn(
			swapCoin.value,
			fromCoin.value,
			swapRoutes.value
		)
	}
})

const slippage = computed(() => {
	if (estimatedHopSwap.value) {
		const { slippage } = estimatedHopSwap.value

		return slippage.mul(100).toString()
	}

	return "0"
})

const invert = () => {
	const tmp = fromCoin
	fromCoin.value = toCoin.value
	toCoin.value = tmp.value
}

const show = ref(false)
const slippageExpanded = ref(false)
const maxSlippage = ref("1")
const maxSlippageOption = ["1", "3", "5"]
const customSelected = ref(false)

const setSlippage = (index: string) => {
	maxSlippage.value = index
	customSelected.value = false
}

const invalidSlippage = computed(() => {
	return new BigNumber(slippage.value).gt(maxSlippage.value)
})

const swapRoutes = computed(() => {
	if (fromCoin.value && toCoin.value) {
		return poolsStore.routesPoolByDenom(fromCoin.value, toCoin.value)
	}

	return []
})

const available = computed(() => {
	const osmosisToken = configStore.osmosisToken

	if (osmosisToken && props.coin1 && props.coin1.chains) {
		const chain = props.coin1.chains.find(
			(el) => el.symbol === osmosisToken.symbol
		)

		if (chain) {
			return chain.available ? new BigNumber(chain.available).toFixed(2) : "0"
		}
	}

	return "0"
})

const setMaxAmount = () => {
	swapAmountWrapper.value = available.value
}

const onSubmit = () => {
	if (
		swapCoin.value &&
		estimatedHopSwap.value &&
		fromCoin.value &&
		toCoin.value
	) {
		let tokenOutMinAmount = "1"
		const maxSlippageDec = new Decimal(maxSlippage.value).div(100)

		if (maxSlippageDec.gt("0")) {
			tokenOutMinAmount = calculateSlippageTokenIn(
				estimatedHopSwap.value.spotPriceBefore,
				swapCoin.value.amount,
				maxSlippageDec
			).toFixed(0)
		}

		transactionManagerStore.swapExactAmountIn(
			swapRoutes.value,
			swapCoin.value,
			tokenOutMinAmount,
			fromCoin.value,
			swapAmount.value,
			toCoin.value,
			toAmount.value
		)
	} 
}
</script>

<template>
	<p class="fs-14 q-mb-20 opacity-30">Swap from</p>
	<SwapperField
		:coin="fromCoin"
		v-model="swapAmountWrapper"
		show-max
		:swap-amount-fiat="swapAmountFiat"
		:options="fromSwappableBalances"
		:rules="rule1"
		@max-click="setMaxAmount"
		ref="field1">
	</SwapperField>
	<div class="flex justify-between q-mt-20 q-mb-16 items-center">
		<p class="fs-14 opacity-30">Swap to</p>
		<InlineButton @click="invert">
			<p class="fs-12 q-mr-12">Invert tokens</p>
			<span class="fs-10 text-primary">
				<q-icon :name="resolveIcon('swap', 21, 16)" />
			</span>
		</InlineButton>
	</div>
	<SwapperField
		:coin="toCoin"
		v-model="toAmountWrapper"
		:options="toSwappableBalances"
		:rules="rule2"
		ref="field2"
		class="q-mb-24">
	</SwapperField>
	<div
		class="q-py-15 q-px-30 bg-white-5 light:bg-gray-light rounded-25 fs-14 q-mb-57"
	>
		<div
			class="cursor-pointer flex justify-between items-center"
			@click="slippageExpanded = !slippageExpanded"
		>
			<p>Estimated slippage</p>
			<div class="flex">
				<p :class="'q-mr-14' + (invalidSlippage ? ' text-primary' : '')">
					{{ percentageRange(slippage) }} %
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
			<div class="flex items-center text-dark q-mb-xs-14">
				<p class="fs-13 text-weight-medium q-mr-9 light:text-primary-complementary">
					Slippage Tolerance
				</p>
				<q-icon
					size="12px"
					:name="resolveIcon('info', 15, 15)"
					class="light:text-primary-complementary"
				>
					<InformativeTooltip anchor="center right" self="center left">
						Your transaction will revert if the price changes unfavorably by more than
						this percentage.
					</InformativeTooltip>
				</q-icon>
			</div>
			<div class="flex">
				<div
					v-for="i in maxSlippageOption"
					@click="setSlippage(i)"
					:class="
						'rounded-30 border-dark light:border-primary-complementary light:text-primary-complementary q-px-18 q-py-6 q-mr-6 cursor-pointer' +
						(maxSlippage == i && !customSelected
							? ' bg-dark light:bg-gradient light:border-none light:text-white'
							: '')
					"
					:key="i"
				>
					{{ i }} %
				</div>
				<div
					@click="customSelected = true"
					:class="
						'flex rounded-30 border-dark light:border-primary-complementary light:text-white q-px-18 q-py-6 q-mr-6 cursor-pointer ' +
						(customSelected
							? 'bg-dark light:bg-gradient light:border-none'
							: 'bg-primary-darker light:bg-primary-complementary opacity-50')
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
			<p class="fs-16 q-mb-xs-14">Rates</p>
			<div class="fs-12">
				<p class="q-mb-6">
					<span class="opacity-40">{{ fromCoin.symbol }} =</span>
					{{ smallNumberRate(1 / swapRatio) }}
					<span class="opacity-40">{{ toCoin.symbol }}</span>
				</p>
				<p>
					<span class="opacity-40">{{ toCoin.symbol }} =</span>
					{{ smallNumberRate(swapRatio) }}
					<span class="opacity-40">{{ fromCoin.symbol }}</span>
				</p>
			</div>
		</div>
		<div class="flex-1">
			<LargeButton @click="onSubmit" :disable="!authStore.session"
				>Swap Tokens</LargeButton
			>
		</div>
	</div>
</template>
