<script setup lang="ts">
import { Pool } from "@/types"
import { toRef, computed, ref, onBeforeUpdate, onUpdated } from "vue"
import { gtnZero, percentage } from "@/common"
import { resolveIcon } from "@/common/resolvers"
import useLiquidityModal from "@/hooks/useLiquidityModal"
import ModalWithClose from "@/components/modals/ModalWithClose.vue"
import Amount from "@/components/inputs/Amount.vue"
import PercentageWithImage from "@/components/infographics/PercentageWithImage.vue"
import LargeButton from "@/components/buttons/LargeButton.vue"
import Progress from "@/components/Progress.vue"
import InformativeTooltip from "@/components/tooltips/InformativeTooltip.vue"

const props = defineProps<{
	modelValue: boolean
	pool: Pool
}>()

const balance = computed(() => [...props.pool.availableLPBalances].pop())

const lpAvailable = computed(() => {
	if (balance.value) {
		return gtnZero(balance.value.amount)
	}

	return false
})

const emit = defineEmits<{
	(e: "update:modelValue", value: boolean): void
}>()

const model = computed<boolean>({
	get() {
		return props.modelValue
	},
	set(value) {
		emit("update:modelValue", value)
	},
})

const currentPool = toRef(props, "pool")

const {
	add,
	single,
	currentSingle,
	meta,
	balances,
	removePercent,
	removeValues,
	priceImpact,
	loading,
	onAmountChange,
	onSubmit,
	onExitPool,
	changeToken,
} = useLiquidityModal(currentPool, model)

const removePercentOverAHundred = computed<string>({
	get() {
		const rpp = parseFloat((removePercent.value * 100).toPrecision(4))
		return rpp % 1 == 0 ? rpp.toFixed(0) : rpp.toFixed(2)
	},
	set(value: string) {
		if (value && !isNaN(Number(value))) {
			removePercent.value = Math.max(0, Math.min(1, Number(value) / 100))
		}
	},
})

const removePercentInputRules = [
	(val) => !!val || "Required field",
	(val) => !isNaN(val) || "Amount must be a decimal value",
	(val) => gtnZero(val) || "Amount must be a greater then zero",
	(val) => Number(val) <= 100 || "Amount must be less then 100",
]

const inputChangeEvent = (coin, value) => {
	onAmountChange(coin.token.symbol, value)
}
</script>

<template>
	<ModalWithClose v-model="model" title="Manage Liquidity">
		<q-form @submit="onSubmit">
			<div class="flex fs-15 q-mb-22">
				<p
					:class="
						(add
							? 'light:text-gradient'
							: 'text-dark light:text-secondary light:opacity-50') +
						' cursor-pointer q-mr-27'
					"
					@click="add = true"
				>
					Add Liquidity
				</p>
				<p
					:class="
						(add
							? 'text-dark light:text-secondary light:opacity-50'
							: 'light:text-gradient') + ' cursor-pointer'
					"
					@click="add = false"
				>
					Remove Liquidity
				</p>
			</div>
			<div v-if="add">
				<template v-for="(coin, index) of pool.coins" :key="coin.token.symbol">
					<div class="q-mb-21" v-if="!single || (single && index === currentSingle)">
						<div class="flex column-xs items-center items-end-xs no-wrap q-mb-9">
							<Amount
								:name="coin.token.symbol"
								:max="balances[coin.token.symbol]"
								class="q-mr-24 q-mr-xs-0"
								@update:model-value="(value) => inputChangeEvent(coin, value)"
								@max-click="(value) => inputChangeEvent(coin, value)"
							/>
							<div class="flex items-center no-wrap">
								<div class="text-weight-medium text-right q-mr-16">
									<p class="fs-12 text-dark q-mb-6">{{ coin.token.symbol }}</p>
									<p class="fs-21 text-no-wrap">
										{{ percentage(coin.weightPercentage) }} %
									</p>
								</div>
								<PercentageWithImage
									:value="coin.weightPercentage * 100"
									:image="coin.token.logos.default"
									:negative="index == 1"
								/>
							</div>
						</div>
						<p class="fs-12 text-dark q-ml-20 text-end-xs">
							Available
							<span class="text-white">{{ balances[coin.token.symbol] }}</span>
							{{ coin.token.symbol }}
						</p>
					</div>
				</template>
				<div
					v-if="single"
					class="q-mb-46 relative-position group cursor-pointer"
					@click="changeToken"
				>
					<div
						class="absolute-full rounded-20 bg-dark opacity-20 group-hover:opacity-40"
					></div>
					<p class="text-center fs-12 q-pa-12 text-weight-medium">
						Select Another Token
					</p>
				</div>
				<div class="flex column-xs justify-between no-wrap">
					<div class="column q-mr-20 items-center-xs q-mb-xs-14">
						<div v-if="single" class="flex fs-13 q-mb-14">
							<p class="q-mr-6">&nbsp;</p>
							<p>&nbsp;</p>
						</div>
						<div class="flex no-wrap items-center">
							<q-toggle
								v-model="single"
								color="white"
								class="q-mr-8 light:shadow-none light:inner:shadow-none"
							/>
							<div class="flex cursor-pointer">
								<p class="fs-12 text-weight-medium q-mr-12">Single Asset LP</p>
								<q-icon
									:name="resolveIcon('info', 15, 15)"
									size="14px"
									class="cursor-pointer text-dark"
								/>
								<InformativeTooltip anchor="center right" self="center left">
									Provide liquidity without swapping the % of the tokens to match the
									criteria. You are participating with both assets.
								</InformativeTooltip>
							</div>
						</div>
					</div>
					<div class="column items-center">
						<div v-if="single" class="flex fs-13 q-mb-14">
							<p class="q-mr-6 text-gradient">Price Impact</p>
							<p>{{ priceImpact }} %</p>
						</div>
						<LargeButton
							type="submit"
							fit
							:padding-y="14"
							:disable="!meta.valid || loading"
						>
							<span class="text-uppercase"> Add liquidity </span>
						</LargeButton>
					</div>
				</div>
			</div>
			<div v-else>
				<div class="flex justify-center q-mb-28">
					<div class="rounded-100 border-gradient-primary w-fit q-px-42 q-py-20">
						<div class="flex justify-center items-baseline fs-44 text-white no-wrap">
							<q-input
								borderless
								v-model="removePercentOverAHundred"
								type="text"
								class="q-mb-0"
								no-error-icon
								hide-bottom-space
								input-class="text-center s-80"
								size="3"
								:rules="removePercentInputRules"
							>
							</q-input>
							<p class="q-mb-0">%</p>
						</div>
					</div>
				</div>
				<Progress :progress="removePercent" class="q-mb-16"></Progress>
				<div
					class="rounded-20 overflow-hidden relative-position text-weight-medium row q-mb-20"
				>
					<div
						:class="
							'absolute-full bg-primary-dark light:bg-white-780 light:opacity-100 rounded-20 opacity-30 w-' +
							(removeValues.indexOf(removePercent) + 1) +
							'/4'
						"
					></div>
					<div
						v-for="rm in removeValues"
						class="col-2 rounded-20 q-px-32 q-px-xs-10 q-py-18 relative-position cursor-pointer"
						@click="removePercent = rm"
					>
						<template v-if="rm == removePercent">
							<div class="!absolute-full">
								<div
									class="!absolute-full bg-primary-dark light:bg-white opacity-50 rounded-20"
								></div>
								<div class="!absolute-full light:border-gradient-primary"></div>
							</div>
							<p class="text-center relative-position z-1">{{ rm * 100 }}%</p>
						</template>
						<p
							v-else="rm == removePercent"
							class="text-dark light:text-primary-darker opacity-50 text-center"
						>
							{{ rm * 100 }}%
						</p>
					</div>
				</div>
				<div class="flex justify-center">
					<LargeButton
						type="submit"
						fit
						:padding-y="14"
						class="q-px-52"
						:disable="!lpAvailable || loading"
						@click="onExitPool"
					>
						<span class="text-uppercase"> Remove liquidity </span>
					</LargeButton>
				</div>
			</div>
		</q-form>
	</ModalWithClose>
</template>
