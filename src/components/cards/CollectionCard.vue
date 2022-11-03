<script setup lang="ts">
import CollectionHeader from "@/components/collections/CollectionHeader.vue"
import Card from "@/components/cards/Card.vue"
import { BitsongCollection } from "@/types"
import { formatShortAddress } from "@/common"

defineProps<{
	collection: BitsongCollection
}>()
</script>

<template>
	<Card
		:padding="0"
		:transparency="5"
		shadow="none"
		class="full-width text-white cursor-pointer transition-all hover:bg-white-10 !rounded-10 light:bg-white full-height !flex column justify-between no-wrap"
	>
		<q-img
			:src="collection.metadata?.cover"
			ratio="16/9"
			width="100%"
			height="200px"
			class="rounded-top-left-10 rounded-top-right-10"
		/>
		<div class="q-pa-30">
			<CollectionHeader :collection="collection" />
		</div>
	</Card>
</template>
