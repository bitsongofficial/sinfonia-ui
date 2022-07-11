<script setup lang="ts">
import { resolveIcon } from "@/common/resolvers"
const props = defineProps(["icon", "color", "width", "height", "size"])
const icon = resolveIcon(props.icon, props.width, props.height)
const color = props.color ? props.color : "white"
</script>
<template>
	<q-btn
		:ripple="false"
		flat
		round
		:color="color"
		:icon="icon"
		:size="props.size"
		class="no-hover"
	/>
</template>
