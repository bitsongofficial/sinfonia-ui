<script setup lang="ts">
import WideCardWithHeader from "./WideCardWithHeader.vue"

const props = defineProps<{
	header?: string
}>()
</script>

<template>
	<WideCardWithHeader :header="header" class="full-height !flex column justify-between no-wrap">
		<p class="fs-30 word-break-all">
			<slot></slot>
		</p>
	</WideCardWithHeader>
</template>
