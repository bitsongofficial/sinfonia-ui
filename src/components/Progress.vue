<script setup lang="ts">
import { computed } from "vue"

const props = withDefaults(
	defineProps<{
		percentage?: number
		progress?: number
		value?: number
		max?: number
		height?: number
		reverse?: boolean
	}>(),
	{
		reverse: false,
	}
)

const actualProgress = computed(() => {
	let val = 0
	if (props.progress) val = props.progress
	if (props.percentage) val = props.percentage / 100
	if (props.value && props.max) val = props.value / props.max
	if(props.reverse) val = 1 - val
	return val
})
const heightValue = (props.height ? props.height : 8) + "px"
</script>

<template>
	<q-linear-progress
		:size="heightValue"
		:value="actualProgress"
		class="gradient-progress rounded"
		:reverse="reverse"
	/>
</template>
