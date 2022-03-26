<script setup lang="ts">
import { computed } from "vue"
import Card from "./Card.vue"
const props = defineProps<{
	paddingX?: number
	paddingY?: number
}>()

const paddingClasses = computed(() => {
	return (
		"q-px-" +
		(props.paddingX != null ? props.paddingX : 32) +
		" q-py-" +
		(props.paddingY ? props.paddingY : 22)
	)
})
</script>

<template>
	<Card :class="'bg-primary-dark ' + paddingClasses" :padding="paddingX">
		<slot></slot>
	</Card>
</template>
