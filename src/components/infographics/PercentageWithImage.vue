<script setup lang="ts">
import { resolveIcon } from "@/common/resolvers"
import { useQuasar } from "quasar";
import { computed } from "vue"

const props = defineProps<{
	image?: string
	icon?: { name: string; width: number; height: number }
	value: number
	color?: string
	negative?: boolean
	full?: boolean
	size?: string
	imageSize?: string
	altStyle?: boolean
}>()

const $q = useQuasar()

let actualColor = props.negative && !props.altStyle ? "white" : "primary"
if(props.color)
{
	actualColor = props.color
}
let trackColor = props.altStyle ? 'dark-lighter' : 'white'
if(!props.full)
{
	trackColor = 'transparent'
}
console.log(!$q.dark.isActive, props.full, props.altStyle)
if(!$q.dark.isActive && props.full && props.altStyle)
{
	trackColor = 'light:white'
}
console.log(trackColor)
const angle = props.negative ? 360 * (1 - props.value / 100) : 0
const actualSize = computed(() => {
	return props.size ? props.size : "32px"
})
const actualImageSize = computed(() => {
	return props.imageSize ? props.imageSize : "22px"
})
</script>

<template>
	<q-circular-progress
		:angle="angle"
		show-value
		:value="value"
		:size="actualSize"
		:thickness="0.15"
		:color="actualColor"
		:track-color="trackColor"
	>
		<q-avatar :size="actualImageSize" v-if="image">
			<img :src="image" />
		</q-avatar>
		<q-icon
			:size="actualImageSize"
			v-if="icon"
			:name="resolveIcon(icon.name, icon.width, icon.height)"
		>
		</q-icon>
	</q-circular-progress>
</template>
