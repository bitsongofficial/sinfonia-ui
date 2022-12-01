<script setup lang="ts">
import Card from "@/components/cards/Card.vue"

defineProps<{
	category: string
}>()
</script>

<template>
	<Card
		:padding="16"
		:transparency="5"
		shadow="none"
		class="full-width text-white cursor-pointer transition-all hover:bg-white-10 !rounded-10 light:bg-white full-height !flex column justify-between no-wrap"
	>
		<div class="flex items-center justify-center h-140 w-full q-mb-16">
			<div class="size-100">
				<slot name="image"></slot>
			</div>
		</div>

		<p class="fs-18 text-white text-weight-bold !leading-26 q-mb-8">
			{{ category }}
		</p>
	</Card>
</template>
