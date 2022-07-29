<script lang="ts" setup>
import { externalWebsites } from "@/configs/config"
import { balancedCurrency, toDecimalGammFixed, toViewDenom } from "@/common"
import { formatDistanceToNow } from "date-fns"
import { Transaction, TransactionType } from "@/types"
import { computed, toRef } from "vue"
import Spinner from "@/components/Spinner"

const props = defineProps<{
	transaction: Transaction
}>()

const transaction = toRef(props, "transaction")

const loading = computed(
	() =>
		transaction.value.status === "broadcasting" ||
		transaction.value.status === "pending"
)

const txLink = computed(() =>
	transaction.value.tx
		? `${externalWebsites.mintscan}${transaction.value.from.coinGeckoId}/txs/${transaction.value.tx.transactionHash}`
		: undefined
)

const fromAmountToViewDenom = computed(() => {
	if (transaction.value.transferToken) {
		const coinLookup = transaction.value.transferToken.coinLookup.find(
			(coin) => coin.viewDenom === transaction.value.transferToken?.symbol
		)

		if (coinLookup) {
			return toViewDenom(
				transaction.value.fromAmount ?? "0",
				coinLookup.chainToViewConversionFactor
			)
		}
	}

	return "0"
})

const loadingMessage = computed(() => {
	switch (transaction.value.type) {
		case TransactionType.SWAP_EXACT_AMOUNT_IN:
			return `You're swapping ${balancedCurrency(
				transaction.value.fromAmount ?? 0
			)}
			${transaction.value.fromSwap?.symbol} in
			${balancedCurrency(transaction.value.toAmount ?? 0)}
			${transaction.value.toSwap?.symbol}`
		case TransactionType.JOIN_POOL:
		case TransactionType.JOIN_SWAP_EXTERN_AMOUNT_IN:
			return `You're joining pool ${transaction.value.poolId ?? ""}`
		case TransactionType.EXIT_POOL:
			return `You're removing from pool ${transaction.value.poolId ?? ""}`
		case TransactionType.LOCK_TOKENS:
			return `You're bonding ${toDecimalGammFixed(
				transaction.value.gammAmount ?? "0"
			)} GAMM`
		case TransactionType.BEGIN_UNLOCKING:
			return `You're unbonding from pool ${transaction.value.poolId}`
		case TransactionType.SEND_IBC_TOKENS:
			return `You're moving ${balancedCurrency(fromAmountToViewDenom.value)} ${
				transaction.value.transferToken?.symbol
			} from ${transaction.value.from.name} to ${transaction.value.to?.name}`
		case TransactionType.MERKLEDROP_CLAIM:
			return `You're claiming the airdrop ${transaction.value.merkledropId}`
	}
})

const successMessage = computed(() => {
	switch (transaction.value.type) {
		case TransactionType.SWAP_EXACT_AMOUNT_IN:
			return `You swapped ${balancedCurrency(transaction.value.fromAmount ?? 0)}
			${transaction.value.fromSwap?.symbol} in
			${balancedCurrency(transaction.value.toAmount ?? 0)}
			${transaction.value.toSwap?.symbol}`
		case TransactionType.JOIN_POOL:
		case TransactionType.JOIN_SWAP_EXTERN_AMOUNT_IN:
			return `You joined pool ${transaction.value.poolId ?? ""}`
		case TransactionType.EXIT_POOL:
			return `You removed from pool ${transaction.value.poolId ?? ""}`
		case TransactionType.LOCK_TOKENS:
			return `You bonded ${toDecimalGammFixed(
				transaction.value.gammAmount ?? "0"
			)} GAMM`
		case TransactionType.BEGIN_UNLOCKING:
			return `You unbonded from pool ${transaction.value.poolId}`
		case TransactionType.SEND_IBC_TOKENS:
			return `You moved ${fromAmountToViewDenom.value} ${transaction.value.transferToken?.symbol} from ${transaction.value.from.name} to ${transaction.value.to?.name}`
		case TransactionType.MERKLEDROP_CLAIM:
			return `You claimed the airdrop ${transaction.value.merkledropId}`
	}
})

const errorMessage = computed(() => {
	switch (transaction.value.type) {
		case TransactionType.SWAP_EXACT_AMOUNT_IN:
			return `Error swapping ${balancedCurrency(transaction.value.fromAmount ?? 0)}
			${transaction.value.fromSwap?.symbol} in
			${balancedCurrency(transaction.value.toAmount ?? 0)}
			${transaction.value.toSwap?.symbol}`
		case TransactionType.JOIN_POOL:
		case TransactionType.JOIN_SWAP_EXTERN_AMOUNT_IN:
			return `Error joining pool ${transaction.value.poolId ?? ""}`
		case TransactionType.EXIT_POOL:
			return `Error removing from pool ${transaction.value.poolId ?? ""}`
		case TransactionType.LOCK_TOKENS:
			return `Error bonding ${toDecimalGammFixed(
				transaction.value.gammAmount ?? "0"
			)} GAMM`
		case TransactionType.BEGIN_UNLOCKING:
			return `Error unbonding from pool ${transaction.value.poolId}`
		case TransactionType.SEND_IBC_TOKENS:
			return `Error moving ${balancedCurrency(fromAmountToViewDenom.value)} ${
				transaction.value.transferToken?.symbol
			} from ${transaction.value.from.name} to ${transaction.value.to?.name}`
		case TransactionType.MERKLEDROP_CLAIM:
			return `Error claiming the airdrop ${transaction.value.merkledropId}`
	}
})
</script>

<template>
	<q-item
		:href="txLink"
		:clickable="transaction.tx !== undefined"
		target="_blank"
		class="row items-center justify-between w-full !opacity-100"
	>
		<span
			class="fs-12 !leading-18 text-white"
			v-if="loading"
			:class="{
				'text-white': loading,
				'text-gray': !loading,
			}"
		>
			{{ loadingMessage }}
		</span>
		<span
			class="fs-12 !leading-18 text-gray hover:text-white"
			v-else-if="transaction.status === 'success'"
		>
			{{ successMessage }}
		</span>
		<span class="fs-12 !leading-18 text-gray hover:text-white" v-else>
			{{ errorMessage }}
		</span>

		<Spinner v-if="loading" class="!w-16 !h-16 q-ml-12" />

		<span
			class="fs-10 text-weight-medium text-right opacity-40 q-ml-12 min-w-60"
			v-else
		>
			{{ formatDistanceToNow(new Date(transaction.time)) }}
		</span>
	</q-item>
</template>
