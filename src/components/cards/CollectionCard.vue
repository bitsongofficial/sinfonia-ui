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
		:padding="30"
		:transparency="5"
		shadow="none"
		class="full-width text-white cursor-pointer transition-all hover:bg-white-10 light:bg-white full-height !flex column justify-between no-wrap"
	>
		<CollectionHeader :collection="collection" />
		<div class="grid grid-cols-2 grid-gap-16">
			<div class="column">
				<p class="fs-12 !leading-14 text-weight-medium opacity-40 q-pb-10">
					Creator
				</p>
				<p class="fs-16 !leading-20 text-weight-medium work-break-all">
					{{ formatShortAddress(collection.creator) }}
				</p>
			</div>
		</div>
	</Card>
</template>
