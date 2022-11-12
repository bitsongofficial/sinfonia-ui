import { Howl, Howler } from "howler"
import { ref } from "vue"
import { formatDurationLocale } from "@/common"

const sinfoniaPlayer = ref<Howl>()
const sinfoniaCurrentTrack = ref("")
const sinfoniaCurrentTokenID = ref("")
const sinfoniaCurrentTrackId = ref(-1)
const isPlaying = ref(false)
const progress = ref(0)
const currentPlayTime = ref("0:00")
const sinfoniaAudioFullDuration = ref("")

const setupAudioPlayer = (src: string, tokenId: string) => {
	sinfoniaCurrentTrack.value = src
	sinfoniaCurrentTokenID.value = tokenId

	sinfoniaPlayer.value = new Howl({
		src,
		html5: true,
		preload: "metadata",
		format: ["mp3"],
		volume: 0.5,
		onplay: (soundId: number) => {
			isPlaying.value = true
			sinfoniaCurrentTrackId.value = soundId
		},
		onend: () => {
			isPlaying.value = false
			sinfoniaCurrentTrackId.value = -1
		},
		onpause: () => {
			isPlaying.value = false
			sinfoniaCurrentTrackId.value = -1
		},
		onstop: () => {
			isPlaying.value = false
			progress.value = 0
			sinfoniaCurrentTrackId.value = -1
		},
		onload: () => {
			if (sinfoniaPlayer.value) {
				const fullDuration = sinfoniaPlayer.value.duration()
				sinfoniaAudioFullDuration.value = formatDurationLocale(
					Math.round(fullDuration)
				)
				isPlaying.value = false
				progress.value = 0
				currentPlayTime.value = "0:00"
			}
		},
	})
}

const updateProgress = () => {
	if (sinfoniaPlayer.value) {
		const seek = sinfoniaPlayer.value.seek()
		progress.value = (seek / sinfoniaPlayer.value.duration()) * 100 || 0
		currentPlayTime.value = formatDurationLocale(Math.round(seek))

		/* if (isPlaying.value) {
			requestAnimationFrame(() => this.updateProgress())
		} */
	}
}

export const useSinfoniaMediaPlayer = () => {
	const infoPlayer = ref<Howl>()
	const audioFullDuration = ref("")

	const setupInfoPlayer = (src: string) => {
		infoPlayer.value = new Howl({
			src,
			preload: "metadata",
			format: ["mp3"],
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

		console.log("load", infoPlayer.value)
	}

	const addTrack = (src: string) => {
		setupInfoPlayer(src)
	}

	const play = (src: string, tokenId: string) => {
		Howler.stop()
		setupAudioPlayer(src, tokenId)

		if (sinfoniaPlayer.value) {
			sinfoniaPlayer.value.play()
		}
	}

	const stop = () => {
		if (sinfoniaPlayer.value) {
			Howler.stop()
			sinfoniaPlayer.value.stop()
			sinfoniaCurrentTrack.value = ""
			sinfoniaCurrentTokenID.value = ""
			isPlaying.value = false
		}
	}

	return {
		sinfoniaPlayer,
		isPlaying,
		progress,
		currentPlayTime,
		sinfoniaAudioFullDuration,
		sinfoniaCurrentTrack,
		sinfoniaCurrentTrackId,
		audioFullDuration,
		sinfoniaCurrentTokenID,
		addTrack,
		play,
		stop,
	}
}
