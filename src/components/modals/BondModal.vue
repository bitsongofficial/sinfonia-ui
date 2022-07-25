<script setup lang="ts">
import { balancedGamm, fromDecimalGamm, equalZero } from "@/common/numbers"
import { resolveIcon } from "@/common/resolvers"
import { computed } from "vue"
import { Pool } from "@/types"
import useTransactionManager from "@/store/transaction-manager"
import InformativeTooltip from "@/components/tooltips/InformativeTooltip.vue"
import ModalWithClose from "@/components/modals/ModalWithClose.vue"
import Amount from "@/components/inputs/Amount.vue"
import LargeButton from "@/components/buttons/LargeButton.vue"
import LockableDurationRadio from "@/components/inputs/LockableDurationRadio.vue"
import { useForm } from "vee-validate"

const transactionManagerStore = useTransactionManager()

const props = defineProps<{
	pool: Pool
}>()

const validationSchema = computed(() => ({
	chosenUnbounding: {
		required: true,
		equalZero: true,
	},
	amount: {
		required: true,
		isNaN: true,
		gtnZero: true,
		compareBalance: { compare: props.pool.availableLPTokens },
	},
}))

const initialValues = computed(() => {
	let chosenUnbounding = [...props.pool.lockableDurationApr].pop()

	if (chosenUnbounding && equalZero(chosenUnbounding.totalApr)) {
		chosenUnbounding = undefined
	}

	return {
		chosenUnbounding: undefined,
		amount: "",
	}
})

const { handleSubmit, values, meta } = useForm({
	initialValues,
	validationSchema,
})

const onSubmit = handleSubmit(() => {
	const balance = [...props.pool.availableLPBalances].pop()

	if (values.chosenUnbounding && balance) {
		transactionManagerStore.lockTokens(values.chosenUnbounding, [
			{
				amount: fromDecimalGamm(values.amount),
				denom: balance.denom,
			},
		])
	}
})
</script>

<template>
	<ModalWithClose title="Bond LP Tokens">
		<div class="q-mb-20 inline flex items-center text-dark cursor-pointer">
			<p class="fs-14 q-mr-10">Select Unbonding Period</p>
			<q-icon
				:name="resolveIcon('info', 15, 15)"
				size="14px"
				class="cursor-pointer text-dark"
			/>
			<InformativeTooltip anchor="center right" self="center left">
				It indicates a countdown, after the unbonding period you will be able to
				remove liquidity from the pool. Remember: The longer you leave bonded tokens
				in the pool, the more rewards you will receive.
			</InformativeTooltip>
		</div>
		<div class="row row-cols-3 row-cols-xs-1 column-xs q-col-gutter-md q-mb-27">
			<div v-for="up in pool.lockableDurationApr" class="col">
				<LockableDurationRadio name="chosenUnbounding" :defaultValue="up" />
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
		<Amount name="amount" :max="pool.availableLPTokens" class="q-mb-22" />
		<div class="flex justify-center">
			<LargeButton
				type="submit"
				fit
				:padding-y="16"
				class="q-px-66"
				:disable="!meta.valid || transactionManagerStore.loadingAndSign"
				@click="onSubmit"
			>
				<span class="text-uppercase"> Bond tokens </span>
			</LargeButton>
		</div>
	</ModalWithClose>
</template>

<style>
.total-apr {
	max-width: 120px;
}
</style>
