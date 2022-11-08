<script setup lang="ts">
import { BitsongNFT, BitsongCollection } from "@/types"

defineProps<{
	nft: BitsongNFT
	collection?: BitsongCollection
}>()
</script>

<template>
	<div class="row justify-between">
		<div class="column w-full">
			<div class="row items-center justify-between relative-position">
				<div class="column items-start">
					<p
						class="fs-16 !leading-24 text-weight-medium opacity-50 q-mb-12"
						v-if="collection && collection.init"
					>
						{{ collection.init.name }}
					</p>
					<p class="fs-21 !leading-24 text-weight-medium">
						{{ nft.metadata?.name ?? "No Name" }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
