<script setup lang="ts">
defineEmits<{
	(e: "addtoplaylist"): void
}>()
</script>

<template>
	<q-menu
		no-parent-event
		touch-position
		class="rounded-20 text-white"
		anchor="center start"
		self="center end"
	>
		<q-list style="min-width: 130px">
			<q-item clickable :hoverable="false" v-close-popup>
				<q-item-section @click="$emit('addtoplaylist')">
					Add To Playlist
				</q-item-section>
			</q-item>
		</q-list>
	</q-menu>
</template>
