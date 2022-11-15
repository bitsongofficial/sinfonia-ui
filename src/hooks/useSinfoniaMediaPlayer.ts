import { Howl, Howler } from "howler"
import { computed, reactive, ref, watch } from "vue"
import { formatDurationLocale } from "@/common"
import { BitsongNFT } from "@/types"

const format = ["mp3", "wav", "mp4", "webm", "mpeg"]

const sinfoniaPlayer = ref<Howl>()
const sinfoniaCurrentTrack = ref("")
const sinfoniaCurrentTokenID = ref("")
const sinfoniaCurrentTrackNFT = ref<BitsongNFT>()
const isPlaying = ref(false)
const progress = ref(0) // Percentage
const durationProgress = ref(0) // seconds
const currentPlayTime = ref("0:00")
const sinfoniaLabelAudioDuration = ref("")
const sinfoniaAudioDuration = ref(0)
const currentVolume = ref(1)

const setupAudioPlayer = (nft: BitsongNFT, tokenId: string) => {
	sinfoniaCurrentTrackNFT.value = nft

	if (nft.metadata?.animation_url) {
		const src = nft.metadata.animation_url
		sinfoniaCurrentTrack.value = src
		sinfoniaCurrentTokenID.value = tokenId

		sinfoniaPlayer.value = new Howl({
			src,
			html5: true,
			preload: "metadata",
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

const clearAnimations = () => {
	for (const requestID of requestIDs) {
		cancelAnimationFrame(requestID)
	}

	requestIDs = []
}

const volume = (newValue: number) => {
	if (sinfoniaPlayer.value) {
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

	const play = (src: BitsongNFT, tokenId: string) => {
		Howler.stop()
		setupAudioPlayer(src, tokenId)

		if (sinfoniaPlayer.value) {
			sinfoniaPlayer.value.play()
		}
	}

	const resume = () => {
		if (sinfoniaPlayer.value) {
			sinfoniaPlayer.value.play()
		}
	}

	const stop = () => {
		if (sinfoniaPlayer.value) {
			Howler.stop()
			sinfoniaPlayer.value.stop()
			sinfoniaCurrentTrackNFT.value = undefined
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

	return {
		sinfoniaPlayer,
		isPlaying,
		progress,
		currentPlayTime,
		sinfoniaLabelAudioDuration,
		sinfoniaAudioDuration,
		sinfoniaCurrentTrack,
		sinfoniaCurrentTrackNFT,
		audioFullDuration,
		sinfoniaCurrentTokenID,
		durationProgress,
		currentVolume,
		addTrack,
		play,
		stop,
		pause,
		resume,
		seek,
		volume,
		toggleVolume,
	}
}
