<script setup lang="ts">
import { computed, ref } from "vue"

const props = withDefaults(
	defineProps<{
		transparency?: string | number
		padding?: number
		shadow?: string
	}>(),
	{
		transparency: 10,
		padding: 22,
		shadow: "shadow-20",
	}
)

const classes = computed(() => {
	return `bg-white-${props.transparency} q-pa-${props.padding} ${props.shadow} rounded-20 inline-block full-width`
})

const element = ref(null)

defineExpose({
	element,
})
</script>
<template>
	<div ref="element" :class="classes">
		<slot></slot>
	</div>
</template>
