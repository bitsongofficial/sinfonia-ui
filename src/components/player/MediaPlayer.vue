<script setup lang="ts">
import Track from "@/components/player/Track.vue"
import IconButton from "@/components/buttons/IconButton.vue"
import TrackBar from "@/components/player/TrackBar.vue"
import { useSinfoniaMediaPlayer } from "@/hooks/useSinfoniaMediaPlayer"
import { resolveIcon } from "@/common"

const {
	sinfoniaCurrentTrackNFT,
	isPlaying,
	durationProgress,
	sinfoniaAudioDuration,
	currentVolume,
	volume,
	pause,
	resume,
	seek,
	toggleVolume,
} = useSinfoniaMediaPlayer()
</script>

<template>
	<Transition name="fade" mode="out-in">
		<div
			class="fixed bottom-20 left-0 w-full container"
			v-if="sinfoniaCurrentTrackNFT"
		>
			<div class="w-full q-ml-auto !w-xs-full !w-md-5/6">
				<div
					class="bg-secondary-80 light:bg-white blur-20 shadow-10 row items-center rounded-20 h-80 q-pa-10"
				>
					<Track :track="sinfoniaCurrentTrackNFT" class="w-3/10 min-w-180" />

					<div class="w-2/5">
						<div class="w-full row items-center">
							<div class="flex-1"></div>
							<IconButton
								v-if="isPlaying"
								icon="pause"
								width="24"
								height="24"
								class="text-white light:text-white fs-14 w-36 h-36"
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
								class="text-white light:text-white fs-14 w-36 h-36"
								icon-class="rotate-90"
								color="none"
								:solid="true"
								@click.prevent.stop="resume"
							/>
							<div class="flex-1"></div>
						</div>

						<TrackBar
							v-model="durationProgress"
							:min="0"
							:max="sinfoniaAudioDuration"
							class="w-full"
							@update:model-value="seek"
						/>
					</div>

					<div class="w-3/10 min-w-180 q-pr-8">
						<div class="row items-center no-wrap q-ml-auto max-w-160">
							<IconButton
								icon="volume"
								width="24"
								height="24"
								class="text-white light:text-white fs-20 w-32 h-32"
								color="none"
								@click.prevent.stop="toggleVolume"
							/>
							<q-slider
								:model-value="currentVolume"
								@update:model-value="volume"
								class="gradient-slider rounded"
								:min="0"
								:max="1"
								:step="0.1"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Transition>
</template>
