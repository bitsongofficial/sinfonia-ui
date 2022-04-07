<script setup lang="ts">
import { resolveIcon } from "@/common/resolvers"
import { FantokenSocialLink } from "@/types"

defineProps<{
	socials: FantokenSocialLink[]
}>()
</script>

<template>
	<div class="flex">
		<div v-for="social in socials" class="q-mr-24">
			<a
				:href="social.url"
				:key="social.type"
				target="_BLANK"
				class="fs-24 opacity-30 hover:opacity-100"
			>
				<div class="text-white light:text-gray-600">
					<q-icon :name="resolveIcon(social.type, 30, 30)"></q-icon>
				</div>
			</a>
		</div>
	</div>
</template>
