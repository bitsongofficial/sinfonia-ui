<script setup lang="ts">
import StandardButton from "./StandardButton.vue"
import { resolveIcon } from "@/common/resolvers"

const props = defineProps([
	"icon",
	"color",
	"width",
	"height",
	"size",
	"solid",
	"iconClass",
])

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
		v-if="!solid"
	>
		<slot></slot>
	</q-btn>
	<StandardButton class="q-py-6 q-px-6" :no-padding="true" v-else>
		<q-icon :class="iconClass" :name="icon" :color="color" :size="size"></q-icon>
		<slot></slot>
	</StandardButton>
</template>
