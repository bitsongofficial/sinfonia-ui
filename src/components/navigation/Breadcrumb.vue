<script setup lang="ts">
import { compact } from "lodash"
import { computed } from "vue"
import { RouterLink, useRoute, useRouter } from "vue-router"
import useSettings from "@/store/settings"

const settingsStore = useSettings()
const router = useRouter()
const route = useRoute()

const breadcrumb = computed(() => {
	const routes = router.currentRoute.value.matched
		.filter((el) => !el.meta.breadcrumbHide)
		.map((el, index) => {
			let label = el.meta.title
			let to: string | undefined = el.path

			if (route.name === el.name) {
				to = undefined

				if (index > 0) {
					label = settingsStore.breadcrumbPageTitle
				}
			}

			return {
				label,
				to,
			}
		})

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

	return compact([...routes, ...settingsStore.breadcrumbPrepend, currentRoute])
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
