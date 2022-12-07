<script lang="ts" setup>
import Card from "@/components/cards/Card.vue"
import Title from "@/components/typography/Title.vue"

defineProps<{
	title: string
	subtitle: string
}>()
</script>

<template>
	<Card
		class="!flex row no-wrap grid-gap-16 hover:bg-white-10 cursor-pointer items-center transition-all"
		:transparency="5"
	>
		<slot name="logo"></slot>

		<div class="flex-1">
			<div class="row justify-between items-center no-wrap q-mb-16">
				<Title class="text-weight-bold text-container-1" :font-size="16">
					{{ title }}
				</Title>
			</div>

			<p class="fs-14 !leading-22 opacity-50 text-container">
				{{ subtitle }}
			</p>
		</div>
	</Card>
</template>
