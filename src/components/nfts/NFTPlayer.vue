<script setup lang="ts">
import "@vime/core/themes/default.css"

import { Player, Video } from "@vime/vue-next"

defineProps<{
	src: string
	poster: string
}>()
</script>

<template>
	<Player controls>
		<Video crossorigin="" :poster="poster">
			<source :data-src="src" type="video/mp4" />
		</Video>
	</Player>
</template>
