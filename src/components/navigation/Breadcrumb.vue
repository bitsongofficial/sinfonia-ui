<script setup lang="ts">
import { watchDebounced } from "@vueuse/core"
import { compact } from "lodash"
import { computed, onUnmounted, ref } from "vue"
import { RouterLink, useRoute, useRouter } from "vue-router"

const router = useRouter()
const route = useRoute()
const pageTitle = ref("")

const watcher = watchDebounced(
	() => router.currentRoute.value.meta,
	(meta) => {
		pageTitle.value = meta.title as string
	},
	{
		debounce: 250,
	}
)

const breadcrumb = computed(() => {
	const routes = router.currentRoute.value.matched
		.filter((el) => !el.meta.breadcrumbHide)
		.map((el) => ({
			label: route.name !== el.name ? el.meta.title : pageTitle.value,
			to: route.name !== el.name ? el.path : undefined,
		}))

	const parent = router.currentRoute.value.meta.parent as string

	const currentRoute = routes.pop()

	if (parent) {
		const mainRoute = [...router.options.routes].shift()

		if (mainRoute) {
			const parentRoute = mainRoute.children?.find((el) => el.name === parent)

			if (parentRoute) {
				routes.push({
					label: parentRoute.meta?.title as string,
					to: `/${parentRoute.path}`,
				})
			}
		}
	}

	return compact([...routes, currentRoute])
})

onUnmounted(() => {
	watcher()
})
</script>

<template>
	<div
		class="row items-center text-white fs-18 !leading-24 text-weight-medium text-capitalize"
	>
		<template v-for="(route, index) in breadcrumb">
			<span class="opacity-50 q-mr-12" v-if="index === 0">/</span>
			<RouterLink
				:to="route.to ?? ''"
				:class="{
					'no-pointer-events': !route.to,
				}"
			>
				{{ route.label }}
			</RouterLink>
			<span
				class="opacity-50 q-ml-12 q-mr-12"
				v-if="index < breadcrumb.length - 1"
			>
				/
			</span>
		</template>
	</div>
</template>
