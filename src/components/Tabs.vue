<script setup lang="ts">
import { resolveIcon } from "@/common/resolvers"
import { ref } from "vue"
import InformativeTooltip from "./tooltips/InformativeTooltip.vue"

const props = defineProps<{
	options: {
		name?: string
		label?: string
		tooltip?: string
		icon?: { name: string; width: number; height: number }
		url?: string
	}[]
}>()

const firstValidOption = props.options.find(
	(o) => o.icon == undefined && o.url == undefined
)

const tab = ref(firstValidOption ? firstValidOption.name : null)

const isTab = (name): boolean => {
	return (
		props.options.find((o) => o.name != undefined && o.name == name) != undefined
	)
}
</script>

<template>
	<div class="q-mb-26 q-px-60 max-w-full overflow-auto">
		<q-tabs
			v-model="tab"
			dense
			:active-color="$q.dark.isActive ? 'primary' : 'gradient'"
			indicator-color="primary"
			align="justify"
			narrow-indicator
			class="w-max !transition-none"
		>
			<template v-for="option in options">
				<q-tab
					v-if="option.name && !option.url"
					:name="option.name"
					:label="option.label"
					class="fs-18 opacity-40 w-fit q-mr-50 !flex-0 q-px-0 !transition-none"
					content-class="q-py-0 !transition-none"
				/>
				<a
					v-if="option.url"
					:href="option.url"
					target="_BLANK"
					class="fs-18 opacity-40 w-fit q-mr-50 !flex-0 q-px-0 hover:opacity-100 flex items-center no-wrap"
				>
					<div class="q-mr-8 text-white">
						{{ option.label }}
					</div>
					<q-icon :name="resolveIcon('external', 10, 10)" size="11px"></q-icon>
				</a>
				<q-icon
					v-if="option.icon"
					:name="resolveIcon(option.icon.name, option.icon.width, option.icon.height)"
					class="opacity-40 w-fit q-mr-50 !flex-0 q-px-0 hover:opacity-100"
					content-class="q-py-0"
				>
					<InformativeTooltip
						anchor="bottom right"
						self="top left"
						:offset="[17, -40]"
					>
						<p>
							{{ option.tooltip }}
						</p>
					</InformativeTooltip>
				</q-icon>
			</template>
		</q-tabs>
	</div>
	<q-tab-panels
		v-model="tab"
		animated
		class="bg-white-5 rounded-30 q-py-52 q-px-60 q-px-xs-20"
	>
		<template v-for="(_, slot) of $slots">
			<template v-if="isTab(slot)">
				<q-tab-panel :name="slot">
					<slot :name="slot"></slot>
				</q-tab-panel>
			</template>
			<template v-else> </template>
		</template>
	</q-tab-panels>
</template>
