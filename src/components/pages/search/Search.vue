<script setup lang="ts">
import Title from "@/components/typography/Title.vue"
import PodcastCard from "@/components/cards/PodcastCard.vue"
import Spinner from "@/components/Spinner"
import { resolveIcon } from "@/common"
import { onMounted, ref } from "vue"
import { QInput } from "quasar"
import usePodcasts from "@/store/podcasts"
import onAppReady from "@/hooks/onAppReady"

const searchValue = ref("")
const searchInput = ref<QInput>()
const podcastsStore = usePodcasts()

const onSearch = () => {}

const code = parseInt(import.meta.env.VITE_PODCAST_BS721_CODE_ID, 10)

onAppReady(() => {
	podcastsStore.loadPodcasts(code)
})

onMounted(() => {
	if (searchInput.value) {
		searchInput.value.focus()
	}
})
</script>

<template>
	<div>
		<div class="grid grid-cols-12 q-mb-42">
			<div
				class="relative-position cursor-pointer group col-span-12 col-span-md-3"
			>
				<div
					class="absolute-full bg-white rounded-30 opacity-5 light:opacity-100 shadow-md"
				></div>
				<div class="flex items-center q-px-14 q-py-10">
					<q-icon size="20px" :name="resolveIcon('search', 13, 13)"></q-icon>
					<q-input
						ref="searchInput"
						class="q-ml-10 min-height-input flex-1"
						input-class="q-py-0"
						hide-bottom-space
						borderless
						v-model="searchValue"
						@update:model-value="onSearch"
						debounce="500"
						dense
						placeholder="What do you want to listen to?"
					/>
				</div>
			</div>
		</div>

		<Spinner v-if="podcastsStore.loading" class="!w-50 !h-50 q-mx-auto" />

		<template v-else>
			<div class="column row-md align-items-end-md q-mb-42">
				<Title>Podcasts & Shows</Title>
			</div>

			<div
				class="grid grid-cols-min-xs-1 grid-cols-3 grid-cols-md-5 grid-gap-24 q-mb-42"
			>
				<RouterLink
					v-for="podcast of podcastsStore.sinfoniaPodcasts"
					:to="`/podcasts/${podcast.address}/details`"
					class="block full-height"
				>
					<PodcastCard :podcast="podcast" />
				</RouterLink>
			</div>
		</template>
	</div>
</template>
