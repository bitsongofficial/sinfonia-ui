<script setup lang="ts">
import { PoolAsset } from "@/types"
import { computed } from "vue"

const props = defineProps<{
	coins: PoolAsset[]
	size?: number
	smallerSize?: number
	offset?: number[]
}>()

const sizeClass = computed(() => "s-" + (props.size ? props.size : 60))
const smallerSizeClass = computed(() => {
	return (
		"s-" +
		(props.smallerSize
			? props.smallerSize
			: Math.round((props.size ? props.size : 60) / 2.9))
	)
})
const style = props.offset
	? {
			right: props.offset[0] + "px",
			bottom: props.offset[1] + "px",
	  }
	: {}
</script>

<template>
	<div class="relative-position w-fit">
		<template v-for="(coin, index) of coins" :key="index">
			<q-img
				v-if="index === 0"
				:src="coin.token.logos.default"
				:class="'rounded cover ' + sizeClass"
				fit="cover"
			/>
			<div class="absolute right-0 bottom-0" :style="style" v-else>
				<q-img
					:src="coin.token.logos.default"
					:class="'rounded cover ' + smallerSizeClass"
					fit="cover"
				/>
			</div>
		</template>
	</div>
</template>
