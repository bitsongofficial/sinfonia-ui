<script setup lang="ts">
import { GraphQLPodcast } from "@/types"
import Card from "@/components/cards/Card.vue"

defineProps<{
	podcast: GraphQLPodcast
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
			:src="podcast.image"
			ratio="1/1"
			width="100%"
			height="140px"
			class="rounded-5 q-mb-16"
		/>

		<p class="text-white text-weight-bold !leading-26 q-mb-8 text-container-1">
			{{ podcast.title }}
		</p>

		<p class="opacity-50 !leading-22">
			{{ podcast.author }}
		</p>
	</Card>
</template>
