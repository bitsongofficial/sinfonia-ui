<script setup lang="ts">
import Card from "./Card.vue"

defineProps<{
	header?: string
	padding?: number
}>()
</script>

<template>
	<Card class="q-px-40 q-py-30" :padding="padding">
		<p class="fs-13 opacity-50 q-mb-30 text-uppercase" v-if="!$slots.header">
			{{ header }}
		</p>
		<slot name="header" v-else></slot>
		<div>
			<slot></slot>
		</div>
	</Card>
</template>
