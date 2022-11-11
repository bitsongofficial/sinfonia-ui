<script setup lang="ts">
import NFTHeader from "@/components/nfts/NFTHeader.vue"
import Card from "@/components/cards/Card.vue"

defineProps<{
	podcast: unknown
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
			src="https://via.placeholder.com/3000"
			ratio="1/1"
			width="100%"
			height="140px"
			class="rounded-5 q-mb-16"
		/>

		<p class="text-white text-weight-bold !leading-26 q-mb-8">Mele Marce</p>

		<p class="opacity-50 !leading-22">Spotify Studios</p>
	</Card>
</template>
