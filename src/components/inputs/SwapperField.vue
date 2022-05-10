<script setup lang="ts">
import { balancedCurrency } from "@/common"
import { TokenBalance } from "@/types"
import { ValidationRule } from "quasar"
import { computed, toRef } from "vue"
import { useField } from "vee-validate"
import CardDark from "@/components/cards/CardDark.vue"
import SmallButton from "@/components/buttons/SmallButton.vue"
import CoinSelect from "@/components/inputs/CoinSelect.vue"

const props = withDefaults(
	defineProps<{
		name: string
		value?: string
		coin: TokenBalance | null
		options: TokenBalance[]
		swapAmountFiat?: string
		showInput?: boolean
		showMax?: boolean
	}>(),
	{
		value: "",
	}
)

const emit = defineEmits<{
	(e: "update:modelValue", value: string): void
	(e: "update:coin", value: TokenBalance | null): void
	(e: "maxClick"): void
}>()

const coinWrapper = computed<TokenBalance | null>({
	get() {
		return props.coin
	},
	set(value) {
		emit("update:coin", value)
	},
})

const name = toRef(props, "name")

const { value, errorMessage, handleBlur, handleChange, meta } = useField(
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
			class="light:bg-white/50 light:shadow-none q-px-22 q-py-18 q-px-md-32 q-py-md-22"
			:class="{
				'border-primary': errorMessage,
			}"
		>
			<div class="flex justify-between no-wrap column-xs">
				<div class="flex-1 flex justify-between items-center q-py-6 no-wrap">
					<div class="q-mr-10">
						<q-input
							borderless
							v-model="value"
							hide-bottom-space
							class="fs-24 q-mb-0 text-white input-no-append"
							input-class="q-py-0"
							:error="errorMessage !== undefined"
							@update:model-value="updateModelValue($event)"
							@blur="handleBlur"
						/>
						<p
							v-if="swapAmountFiat && coin"
							class="balance fs-12 text-dark text-no-wrap overflow-hidden text-overflow-ellipsis"
						>
							{{ balancedCurrency(swapAmountFiat) }} $
						</p>
					</div>
					<div v-if="showMax">
						<SmallButton xs label="MAX" @click="$emit('maxClick')"></SmallButton>
					</div>
				</div>
				<div class="vertical-separator q-mx-28 gt-xs"></div>
				<div class="flex-1 flex items-center">
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
