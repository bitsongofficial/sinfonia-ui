<script setup lang="ts">
import { computed } from "vue"

const props = withDefaults(
	defineProps<{
		withIcon?: boolean
		noPadding?: boolean
		color?: string
		textTransform?: string
		fontSize?: string
		minHeight?: boolean
	}>(),
	{
		color: "gradient",
		textTransform: "capitalize",
		fontSize: "12",
		minHeight: true,
	}
)

const lightModeClasses = computed(() =>
	props.color === "gradient" ? "light:text-white" : ""
)

const classes = computed(
	() =>
		`fs-${props.fontSize} ${
			props.minHeight ? "" : "min-h-auto"
		} text-weight-medium text-${props.textTransform} ${
			lightModeClasses.value
		} bg-${props.color} ${props.noPadding ? "" : "q-py-12 q-px-22"} ${
			props.withIcon ? "btn-with-icon" : ""
		}`
)
</script>

<template>
	<q-btn flat rounded :class="classes">
		<slot></slot>
	</q-btn>
</template>
