<script setup lang="ts">
import { PodcastEpisode } from "@/graphql/ts/graphql"

defineProps<{
	track: PodcastEpisode
}>()
</script>

<template>
	<div class="row items-center">
		<q-img
			class="rounded-10 min-w-56"
			:src="track.image ?? ''"
			width="56px"
			height="56px"
		/>

		<div class="column q-ml-12 h-full items-start">
			<p class="text-white fs-14 !leading-22 text-bold text-container">
				{{ track.title }}
			</p>

			<!-- <p class="fs-14 !leading-22">
				{{ track. }}
			</p> -->
		</div>
	</div>
</template>
