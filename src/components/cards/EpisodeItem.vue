<script setup lang="ts">
import Title from "@/components/typography/Title.vue"
import Card from "@/components/cards/Card.vue"
import IconButton from "@/components/buttons/IconButton.vue"
import Spinner from "@/components/Spinner"
import { PodcastEpisode, SearchPodcastEpisodeDoc } from "@/graphql/ts/graphql"
import { PodcastEpisodeEnclosure } from "@/graphql"
import { useSinfoniaMediaPlayer } from "@/hooks/useSinfoniaMediaPlayer"
import { toRef, ref, computed } from "vue"
import EpisodeContextMenu from "@/components/navigation/EpisodeContextMenu.vue"
import { episodePlaceholderImage } from "@/common"
import { useLazyQuery } from "@vue/apollo-composable"
import { formatDurationLocale, formatPubDate } from "@/common"

const props = defineProps<{
	episode: PodcastEpisode | SearchPodcastEpisodeDoc
	placeholderSrc?: string
}>()

const episodeRef = toRef(props, "episode")
const mode = ref<"play" | "playlist">("play")
const show = ref(false)
const like = ref(false)

const img = computed(() =>
	episodePlaceholderImage(props.episode as PodcastEpisode, props.placeholderSrc)
)

const {
	loading: loadingEnclosure,
	result: resultEnclosure,
	load,
	onResult,
} = useLazyQuery(PodcastEpisodeEnclosure)

const {
	play,
	resume,
	pause,
	addTrackToPlaylist,
	isPlaying,
	loadingTrack,
	sinfoniaCurrentTokenID,
} = useSinfoniaMediaPlayer()

onResult(() => {
	if (mode.value === "play") {
		playTrack()
	} else {
		addToPlaylist()
	}
})

const loadEnclosure = (modestr: "play" | "playlist") => {
	mode.value = modestr

	load(PodcastEpisodeEnclosure, {
		id: props.episode._id,
	})
}

const playTrack = async () => {
	if (episodeRef.value && resultEnclosure?.value?.podcastEpisodeEnclosure) {
		if (sinfoniaCurrentTokenID.value === episodeRef.value._id) {
			resume()
		} else {
			const episode = episodeRef.value as PodcastEpisode

			play({
				...episode,
				image: img.value,
				enclosure: {
					...resultEnclosure?.value.podcastEpisodeEnclosure,
				},
			})
		}
	}
}

const addToPlaylist = () => {
	load(PodcastEpisodeEnclosure, {
		id: props.episode._id,
	})

	if (episodeRef.value && resultEnclosure?.value?.podcastEpisodeEnclosure) {
		const episode = episodeRef.value as PodcastEpisode

		addTrackToPlaylist({
			...episode,
			image: img.value,
			enclosure: {
				...resultEnclosure?.value.podcastEpisodeEnclosure,
			},
		})
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
			:src="img"
			:placeholder-src="placeholderSrc"
			height="100px"
			width="100px"
		/>

		<div class="flex-1">
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
						@addtoplaylist="loadEnclosure('playlist')"
					></EpisodeContextMenu>
				</IconButton>
			</div>

			<p class="fs-14 !leading-22 opacity-50 text-container q-mb-16">
				{{ episode.description }}
			</p>

			<div class="row items-center">
				<Spinner
					class="!w-36 !h-36 q-mr-16"
					v-if="
						(loadingTrack && sinfoniaCurrentTokenID === episode._id) ||
						loadingEnclosure
					"
				/>
				<IconButton
					v-else-if="isPlaying && sinfoniaCurrentTokenID === episode._id"
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
					@click.prevent.stop="loadEnclosure('play')"
				/>

				<IconButton
					:icon="!like ? 'heart' : 'heart-fill'"
					width="24"
					height="24"
					class="fs-20 s-28 q-mr-16"
					@click.native.prevent="like = !like"
					:color="!like ? 'white' : 'primary'"
				/>

				<p class="opacity-50">
					{{ formatPubDate(episode.pub_date) }} ·
					{{ formatDurationLocale(episode.duration) }}
				</p>
			</div>
		</div>
	</Card>
</template>
