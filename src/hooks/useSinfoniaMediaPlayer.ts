import { Howl, Howler } from "howler"
import { computed, reactive, ref, watch } from "vue"
import { formatDurationLocale } from "@/common"
import { BitsongNFT } from "@/types"

const format = ["mp3", "wav", "mp4", "webm", "mpeg"]

const sinfoniaPlayer = ref<Howl>()
const sinfoniaCurrentTrack = ref("")
const sinfoniaCurrentTokenID = ref("")

const sinfoniaPlaylist = ref<BitsongNFT[]>([])
const currentTrackIndex = ref(0)

const isPlaying = ref(false)
const progress = ref(0) // Percentage
const durationProgress = ref(0) // seconds
const currentPlayTime = ref("0:00")
const sinfoniaLabelAudioDuration = ref("")
const sinfoniaAudioDuration = ref(0)
const currentVolume = ref(1)

const sinfoniaCurrentTrackNFT = computed<BitsongNFT>(
	() => sinfoniaPlaylist.value[currentTrackIndex.value]
)

const canGoNext = computed(
	() => currentTrackIndex.value < sinfoniaPlaylist.value.length - 1
)

const canGoPrev = computed(() => currentTrackIndex.value > 0)

const addTrackToPlaylist = (track: BitsongNFT) => {
	sinfoniaPlaylist.value.push(track)
}

const setupAudioPlayer = () => {
	const nft = sinfoniaPlaylist.value[currentTrackIndex.value]

	if (nft.metadata?.animation_url) {
		clearAnimations()
		const src = nft.metadata.animation_url
		sinfoniaCurrentTrack.value = src
		sinfoniaCurrentTokenID.value = nft.token_id
		progress.value = 0
		durationProgress.value = 0

		sinfoniaPlayer.value = new Howl({
			src,
			html5: true,
			preload: "metadata",
			autoplay: true,
			format,
			volume: currentVolume.value,
			onplay: () => {
				isPlaying.value = true
				const requestID = requestAnimationFrame(() => updateProgress())

				requestIDs.push(requestID)
			},
			onend: () => {
				isPlaying.value = false
			},
			onpause: () => {
				isPlaying.value = false
				clearAnimations()
			},
			onstop: () => {
				isPlaying.value = false
				progress.value = 0
				durationProgress.value = 0
				clearAnimations()
			},
			onseek: () => {
				console.log("on seek")
				const requestID = requestAnimationFrame(() => updateProgress())

				requestIDs.push(requestID)
			},
			onload: () => {
				if (sinfoniaPlayer.value) {
					const fullDuration = sinfoniaPlayer.value.duration()
					sinfoniaLabelAudioDuration.value = formatDurationLocale(
						Math.round(fullDuration)
					)
					sinfoniaAudioDuration.value = fullDuration
					isPlaying.value = false
					progress.value = 0
					durationProgress.value = 0
					currentPlayTime.value = "0:00"
				}
			},
		})
	}
}

const play = (src: BitsongNFT) => {
	Howler.stop()
	currentTrackIndex.value = 0
	addTrackToPlaylist(src)
	setupAudioPlayer()

	if (sinfoniaPlayer.value) {
		sinfoniaPlayer.value.play()
	}
}

const resume = () => {
	if (sinfoniaPlayer.value) {
		sinfoniaPlayer.value.play()
	} else if (sinfoniaCurrentTrackNFT.value) {
		setupAudioPlayer()
	}
}

const next = () => {
	if (canGoNext.value) {
		currentTrackIndex.value++

		Howler.stop()
		setupAudioPlayer()
	}
}

const prev = () => {
	if (canGoPrev.value) {
		currentTrackIndex.value--

		Howler.stop()
		setupAudioPlayer()
	}
}

const stop = () => {
	if (sinfoniaPlayer.value) {
		Howler.stop()
		sinfoniaPlayer.value.stop()
		currentTrackIndex.value = -1
		sinfoniaCurrentTrack.value = ""
		sinfoniaCurrentTokenID.value = ""
		isPlaying.value = false
	}
}

const pause = () => {
	if (sinfoniaPlayer.value) {
		sinfoniaPlayer.value.pause()
		isPlaying.value = false
	}
}

const clearAnimations = () => {
	for (const requestID of requestIDs) {
		cancelAnimationFrame(requestID)
	}

	requestIDs = []
}

const volume = (newValue: number | null) => {
	if (sinfoniaPlayer.value && newValue !== null) {
		sinfoniaPlayer.value.volume(newValue)
		currentVolume.value = newValue
	}
}

const toggleVolume = () => {
	const newVolume = currentVolume.value === 0 ? 1 : 0

	volume(newVolume)
}

const seek = (newValue: number) => {
	if (sinfoniaPlayer.value) {
		durationProgress.value = newValue

		clearAnimations()

		sinfoniaPlayer.value.seek(newValue)
	}
}

let requestIDs: number[] = []

const updateProgress = () => {
	if (sinfoniaPlayer.value) {
		const seek = sinfoniaPlayer.value.seek()
		progress.value = (seek / sinfoniaPlayer.value.duration()) * 100 || 0
		durationProgress.value = seek
		currentPlayTime.value = formatDurationLocale(Math.round(seek))

		if (isPlaying.value) {
			const requestID = requestAnimationFrame(() => updateProgress())
			requestIDs.push(requestID)
		}
	}
}

export const useSinfoniaMediaPlayer = () => {
	const infoPlayer = ref<Howl>()
	const audioFullDuration = ref("")

	const setupInfoPlayer = (src: string) => {
		infoPlayer.value = new Howl({
			src,
			preload: "metadata",
			format,
			html5: true,
			onloaderror: (_, error) => {
				console.log(error)
			},
			onload: () => {
				if (infoPlayer.value) {
					const fullDuration = infoPlayer.value.duration()
					audioFullDuration.value = formatDurationLocale(Math.round(fullDuration))
				}
			},
		})
	}

	const addTrack = (src: string) => {
		setupInfoPlayer(src)
	}

	return {
		sinfoniaPlayer,
		isPlaying,
		progress,
		currentPlayTime,
		sinfoniaLabelAudioDuration,
		sinfoniaAudioDuration,
		sinfoniaCurrentTrack,
		sinfoniaPlaylist,
		sinfoniaCurrentTrackNFT,
		audioFullDuration,
		sinfoniaCurrentTokenID,
		durationProgress,
		currentVolume,
		canGoNext,
		canGoPrev,
		addTrack,
		play,
		stop,
		pause,
		resume,
		seek,
		volume,
		toggleVolume,
		next,
		prev,
		addTrackToPlaylist,
	}
}
