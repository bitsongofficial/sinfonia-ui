<script setup lang="ts">
import Title from "@/components/typography/Title.vue"
import Card from "@/components/cards/Card.vue"
import IconButton from "@/components/buttons/IconButton.vue"
import { PodcastEpisode } from "@/graphql/ts/graphql"
import { useSinfoniaMediaPlayer } from "@/hooks/useSinfoniaMediaPlayer"
import { onUnmounted, toRef, watch, ref } from "vue"
import EpisodeContextMenu from "@/components/navigation/EpisodeContextMenu.vue"

const props = defineProps<{
	episode: PodcastEpisode
}>()

const episodeRef = toRef(props, "episode")
const show = ref(false)

const {
	addTrack,
	play,
	pause,
	addTrackToPlaylist,
	isPlaying,
	audioFullDuration,
	sinfoniaCurrentTokenID,
} = useSinfoniaMediaPlayer()

const episodeWatcher = watch(
	() => episodeRef.value,
	(value) => {
		if (value && value.enclosures && value.enclosures.length > 0) {
			const [enclosure] = value.enclosures

			if (enclosure && enclosure.url) {
				addTrack(enclosure.url)
			}
		}
	},
	{
		immediate: true,
	}
)

onUnmounted(() => {
	episodeWatcher()
})

const playTrack = () => {
	if (episodeRef.value) {
		play(episodeRef.value)
	}
}
</script>

<template>
	<Card
		class="!flex row no-wrap grid-gap-24 hover:bg-white-10 cursor-pointer transition-all"
		:transparency="5"
	>
		<q-img
			class="rounded-10 shadow-20 min-w-100"
			:src="episode.image ?? ''"
			height="100px"
			width="100px"
		/>

		<div>
			<div class="row justify-between items-center no-wrap q-mb-16">
				<Title class="text-weight-bold text-container-1" :font-size="16">
					{{ episode.title }}
				</Title>
				<IconButton
					icon="vertical-dots"
					width="4"
					height="16"
					class="fs-16 s-28 q-mr--4 opacity-30 hover:opacity-100"
					@click.native.prevent="show = true"
				>
					<EpisodeContextMenu
						v-model="show"
						@addtoplaylist="addTrackToPlaylist(episode)"
					></EpisodeContextMenu>
				</IconButton>
			</div>

			<p class="fs-14 !leading-22 opacity-50 text-container q-mb-16">
				{{ episode.description }}
			</p>

			<div class="row items-center">
				<IconButton
					v-if="isPlaying && sinfoniaCurrentTokenID === episode._id"
					icon="pause"
					width="24"
					height="24"
					class="text-white light:text-white fs-14 q-mr-16 w-36"
					icon-class="rotate-90 !fs-20"
					color="none"
					:solid="true"
					@click.prevent.stop="pause"
				/>
				<IconButton
					v-else
					icon="triangle"
					width="22"
					height="17"
					class="text-white light:text-white fs-14 q-mr-16 w-36"
					icon-class="rotate-90"
					color="none"
					:solid="true"
					@click.prevent.stop="playTrack"
				/>

				<p class="opacity-50">{{ audioFullDuration }}</p>
			</div>
		</div>
	</Card>
</template>
