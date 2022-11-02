<script setup lang="ts">
import { resolveIcon } from "@/common/resolvers"
import { CollectionLinkRequest } from "@/types"

defineProps<{
	externalLinks: {
		[key: string]: string
	}
}>()

const iconName = (key: string | number) => {
	return resolveIcon(key.toString().toLocaleLowerCase(), 30, 30)
}
</script>

<template>
	<div class="flex">
		<div v-for="(url, key) in externalLinks" class="q-mr-24">
			<a
				:href="url"
				:key="key"
				target="_BLANK"
				class="fs-24 opacity-30 hover:opacity-100"
			>
				<div class="text-white light:text-gray-600">
					<q-icon :name="iconName(key)"></q-icon>
				</div>
			</a>
		</div>
	</div>
</template>
