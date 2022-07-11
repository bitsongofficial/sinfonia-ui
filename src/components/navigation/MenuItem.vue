<script setup lang="ts">
import { RouterLink } from "vue-router"
import IconButton from "../buttons/IconButton.vue"

const props = defineProps<{
	icon: { name: string; width: number; height: number }
	url: string
	isLink?: boolean
	disabled?: boolean
}>()

const width = props.icon.width ? props.icon.width : 20
const height = props.icon.height ? props.icon.height : 20
const url = props.url ? props.url : "/"
</script>
<template>
	<div class="menu-item">
		<RouterLink
			v-if="!isLink"
			:to="url"
			class="relative-position row items-center"
			:class="{ 'no-pointer-events': disabled }"
		>
			<IconButton
				:icon="icon.name"
				:width="width"
				:height="height"
				class="fs-20 min-s-50 fs-xs-24"
			></IconButton>
			<div class="absolute text-white gt-xs">
				<div class="fs-16 text-weight-medium">
					<slot></slot>
				</div>
			</div>
		</RouterLink>
		<a
			v-else
			:href="url"
			target="_BLANK"
			class="relative-position row items-center"
		>
			<IconButton
				:icon="icon.name"
				:width="width"
				:height="height"
				class="fs-20 min-s-50 fs-xs-24"
			></IconButton>
			<div class="absolute text-white gt-xs">
				<div class="fs-16 text-weight-medium">
					<slot></slot>
				</div>
			</div>
		</a>
	</div>
</template>
