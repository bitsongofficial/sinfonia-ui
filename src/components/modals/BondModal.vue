<script setup lang="ts">
import {
	balancedGamm,
	fromDecimalGamm,
	gtnZero,
	compareBalance,
} from "@/common/numbers"
import { resolveIcon } from "@/common/resolvers"
import { computed, ref } from "vue"
import { Pool, LockableDurationWithApr } from "@/types"
import useTransactionManager from "@/store/transaction-manager"
import InformativeTooltip from "@/components/tooltips/InformativeTooltip.vue"
import ModalWithClose from "@/components/modals/ModalWithClose.vue"
import Amount from "@/components/inputs/Amount.vue"
import LargeButton from "@/components/buttons/LargeButton.vue"
import LockableDurationRadio from "@/components/inputs/LockableDurationRadio.vue"

const transactionManagerStore = useTransactionManager()

const props = defineProps<{
	pool: Pool
}>()

const chosenUnbonding = ref<LockableDurationWithApr | undefined>(undefined)
const amount = ref("0")

const onSubmit = () => {
	const balance = [...props.pool.availableLPBalances].pop()

	if (balance && chosenUnbonding.value) {
		transactionManagerStore.lockTokens(chosenUnbonding.value, [
			{
				amount: fromDecimalGamm(amount.value),
				denom: balance.denom,
			},
		])
	}
}

const formValid = computed(() => {
	if (!chosenUnbonding.value) {
		return false
	}

	return (
		gtnZero(amount.value) &&
		compareBalance(amount.value, props.pool.availableLPTokens)
	)
})
</script>

<template>
	<ModalWithClose title="Bond LP Tokens">
		<q-form @submit="onSubmit">
			<div class="q-mb-20 inline flex items-center text-dark cursor-pointer">
				<p class="fs-14 q-mr-10">Select Unbonding Period</p>
				<q-icon
					:name="resolveIcon('info', 15, 15)"
					size="14px"
					class="cursor-pointer text-dark"
				/>
				<InformativeTooltip anchor="center right" self="center left">
					It indicates a countdown, after the unbonding period you will be able to
					remove liquidity from the pool. Remember: The longer you leave bonded
					tokens in the pool, the more rewards you will receive.
				</InformativeTooltip>
			</div>
			<div class="row row-cols-3 row-cols-xs-1 column-xs q-col-gutter-md q-mb-27">
				<div v-for="up in pool.lockableDurationApr" class="col">
					<LockableDurationRadio v-model="chosenUnbonding" :value="up" />
				</div>
			</div>
			<div class="flex justify-between items-center q-mb-16">
				<p class="fs-14 text-dark q-mr-20">Amount to bond</p>
				<div class="flex fs-12 text-dark">
					<p class="q-mr-8">Available</p>
					<p>
						<span class="text-white">{{ balancedGamm(pool.availableLPTokens) }}</span>
						GAMM/{{ pool.id }}
					</p>
				</div>
			</div>
			<Amount v-model="amount" :max="pool.availableLPTokens" class="q-mb-22" />
			<div class="flex justify-center">
				<LargeButton
					type="submit"
					fit
					:padding-y="16"
					class="q-px-66"
					:disabled="!formValid"
				>
					<span class="text-uppercase"> Bond tokens </span>
				</LargeButton>
			</div>
		</q-form>
	</ModalWithClose>
</template>

<style>
.total-apr {
	max-width: 120px;
}
</style>
