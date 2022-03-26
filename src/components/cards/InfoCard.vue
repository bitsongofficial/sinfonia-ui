<script setup lang="ts">
import WideCardWithHeader from "./WideCardWithHeader.vue"

const props = defineProps<{
	header?: string
}>()
</script>

<template>
	<WideCardWithHeader :header="header">
		<p class="fs-30">
			<slot></slot>
		</p>
	</WideCardWithHeader>
</template>
