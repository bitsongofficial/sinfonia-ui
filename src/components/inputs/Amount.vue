<script setup lang="ts">
import { computed, ref } from "vue"
import { compareBalance, isNaN, gtnZero } from "@/common/numbers"
import SmallButton from "@/components/buttons/SmallButton.vue"
import { validateRules } from "@/common/inputs"

const props = defineProps<{
	modelValue: string
	max?: string
}>()

const emit = defineEmits<{
	(e: "update:modelValue", value: string): void
	(e: "errorChange", value: boolean): void
}>()

const rules = [
	(val) => !!val || "Required field",
	(val) => !isNaN(val) || "Amount must be a decimal value",
	(val) => gtnZero(val) || "Amount must be a greater then zero",
	(val) =>
		compareBalance(val, props.max ?? "0") || "You don't have enough coins",
]

const errorMessage = ref("")
const hasError = ref(false)

const value = computed({
	get(): string {
		return props.modelValue
	},
	set(value: string) {
		hasError.value = validateRules(rules, value, errorMessage)
		emit("errorChange", hasError.value)
		emit("update:modelValue", value)
	},
})
</script>

<template>
	<div>
		<div
			class="relative-position flex justify-between q-px-20 q-py-10 no-wrap items-center q-mb-8"
		>
			<div
				:class="
					'absolute-full rounded-20 bg-primary-darker opacity-50' +
					(hasError ? ' border-primary' : '')
				"
			></div>
			<q-input
				borderless
				v-model="value"
				type="text"
				class="fs-32 q-mb-0 text-white"
				no-error-icon
				hide-bottom-space
				:rules="rules"
			/>
			<div v-if="max">
				<SmallButton label="max" xs @click="value = max ?? '0'" />
			</div>
		</div>
		<p v-if="hasError" class="fs-12 text-primary text-weight-medium">
			{{ errorMessage }}
		</p>
	</div>
</template>
