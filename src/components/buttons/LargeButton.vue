<script setup lang="ts">
import { computed } from "vue"
import StandardButton from "./StandardButton.vue"

const props = defineProps<{
	fit?: boolean
	paddingY?: number
	paddingX?: number
	type?: string
}>()
const paddingYClass = "q-py-" + (props.paddingY ?? 20)
const paddingXClass = "q-px-" + (props.paddingX ?? 40)
</script>

<template>
	<StandardButton
		:no-padding="paddingX || paddingY ? true : false"
		:type="type"
		:class="
			'fs-16 text-center ' +
			paddingYClass +
			' ' +
			(fit ? 'w-fit ' + paddingXClass : 'full-width')
		"
	>
		<slot></slot>
	</StandardButton>
</template>
