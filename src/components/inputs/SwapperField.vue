<script setup lang="ts">
import { balancedCurrency, resolveIcon } from "@/common"
import { TokenBalance } from "@/types"
import { computed, toRef } from "vue"
import { useField } from "vee-validate"
import CardDark from "@/components/cards/CardDark.vue"
import CoinSelect from "@/components/inputs/CoinSelect.vue"
import InlineButton from "@/components/buttons/InlineButton.vue"
import StandardButton from "../buttons/StandardButton.vue"

const props = withDefaults(
	defineProps<{
		name: string
		label: string
		placeholder?: string
		value?: string
		coin: TokenBalance | null
		otherCoin: TokenBalance | null
		options: TokenBalance[]
		swapAmountFiat?: string
		showInput?: boolean
		showMax?: boolean
		disableMax?: boolean
		swapButton?: boolean
	}>(),
	{
		value: "",
		placeholder: "0",
		disableMax: false,
		swapButton: false,
	}
)

const emit = defineEmits<{
	(e: "update:modelValue", value: string): void
	(e: "update:coin", value: TokenBalance | null): void
	(e: "invert"): void
	(e: "maxClick"): void
	(e: "halfClick"): void
}>()

const coinWrapper = computed<TokenBalance | null>({
	get() {
		return props.coin
	},
	set(value) {
		if (value && value.symbol === props.otherCoin?.symbol) {
			emit("invert")
		} else {
			emit("update:coin", value)
		}
	},
})

const name = toRef(props, "name")

const { value, errorMessage, handleBlur, handleChange } = useField(
	name,
	undefined,
	{
		initialValue: props.value,
	}
)

const updateModelValue = (e: unknown) => {
	handleChange(e)
	emit("update:modelValue", value.value)
}
</script>
<template>
	<div>
		<CardDark
			:padding-x="0"
			:padding-y="0"
			class="light:bg-white/50 light:shadow-none q-px-22 q-py-18 q-pr-md-25 q-py-md-21"
			:class="{
				'border-primary': errorMessage,
			}"
		>
			<div class="flex justify-between q-mb-12 items-center q-pr-md-5 hidden-xs">
				<p class="fs-13 text-weight-medium opacity-30 light:text-secondary">
					{{ label }}
				</p>

				<InlineButton @click="$emit('invert')" v-if="swapButton" class="q-mr-5">
					<p class="fs-12 q-mr-10 text-dark">Invert</p>
					<span class="fs-10 text-dark">
						<q-icon size="16px" :name="resolveIcon('invert', 9, 13)" />
					</span>
				</InlineButton>
			</div>
			<div class="flex justify-between items-center no-wrap column-xs">
				<div
					class="flex-1 flex justify-between q-pr-20 q-pr-xs-none q-pt-xs-none q-pt-2 no-wrap w-full q-mb-xs-24"
				>
					<div class="q-mr-10">
						<q-input
							borderless
							v-model="value"
							hide-bottom-space
							class="fs-30 !leading-38 text-weight-medium q-mb-0 text-white input-no-append"
							input-class="q-py-0"
							:error="errorMessage !== undefined"
							:placeholder="placeholder"
							@update:model-value="updateModelValue($event)"
							@blur="handleBlur"
						/>
						<p
							v-if="swapAmountFiat && coin"
							class="balance fs-12 text-weight-medium text-dark text-no-wrap overflow-hidden text-overflow-ellipsis"
						>
							{{ balancedCurrency(swapAmountFiat) }} $
						</p>
					</div>
					<div class="column items-end q-pt-8" v-if="showMax">
						<StandardButton
							color="dark"
							class="q-mb-6 q-py-2 q-px-6 !leading-14 light:text-white"
							no-padding
							:min-height="false"
							:disable="disableMax"
							@click="$emit('halfClick')"
						>
							1/2
						</StandardButton>
						<StandardButton
							class="q-mb-6 q-py-2 q-px-6 !leading-14 min-w-36"
							no-padding
							:min-height="false"
							:disable="disableMax"
							font-size="10"
							@click="$emit('maxClick')"
						>
							MAX
						</StandardButton>
					</div>
					<div class="hidden flex-xs min-w-60" v-if="swapButton">
						<InlineButton @click="$emit('invert')" v-if="swapButton">
							<p class="fs-12 q-mr-10 text-dark">Invert</p>
							<span class="fs-10 text-dark">
								<q-icon size="16px" :name="resolveIcon('invert', 9, 13)" />
							</span>
						</InlineButton>
					</div>
				</div>

				<div class="flex-1 flex items-center w-full">
					<CoinSelect v-model="coinWrapper" :options="options"></CoinSelect>
				</div>
			</div>
		</CardDark>
		<p v-if="errorMessage" class="text-primary q-mt-8">
			{{ errorMessage }}
		</p>
	</div>
</template>

<style lang="scss">
.balance {
	max-width: 120px;
}
</style>
