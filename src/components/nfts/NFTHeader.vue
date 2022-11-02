<script setup lang="ts">
import { BitsongNFT } from "@/types"

defineProps<{
	nft: BitsongNFT
}>()
</script>

<template>
	<div class="row q-mb-28 justify-between">
		<div class="column w-full">
			<div class="row items-center justify-between q-mb-14 relative-position">
				<div class="row items-center">
					<p class="fs-18 !leading-24 text-weight-medium">
						{{ nft.metadata?.name ?? "No Name" }}
					</p>
				</div>

				<!-- <IconButton
					icon="vertical-dots"
					width="4"
					height="16"
					class="fs-16 s-28 q-mr--4 opacity-30 hover:opacity-100 absolute -right-8"
					@click.native.prevent="show = true"
				>
					<PoolContextMenu
						v-model="show"
						@swap="onSwapClick"
						@liquidity="openAddRemoveModal = true"
					></PoolContextMenu>
				</IconButton> -->
			</div>
		</div>
	</div>
</template>
