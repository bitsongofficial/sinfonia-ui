<script setup lang="ts">
import { BitsongNFT } from "@/types"

defineProps<{
	nft: BitsongNFT
}>()
</script>

<template>
	<div class="row justify-between">
		<div class="column w-full">
			<div class="row items-center justify-between relative-position">
				<div class="row items-center">
					<p class="fs-21 !leading-24 text-weight-medium">
						{{ nft.metadata?.name ?? "No Name" }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
