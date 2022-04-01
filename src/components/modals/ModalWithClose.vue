<script setup lang="ts">
import { resolveIcon } from "@/common/resolvers"
import { computed } from "vue"
import Modal from "./Modal.vue"

const props = defineProps<{
	modelValue?: any
	title?: string
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
	<Modal v-model="model" @click="$emit('click')">
		<div
			class="q-pt-8 q-pb-44 flex justify-between text-weight-medium items-center"
		>
			<p class="fs-24 q-mr-120 q-mr-xs-10 light:opacity-90">{{ title }}</p>
			<div
				class="flex opacity-40 hover:opacity-100 cursor-pointer"
				@click="model = false"
			>
				<p class="fs-10 text-uppercase q-mr-15">close</p>
				<q-icon :name="resolveIcon('close', 12, 12)" size="10px"></q-icon>
			</div>
		</div>
		<div>
			<slot></slot>
		</div>
	</Modal>
</template>
