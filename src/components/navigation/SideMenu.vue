<script setup lang="ts">
import { resolveIcon } from "@/common/resolvers"
import { externalWebsites } from "@/configs/config"
import MenuItem from "@/components/navigation/MenuItem.vue"
import { menuItems } from "@/configs/routes";
</script>
<template>
	<div
		class="column row-xs min-width justify-around items-center bg-rounded-translucent bg-xs-white q-px-20 q-py-28 q-py-xs-20 q-px-xs-28"
	>
		<MenuItem
			v-for="menuItem, i in menuItems"
			:key="menuItem.label"
			:name="menuItem.label"
			:icon="menuItem.icon"
			:url="menuItem.path"
			:is-link="menuItem.isLink"
			:class="(i < menuItems.length-1 ? 'q-mb-lg q-mb-xs-0' : '') + 'q-mr-xs-24'"
		>
			<template v-if="menuItem.isLink">
				<div class="flex no-wrap items-center">
					<p class="q-mr-8">{{menuItem.label}}</p>
					<q-icon :name="resolveIcon('external', 10, 10)" class="fs-10"></q-icon>
				</div>
			</template>
			<template v-else>
				{{menuItem.label}}
			</template>
		</MenuItem>
	</div>
</template>
