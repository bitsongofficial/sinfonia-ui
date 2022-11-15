<script setup lang="ts">
import { BitsongNFT } from "@/types"

defineProps<{
	track: BitsongNFT
}>()
</script>

<template>
	<div class="row items-center">
		<q-img
			class="rounded-10"
			:src="track.metadata?.image"
			width="56px"
			height="56px"
		/>

		<div class="column q-ml-12 h-full items-start">
			<p class="text-white fs-14 !leading-22 text-bold">
				{{ track.metadata?.name }}
			</p>

			<!-- <p class="fs-14 !leading-22">
        {{ track.owner }}
      </p> -->
		</div>
	</div>
</template>
