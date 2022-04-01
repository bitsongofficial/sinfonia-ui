<script setup lang="ts">
import { Pool } from "@/types"
import { toRef, computed } from "vue"
import { percentage } from "@/common"
import { resolveIcon } from "@/common/resolvers"
import ModalWithClose from "@/components/modals/ModalWithClose.vue"
import Amount from "@/components/inputs/Amount.vue"
import PercentageWithImage from "@/components/infographics/PercentageWithImage.vue"
import LargeButton from "@/components/buttons/LargeButton.vue"
import Progress from "@/components/Progress.vue"
import useLiquidityModal from "@/hooks/useLiquidityModal"

const props = defineProps<{
	modelValue: boolean
	pool: Pool
}>()

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
	coinsAmounts,
	balances,
	removePercent,
	removeValues,
	priceImpact,
	onAmountChange,
	onSubmit,
	changeToken,
} = useLiquidityModal(currentPool, model)
</script>

<template>
	<ModalWithClose v-model="model" title="Manage Liquidity">
		<q-form @submit="onSubmit">
			<div class="flex fs-15 q-mb-22">
				<p
					:class="(add ? 'light:text-gradient' : 'text-dark light:text-secondary light:opacity-50') + ' cursor-pointer q-mr-27'"
					@click="add = true"
				>
					Add Liquidity
				</p>
				<p
					:class="(add ? 'text-dark light:text-secondary light:opacity-50' : 'light:text-gradient') + ' cursor-pointer'"
					@click="add = false"
				>
					Remove Liquidity
				</p>
			</div>
			<div v-if="add">
				<template v-for="(coin, index) of pool.coins">
					<div class="q-mb-21" v-if="!single || (single && index === currentSingle)">
						<div class="flex column-xs items-center items-end-xs no-wrap q-mb-9">
							<Amount
								v-model="coinsAmounts[coin.token.symbol]"
								:max="balances[coin.token.symbol]"
								class="q-mr-24 q-mr-xs-0"
								@update:model-value="
									(value) => onAmountChange(coin.token.symbol, value)
								"
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
									negative
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
					<p class="text-center fs-12 q-pa-12 text-weight-medium">Change token</p>
				</div>
				<div class="flex column-xs justify-between no-wrap">
					<div class="column q-mr-20 items-center-xs q-mb-xs-14">
						<div v-if="single" class="flex fs-13 q-mb-14">
							<p class="q-mr-6">&nbsp;</p>
							<p>&nbsp;</p>
						</div>
						<div class="flex no-wrap items-center">
							<q-toggle v-model="single" color="white" class="q-mr-8 light:shadow-none light:inner:shadow-none" />
							<p class="fs-12 text-weight-medium q-mr-12">Single Asset LP</p>
							<q-icon
								:name="resolveIcon('info', 15, 15)"
								class="text-dark cursor-pointer"
							>
							</q-icon>
						</div>
					</div>
					<div class="column items-center">
						<div v-if="single" class="flex fs-13 q-mb-14">
							<p class="q-mr-6 text-gradient">Price Impact</p>
							<p>{{ priceImpact }} %</p>
						</div>
						<LargeButton type="submit" fit :padding-y="14">
							<span class="text-uppercase"> Add liquidity </span>
						</LargeButton>
					</div>
				</div>
			</div>
			<div v-else>
				<div class="flex justify-center q-mb-28">
					<div class="rounded-100 border-gradient-primary w-fit q-px-42 q-py-20">
						<p class="fs-44">{{ removePercent * 100 }} %</p>
					</div>
				</div>
				<Progress :progress="removePercent" class="q-mb-16"></Progress>
				<div
					class="rounded-20 overflow-hidden relative-position text-weight-medium row q-mb-20"
				>
					<div
						:class="
							'absolute-full bg-primary-dark light:bg-white/90 rounded-20 opacity-30 w-' +
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
							<div
								class="absolute-full bg-primary-dark light:bg-white opacity-50 rounded-20 -z-1"
							></div>
							<p class="text-center">{{ rm * 100 }}%</p>
						</template>
						<p v-else="rm == removePercent" class="text-dark opacity-50 text-center">
							{{ rm * 100 }}%
						</p>
					</div>
				</div>
				<div class="flex justify-center">
					<LargeButton type="submit" fit :padding-y="14" class="q-px-52">
						<span class="text-uppercase"> Remove liquidity </span>
					</LargeButton>
				</div>
			</div>
		</q-form>
	</ModalWithClose>
</template>
