<script setup lang="ts">
import CardWithHeader from "./CardWithHeader.vue"

defineProps<{
	header?: string
	padding?: number
}>()
</script>

<template>
	<CardWithHeader
		class="full-width full-height q-px-30"
		:header="header"
		:padding="padding ? padding : 20"
	>
		<template v-slot:header>
			<div class="flex row items-center q-mb-21">
				<p class="fs-16 text-weight-medium q-mb-none q-mr-21">{{ header }}</p>
				<slot name="icons"></slot>
			</div>
		</template>

		<slot></slot>
	</CardWithHeader>
</template>
