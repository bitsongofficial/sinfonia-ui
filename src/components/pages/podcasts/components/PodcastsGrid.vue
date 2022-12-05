<script lang="ts" setup>
import { RouterLink } from "vue-router"
import { PodcastExploreElement } from "@/graphql/ts/graphql"
import { Swiper, SwiperSlide } from "swiper/vue"
import { Swiper as SwiperClass, Navigation, A11y } from "swiper"
import Title from "@/components/typography/Title.vue"
import GQLPodcastCard from "@/components/cards/GQLPodcastCard.vue"
import IconButton from "@/components/buttons/IconButton.vue"
import "swiper/css"
import { ref } from "vue"

const modules = [Navigation, A11y]

defineProps<{
	section: PodcastExploreElement
}>()

const carousel = ref<SwiperClass>()

const onSwiper = (swiper: SwiperClass) => {
	carousel.value = swiper
}

const id = `${Date.now()}`
</script>

<template>
	<div>
		<div
			class="column row-md align-items-end-md justify-between q-mt-20 q-mb-20 full-width"
		>
			<RouterLink
				:to="`/podcasts/section/${section.hasMore}`"
				v-if="section?.hasMore"
			>
				<Title>{{ section?.title }}</Title>
			</RouterLink>
			<Title v-else>{{ section?.title }}</Title>

			<div class="row items-center">
				<RouterLink
					:to="`/podcasts/section/${section.hasMore}`"
					v-if="section?.hasMore"
					class="text-bold opacity-50 hover:opacity-100"
				>
					Show More
				</RouterLink>

				<div
					class="row items-center grid-gap-12 q-ml-24"
					v-if="section.items.length > 5"
				>
					<IconButton
						icon="keyboard-arrow-down"
						width="10"
						height="6"
						:class="`text-white light:text-white fs-16 rotate-90 cursor-pointer prev${id}`"
					/>
					<IconButton
						icon="keyboard-arrow-down"
						width="10"
						height="6"
						:class="`text-white light:text-white fs-16 rotate-270 cursor-pointer next${id}`"
					/>
				</div>
			</div>
		</div>

		<swiper
			:modules="modules"
			:slides-per-view="5"
			:space-between="24"
			v-if="section && section?.items"
			:navigation="{
				prevEl: `button.prev${id}`,
				nextEl: `button.next${id}`,
			}"
		>
			<swiper-slide v-for="item of section.items" :key="item?._id">
				<RouterLink :to="`/${item?.link}`" class="flex">
					<GQLPodcastCard
						v-if="item"
						:title="item.title"
						:image="item.image"
						:subtitle="item.subtitle"
					/>
				</RouterLink>
			</swiper-slide>
		</swiper>
	</div>
</template>
