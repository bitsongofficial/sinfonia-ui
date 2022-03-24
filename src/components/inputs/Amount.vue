<script setup lang="ts">
	import { computed } from 'vue'
	import SmallButton from '../buttons/SmallButton.vue';

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
        <div class="absolute-full rounded-20 bg-primary-darker opacity-50 ">

        </div>
        <q-input
					borderless
					v-model="value"
					type="text"
					class="fs-32 q-mb-0 text-white"
				/>
        <div v-if="max">
					<SmallButton label="max" xs @click="value = max ?? '0'"></SmallButton>
        </div>
    </div>
</template>