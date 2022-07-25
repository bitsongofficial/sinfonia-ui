<script setup lang="ts">
import { resolveIcon } from "@/common/resolvers"
import { computed, ref, useSlots } from "vue"
import InformativeTooltip from "./tooltips/InformativeTooltip.vue"

const props = withDefaults(
	defineProps<{
		modelValue?: any
		options: {
			name?: string
			label?: string
			tooltip?: string
			icon?: { name: string; width: number; height: number }
			url?: string
		}[]
		border?: boolean
	}>(),
	{
		border: false,
	}
)

const emit = defineEmits<{
	(e: "update:modelValue", value: any): void
}>()

const slots = useSlots()

const firstValidOption = props.options.find(
	(o) => o.icon == undefined && o.url == undefined
)

const tabInternal = ref(firstValidOption ? firstValidOption.name : null)

const tab = computed({
	get: () => {
		if (props.modelValue) {
			return props.modelValue
		}

		return tabInternal.value
	},
	set: (value) => {
		if (props.modelValue) {
			emit("update:modelValue", value)
		} else {
			tabInternal.value = value
		}
	},
})

const isTab = (name): boolean => {
	return (
		props.options.find((o) => o.name != undefined && o.name == name) != undefined
	)
}

const hasSlots = computed(() => Object.keys(slots).length > 0)
</script>

<template>
	<div
		class="max-w-full overflow-auto"
		:class="{
			'q-mb-26 q-px-60': !border,
		}"
	>
		<q-tabs
			v-model="tab"
			dense
			active-color="white"
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
					class="w-fit !flex-0 q-px-0 !transition-none"
					content-class="q-py-0 !transition-none"
					:class="{
						'fs-18 q-mr-50 opacity-40': !border,
						'fs-21 q-mr-36 opacity-30': border,
						border,
					}"
				/>
				<a
					v-if="option.url"
					:href="option.url"
					target="_BLANK"
					class="fs-18 opacity-40 w-fit q-mr-50 !flex-0 q-px-0 hover:opacity-100"
				>
					<div class="text-white flex items-center no-wrap">
						<div class="q-mr-8 text-white">
							{{ option.label }}
						</div>
						<q-icon :name="resolveIcon('external', 10, 10)" size="11px"></q-icon>
					</div>
				</a>
				<q-icon
					v-if="option.icon"
					:name="
						resolveIcon(option.icon.name, option.icon.width, option.icon.height)
					"
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
		class="bg-white-5 rounded-30 q-py-52 full-width"
		v-if="hasSlots"
	>
		<template v-for="(_, slot) of $slots">
			<template v-if="isTab(slot)">
				<q-tab-panel :name="slot" class="q-px-40 q-px-xs-20">
					<slot :name="slot"></slot>
				</q-tab-panel>
			</template>
			<template v-else> </template>
		</template>
	</q-tab-panels>
</template>
