<script setup lang="ts">
import { percentage, balancedGamm, fromDecimalGamm } from "@/common/numbers"
import { resolveIcon } from "@/common/resolvers"
import { ref } from "vue"
import ModalWithClose from "./ModalWithClose.vue"
import Amount from "@/components/inputs/Amount.vue"
import LargeButton from "@/components/buttons/LargeButton.vue"
import { Pool } from "@/types"
import useTransactionManager from "@/store/transaction-manager"

const transactionManagerStore = useTransactionManager()

const props = defineProps<{
	pool: Pool
}>()

const chosenUnbonding = ref(props.pool.lockableDurationApr[2])
const amount = ref("0")

const onSubmit = () => {
	const balance = [...props.pool.availableLPBalances].pop()

	if (balance) {
		transactionManagerStore.lockTokens(chosenUnbonding.value, [
			{
				amount: fromDecimalGamm(amount.value),
				denom: balance.denom,
			},
		])
	}
}
</script>

<template>
	<ModalWithClose title="Bond LP Tokens">
		<q-form @submit="onSubmit">
			<div class="q-mb-20 flex items-center text-dark">
				<p class="fs-14 q-mr-10">Select Unbonding Period</p>
				<q-icon :name="resolveIcon('info', 15, 15)" size="10px"></q-icon>
			</div>
			<div class="row row-cols-3 q-col-gutter-md q-mb-27">
				<div v-for="up in pool.lockableDurationApr" class="col">
					<div
						@click="chosenUnbonding = up"
						:class="
							'rounded-20 q-py-16 q-px-16 flex justify-center items-center full-height cursor-pointer ' +
							(up.duration == chosenUnbonding.duration
								? 'bg-gradient'
								: 'border-primary-darker hover:bg-white-5')
						"
					>
						<div>
							<p class="fs-18 q-mb-8 text-center">
								{{ up.readableDuration }}
							</p>
							<p
								:class="
									'fs-15 text-center ' +
									(up.apr == chosenUnbonding.apr ? 'text-primary-dark-700' : 'text-dark')
								"
							>
								{{ percentage(up.apr) }} %
							</p>
						</div>
					</div>
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
			<Amount
				v-model="amount"
				:max="pool.availableLPTokens"
				class="q-mb-22"
			></Amount>
			<div class="flex justify-center">
				<LargeButton type="submit" fit :padding-y="16" class="q-px-66">
					<span class="text-uppercase"> Bond tokens </span>
				</LargeButton>
			</div>
		</q-form>
	</ModalWithClose>
</template>
