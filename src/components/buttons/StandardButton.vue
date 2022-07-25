<script setup lang="ts">
import { computed } from "vue"

const props = withDefaults(
	defineProps<{
		withIcon?: boolean
		noPadding?: boolean
		color?: string
		textTransform?: string
	}>(),
	{
		color: "gradient",
		textTransform: "capitalize",
	}
)

const lightModeClasses = computed(() =>
	props.color === "gradient" ? "light:text-white" : ""
)

const classes = computed(
	() =>
		`fs-12 text-weight-medium text-${props.textTransform} ${
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
