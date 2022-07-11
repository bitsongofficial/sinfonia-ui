<script setup lang="ts">
import { resolveIcon } from "@/common/resolvers"
import MenuItem from "@/components/navigation/MenuItem.vue"
import { menuItems } from "@/configs/routes"
</script>
<template>
	<div
		class="column min-width justify-around items-center bg-rounded-translucent q-px-20 q-py-28"
	>
		<MenuItem
			v-for="(menuItem, i) in menuItems"
			:key="menuItem.label"
			:name="menuItem.label"
			:icon="menuItem.icon"
			:url="menuItem.path"
			:is-link="menuItem.isLink"
			:class="[
				(i < menuItems.length - 1 ? 'q-mb-lg' : '') + '',
				{ 'cursor-not-allowed': menuItem.disabled },
			]"
			:disabled="menuItem.disabled"
		>
			<template v-if="menuItem.isLink">
				<div class="flex no-wrap items-center">
					<p class="q-mr-8">{{ menuItem.label }}</p>
					<q-icon :name="resolveIcon('external', 10, 10)" class="fs-10"></q-icon>
				</div>
			</template>
			<template v-else>
				{{ menuItem.label }}
			</template>
		</MenuItem>
	</div>
</template>
