<script setup lang="ts">
import { balancedCurrency, gtnZero, isNaN } from "@/common"
import { validateRules } from "@/common/inputs"
import { TokenBalance } from "@/types"
import { ValidationRule } from "quasar"
import { computed, ref } from "vue"
import CardDark from "../cards/CardDark.vue"
import SmallButton from "../buttons/SmallButton.vue"
import CoinSelect from "./CoinSelect.vue"

const props = defineProps<{
	modelValue: string
	coin: TokenBalance | null
	options: TokenBalance[]
	swapAmountFiat?: string
	showInput?: boolean
	showMax?: boolean
	rules?: ValidationRule<any>[] | undefined
}>()

const emit = defineEmits<{
	(e: "update:modelValue", value: string | undefined): void
	(e: "update:coin", value: TokenBalance | null): void
	(e: "errorStatusChange", value: boolean): void
	(e: "maxClick"): void
}>()

const errorMessage = ref("")
const hasError = computed(() => errorMessage.value != "")

const validate = (val = value.value) => {
	validateRules(props.rules, val, errorMessage)
}

const value = computed<string | undefined>({
	get() {
		return props.modelValue
	},
	set(value) {
		validate(value)
		emit("errorStatusChange", hasError.value)
		if (value == "" || (value && !isNaN(value) && gtnZero(value)))
			emit("update:modelValue", value)
	},
})

const coinWrapper = computed<TokenBalance | null>({
	get() {
		return props.coin
	},
	set(value) {
		emit("update:coin", value)
	},
})

defineExpose({
	validate,
})
</script>
<template>
	<div>
		<CardDark
			:padding-x="0"
			:padding-y="0"
			:class="
				(hasError ? 'border-primary ' : '') +
				'light:bg-white/50 light:shadow-none q-px-22 q-py-18 q-px-md-32 q-py-md-22'
			"
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
							:rules="rules"
						/>
						<p v-if="swapAmountFiat && coin" class="fs-12 text-dark text-no-wrap">
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
		<p v-if="hasError" class="text-primary q-mt-8">
			{{ errorMessage }}
		</p>
	</div>
</template>
