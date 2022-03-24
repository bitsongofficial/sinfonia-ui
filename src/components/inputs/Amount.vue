<script setup lang="ts">
	import { computed } from 'vue'
	import { compareBalance, isNaN, gtnZero } from '@/common/numbers';
	import SmallButton from '@/components/buttons/SmallButton.vue';

	const props = defineProps<{
		modelValue: string,
		max?: string,
	}>()

	const emit = defineEmits<{
		(e:'update:modelValue', value: string): void,
	}>()

	const value = computed({
		get(): (string) {
			return props.modelValue
		},
		set(value: string) {
			emit('update:modelValue', value)
		}
	})
</script>

<template>
	<div class="relative-position flex justify-between q-px-20 q-py-10 no-wrap items-center">
		<div class="absolute-full rounded-20 bg-primary-darker opacity-50"></div>
		<q-input
			borderless
			v-model="value"
			type="text"
			class="fs-32 q-mb-0 text-white"
			no-error-icon
			hide-bottom-space
			:rules="[
				val => !!val || 'Required field',
				val => !isNaN(val) || 'Amount must be a decimal value',
				val => gtnZero(val) || 'Amount must be a greater then zero',
				val => compareBalance(val, max ?? '0') || 'You don\'t have enough coins',
			]"
		/>
		<div v-if="max">
			<SmallButton label="max" xs @click="value = max ?? '0'" />
		</div>
	</div>
</template>