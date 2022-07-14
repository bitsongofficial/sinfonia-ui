<script setup lang="ts">
import { smallNumberRate } from "@/common/numbers"
import { computed, ref, watch, onUnmounted, onMounted } from "vue"
import {
	calculateRouteSpotPrice,
	estimateHopSwapExactAmountIn,
	amountIBCFromCoin,
	percentageRange,
	calculateSlippageTokenIn,
	gtnZero,
	toDynamicDp,
	toViewDenom,
} from "@/common"
import { resolveIcon } from "@/common/resolvers"
import { TokenBalance } from "@/types"
import { useForm } from "vee-validate"
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
import SwapperField from "@/components/inputs/SwapperField.vue"
import { coin } from "@cosmjs/proto-signing"

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

const available = computed(() => {
	const osmosisToken = configStore.osmosisToken

	if (osmosisToken && fromCoin.value && fromCoin.value.chains) {
		const chain = fromCoin.value.chains.find(
			(el) => el.symbol === osmosisToken.symbol
		)

		if (chain) {
			return toDynamicDp(
				chain.available ? new BigNumber(chain.available).toString() : "0"
			)
		}
	}

	return "0"
})

const validationSchema = computed(() => ({
	fromAmount: {
		required: true,
		isNaN: true,
		gtnZero: true,
		compareBalance: { compare: available.value },
	},
	toAmount: {
		isNaN: true,
		gtnZero: true,
	},
}))

const initialValues = {
	fromAmount: "",
	toAmount: "",
}

const { handleSubmit, setFieldValue, values, meta } = useForm({
	initialValues,
	validationSchema,
})

const updateFromAmount = (swap = false) => {
	const fromAmount = new BigNumber(swap ? values.toAmount : values.fromAmount)

	if (values.fromAmount.length > 0) {
		if (!fromAmount.isNaN()) {
			setFieldValue("toAmount", toDynamicDp(tokenOutSwap.value))
		}
	}
}

const updateToAmount = (swap = false) => {
	const toAmount = new BigNumber(swap ? values.fromAmount : values.toAmount)

	if (values.toAmount.length > 0) {
		if (!toAmount.isNaN()) {
			setFieldValue("fromAmount", toDynamicDp(tokenInSwap.value))
		}
	}
}

const toCoin = computed<TokenBalance | null>({
	get() {
		return props.coin2
	},
	set(value) {
		emit("update:coin2", value)
	},
})

const coinsWatcher = watch(
	() => [fromCoin.value, toCoin.value],
	([oldFrom, oldTo], [newFrom, newTo]) => {
		const fromChanged =
			oldFrom !== null && newFrom !== null && oldFrom.symbol !== newFrom.symbol
		const toChanged =
			oldTo !== null && newTo !== null && oldTo.symbol !== newTo.symbol
		const swap = fromChanged && toChanged

		if (fromChanged) {
			updateToAmount(swap)
		}

		if (toChanged) {
			updateFromAmount(swap)
		}
	}
)

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
	} else if (fromCoinTemp) {
		fromCoin.value = fromCoinTemp
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
	} else if (toCoinTemp) {
		toCoin.value = toCoinTemp
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
	coinsWatcher()
	balancesWatcher()
})

const swapRatio = computed<number>(() => {
	if (fromCoin.value) {
		return calculateRouteSpotPrice(fromCoin.value, swapRoutes.value)
	}

	return 0
})

const swapAmountFiat = computed<string>(() => {
	try {
		if (values.fromAmount.length > 0) {
			return new Decimal(values.fromAmount)
				.mul(fromCoin.value?.price ?? "0")
				.toString()
		}
	} catch (error) {
		return "0"
	}

	return "0"
})

const swapCoin = computed(() => {
	try {
		if (fromCoin.value && values.fromAmount.length > 0) {
			return amountIBCFromCoin(values.fromAmount, fromCoin.value)
		}
	} catch (error) {
		return undefined
	}

	return undefined
})

const swapToCoin = computed(() => {
	try {
		if (toCoin.value && values.toAmount.length > 0) {
			return amountIBCFromCoin(values.toAmount, toCoin.value)
		}
	} catch (error) {
		console.error(error)
		return undefined
	}

	return coin(0, "")
})

const estimatedHopSwap = computed(() => {
	if (fromCoin.value && swapCoin.value && swapToCoin.value) {
		return estimateHopSwapExactAmountIn(
			swapCoin.value,
			swapToCoin.value,
			fromCoin.value,
			swapRoutes.value
		)
	}
})

const tokenOutSwap = computed(() => {
	const estimatedHopSwapOut = estimatedHopSwap.value
	const outCoin = toCoin.value

	if (estimatedHopSwapOut && outCoin) {
		const coinLookup = outCoin.coinLookup.find(
			(coin) => coin.viewDenom === outCoin.symbol
		)

		if (coinLookup) {
			return toViewDenom(
				estimatedHopSwapOut.tokenOutput.amount,
				coinLookup.chainToViewConversionFactor
			)
		}
	}

	return "0"
})

const tokenInSwap = computed(() => {
	const estimatedHopSwapOut = estimatedHopSwap.value
	const outCoin = fromCoin.value

	if (estimatedHopSwapOut && outCoin) {
		const coinLookup = outCoin.coinLookup.find(
			(coin) => coin.viewDenom === outCoin.symbol
		)

		if (coinLookup) {
			return toViewDenom(
				estimatedHopSwapOut.tokenInput.amount,
				coinLookup.chainToViewConversionFactor
			)
		}
	}

	return "0"
})

const fromAmountChange = (value: string) => {
	const amount = new BigNumber(value)

	if (value.length > 0) {
		if (!amount.isNaN()) {
			setFieldValue("toAmount", toDynamicDp(tokenOutSwap.value))
		}
	}
}

const toAmountChange = (value: string) => {
	const amount = new BigNumber(value)

	if (value.length > 0) {
		if (!amount.isNaN()) {
			setFieldValue("fromAmount", toDynamicDp(tokenInSwap.value))
		}
	}
}

const slippage = computed(() => {
	if (estimatedHopSwap.value) {
		const { slippage } = estimatedHopSwap.value

		return slippage.toString()
	}

	return "0"
})

const invert = () => {
	const tmp = fromCoin
	fromCoin.value = toCoin.value
	toCoin.value = tmp.value
}

const slippageExpanded = ref(false)
const maxSlippage = ref("1")
const maxSlippageOption = ["1", "3", "5"]
const customSelected = ref(false)

const setSlippage = (index: string) => {
	maxSlippage.value = index
	customSelected.value = false
}

const invalidSlippage = computed(() => {
	return new BigNumber(slippage.value).multipliedBy(100).gt("1")
})

const swapRoutes = computed(() => {
	if (fromCoin.value && toCoin.value) {
		return poolsStore.routesPoolByDenom(fromCoin.value, toCoin.value)
	}

	return []
})

const setMaxAmount = () => {
	setFieldValue("fromAmount", available.value, { force: true })
	fromAmountChange(available.value)
}

const onSubmit = handleSubmit(() => {
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
			)
				.truncated()
				.toString()
		}

		transactionManagerStore.swapExactAmountIn(
			swapRoutes.value,
			swapCoin.value,
			tokenOutMinAmount,
			fromCoin.value,
			values.fromAmount,
			toCoin.value,
			values.toAmount
		)
	}
})
</script>

<template>
	<div>
		<div class="flex justify-between items-center q-mb-20">
			<p class="fs-14 opacity-30">Swap from</p>
			<InlineButton @click="invert" class="lt-sm">
				<p class="fs-12 q-mr-12">Swap tokens</p>
				<span class="fs-10 text-primary">
					<q-icon :name="resolveIcon('swap', 21, 16)" />
				</span>
			</InlineButton>
		</div>
		<SwapperField
			name="fromAmount"
			v-model:coin="fromCoin"
			show-max
			:swap-amount-fiat="swapAmountFiat"
			:options="fromSwappableBalances"
			:disable-max="!gtnZero(available)"
			@max-click="setMaxAmount"
			@update:model-value="fromAmountChange"
		/>
		<div class="flex justify-between q-mt-20 q-mb-16 items-center">
			<p class="fs-14 opacity-30">Swap to</p>
			<InlineButton @click="invert" class="gt-xs">
				<p class="fs-12 q-mr-12">Swap tokens</p>
				<span class="fs-10 text-primary">
					<q-icon :name="resolveIcon('swap', 21, 16)" />
				</span>
			</InlineButton>
		</div>
		<SwapperField
			name="toAmount"
			v-model:coin="toCoin"
			class="q-mb-24"
			:options="toSwappableBalances"
			@update:model-value="toAmountChange"
		/>
		<div
			class="q-py-15 q-px-20 q-px-md-30 bg-white-5 light:bg-gray-light rounded-25 fs-14 q-mb-57 q-mb-xs-27"
		>
			<div
				class="cursor-pointer flex justify-between items-center"
				@click="slippageExpanded = !slippageExpanded"
			>
				<div class="flex items-center">
					<p class="q-mr-8">Estimated slippage</p>
					<q-icon
						size="12px"
						:name="resolveIcon('info', 15, 15)"
						class="cursor-pointer"
					>
						<InformativeTooltip anchor="center right" self="center left">
							Difference between trade's expect and the actual price. Swapping above 1%
							at your own risk.
						</InformativeTooltip>
					</q-icon>
				</div>
				<div class="flex">
					<p
						:class="'q-mr-14' + (invalidSlippage ? ' text-primary' : '')"
						v-if="values.fromAmount && values.toAmount"
					>
						{{ estimatedHopSwap ? percentageRange(slippage) : "inf" }} %
					</p>
					<p :class="'q-mr-14' + (invalidSlippage ? ' text-primary' : '')" v-else>
						0 %
					</p>
					<q-icon
						:name="resolveIcon('dropdown', 11, 7)"
						:class="slippageExpanded ? 'rotate-180' : ''"
					></q-icon>
				</div>
			</div>
			<div
				v-if="slippageExpanded"
				class="flex justify-between items-center q-mt-20 q-mt-xs-10"
			>
				<div class="flex items-center text-dark q-mb-xs-14 q-mr-12">
					<p
						class="fs-13 text-weight-medium q-mr-9 light:text-primary-complementary"
					>
						Slippage Tolerance
					</p>
					<q-icon
						size="12px"
						:name="resolveIcon('info', 15, 15)"
						class="light:text-primary-complementary gt-xs"
					>
						<InformativeTooltip anchor="center right" self="center left">
							slippage is the difference between a trade's expected and actual price
						</InformativeTooltip>
					</q-icon>
				</div>
				<div class="flex">
					<div
						v-for="i in maxSlippageOption"
						@click="setSlippage(i)"
						:class="
							'rounded-30 border-dark light:border-primary-complementary light:text-primary-complementary q-px-14 q-py-6 q-mr-6 cursor-pointer' +
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
							'flex rounded-30 border-dark light:border-primary-complementary light:text-white q-px-14 q-py-6 q-mr-6 cursor-pointer ' +
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
			<div class="flex-1 flex justify-between gt-xs" v-if="fromCoin && toCoin">
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
			<div class="flex flex-1 justify-end justify-center-xs">
				<LargeButton
					fit
					type="submit"
					@click="onSubmit"
					:disable="
						!authStore.session ||
						!meta.valid ||
						transactionManagerStore.loadingBroadcasting ||
						transactionManagerStore.loadingSign ||
						transactionManagerStore.pendingTransactions.length > 0
					"
					class="q-px-xs-70"
				>
					Swap Tokens
				</LargeButton>
			</div>
		</div>
	</div>
</template>
