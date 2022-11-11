<script setup lang="ts">
import Title from "@/components/typography/Title.vue"
import Card from "@/components/cards/Card.vue"
import IconButton from "@/components/buttons/IconButton.vue"
import { BitsongNFT, BitsongCollection } from "@/types"

defineProps<{
	episode: BitsongNFT
	collection?: BitsongCollection
}>()
</script>

<template>
	<Card
		class="!grid grid-cols-12 grid-gap-24 col-span-12 hover:bg-white-10 cursor-pointer transition-all"
		:transparency="5"
	>
		<q-img
			class="col-span-2 rounded-10 shadow-20"
			:src="episode.metadata?.image"
			height="100px"
			width="100px"
		/>

		<div class="col-span-10">
			<Title class="text-weight-bold q-mb-16" :font-size="16">
				{{ episode.metadata?.name }}
			</Title>

			<p class="fs-14 !leading-22 opacity-50 text-container q-mb-16">
				{{ episode.metadata?.description }}
			</p>

			<div class="row items-center">
				<IconButton
					icon="triangle"
					width="22"
					height="17"
					class="text-white light:text-white fs-14 q-mr-16 w-36"
					icon-class="rotate-90"
					color="none"
					:solid="true"
				/>

				<!--  <IconButton
												icon="pause"
												width="24"
												height="24"
												class="text-white light:text-white fs-14 q-mr-16 w-36"
												icon-class="rotate-90 !fs-20"
												color="none"
												:solid="true"
											/> -->

				<p class="opacity-50">Nov 8 · 2 min 9 sec</p>
			</div>
		</div>
	</Card>
</template>
