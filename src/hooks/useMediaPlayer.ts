import { Howl } from "howler"

class SinfoniaMediaPlayer {
	player!: Howl
	isPlaying: boolean = false

	progress = 0

	currentPlayTime = "0:00"

	audioFullDuration = ""

	constructor() {}

	addTrack(src: string) {
		this.setupAudioPlayer(src)
	}

	play() {
		if (this.player) {
			this.player.play()
		}
	}

	stop() {
		if (this.player) {
			this.player.stop()
		}
	}

	setupAudioPlayer(src: string) {
		this.player = new Howl({
			src,
			html5: true,
			onplay: () => {
				this.isPlaying = true
				requestAnimationFrame(() => this.updateProgress())
			},
			onend: () => {
				this.isPlaying = false
			},
			onpause: () => {
				this.isPlaying = false
			},
			onstop: () => {
				this.isPlaying = false
				this.progress = 0
			},
			onseek: () => {
				requestAnimationFrame(() => this.updateProgress())
			},
			onload: () => {
				const fullDuration = this.player.duration()
				this.audioFullDuration = this.formatTime(Math.round(fullDuration))
				this.isPlaying = false
				this.progress = 0
				this.currentPlayTime = "0:00"
			},
		})
	}

	updateProgress() {
		const seek = this.player.seek() as number
		this.progress = (seek / this.player.duration()) * 100 || 0
		this.currentPlayTime = this.formatTime(Math.round(seek))

		if (this.isPlaying) {
			requestAnimationFrame(() => this.updateProgress())
		}
	}

	formatTime(secs: number) {
		const minutes = Math.floor(secs / 60) || 0
		const seconds = secs - minutes * 60 || 0

		return minutes + ":" + (seconds < 10 ? "0" : "") + seconds
	}
}

const mediaPlayer = new Howl({
	src: "",
})
