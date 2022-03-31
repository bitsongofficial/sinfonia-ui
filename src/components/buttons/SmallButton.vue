<script setup lang="ts">
const props = defineProps<{
	label: string
	xs?: boolean
}>()
</script>
<template>
	<q-btn
		rounded
		size="sm"
		:label="props.label"
		:class="'bg-gradient light:before:shadow-none light:text-white ' + (xs ? 'q-px-10 q-py-0 !fs-9' : '')"
	/>
</template>
