<script setup lang="ts">
import { Podcast } from "@/types"
import Card from "@/components/cards/Card.vue"
import { formatShortAddress } from "@/common"

defineProps<{
	category: string
	icon: string
}>()
</script>

<template>
	<Card
		:padding="16"
		:transparency="5"
		shadow="none"
		class="full-width text-white cursor-pointer transition-all hover:bg-white-10 !rounded-10 light:bg-white full-height !flex column justify-between no-wrap"
	>
		<div class="w-full h-140 q-mb-16">
			<q-icon />
		</div>

		<p class="fs-18 text-white text-weight-bold !leading-26 q-mb-8">
			{{ category }}
		</p>
	</Card>
</template>
