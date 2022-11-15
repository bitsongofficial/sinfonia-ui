<script setup lang="ts">
import { BitsongCollection } from "@/types"
import Card from "@/components/cards/Card.vue"
import { formatShortAddress } from "@/common"

defineProps<{
	podcast: BitsongCollection
}>()
</script>

<template>
	<Card
		:padding="16"
		:transparency="5"
		shadow="none"
		class="full-width text-white cursor-pointer transition-all hover:bg-white-10 !rounded-10 light:bg-white full-height !flex column justify-between no-wrap"
	>
		<q-img
			:src="podcast.metadata?.image"
			ratio="1/1"
			width="100%"
			height="140px"
			class="rounded-5 q-mb-16"
		/>

		<p class="text-white text-weight-bold !leading-26 q-mb-8">
			{{ podcast.init?.name }}
		</p>

		<p class="opacity-50 !leading-22">
			{{ formatShortAddress(podcast.creator) }}
		</p>
	</Card>
</template>
