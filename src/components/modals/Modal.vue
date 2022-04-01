<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
	modelValue?: any
}>()
const emit = defineEmits<{
	(e: "update:modelValue", value: any): void
	(e: "click"): void
}>()
const model = computed({
	get(): any {
		return props.modelValue
	},
	set(value: any) {
		emit("update:modelValue", value)
	},
})
</script>

<template>
	<q-dialog v-model="model">
		<div
			class="text-white !rounded-20 bg-dark-lighter light:bg-white/80 shadow-20-alt blur-60 q-px-34 q-py-30"
			@click="$emit('click')"
		>
			<slot></slot>
		</div>
	</q-dialog>
</template>
