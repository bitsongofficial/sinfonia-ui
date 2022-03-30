<script setup lang="ts">
import { resolveIcon } from "@/common/resolvers"
import { TokenBalance } from "@/types"
import { computed, ref, watch, onUnmounted } from "vue"
import CoinSelectItem from "./CoinSelectItem.vue"
import CoinSelectSelected from "./CoinSelectSelected.vue"

const props = defineProps<{
	modelValue: TokenBalance | null
	options: TokenBalance[]
}>()

const emit = defineEmits<{
	(e: "update:modelValue", value: TokenBalance | null): void
}>()

const value = computed<TokenBalance | null>({
	get() {
		return props.modelValue
	},
	set(value) {
		emit("update:modelValue", value)
	},
})

const width = ref(0)

const select = ref<any>(null)

const setWidth = () => {
	if (select.value) {
		console.log(select.value)
		width.value = select.value.$el.offsetWidth
	}
}

const popupStyle = computed(() => {
	return { width: width.value + "px" }
})

const optionsWatcher = watch(
	() => props.options,
	(options) => {
		if (value.value) {
			const newValue = options.find(
				(option) => option.symbol === value.value?.symbol
			)

			if (newValue) {
				value.value = newValue
			}
		}
	}
)

onUnmounted(() => {
	optionsWatcher()
})
</script>

<template>
	<q-select
		v-model="value"
		:options="options"
		:dropdown-icon="resolveIcon('dropdown', 11, 7)"
		borderless
		class="text-white q-px-select-20"
		input-class="q-px-20 q-py-20"
		popup-content-class="rounded-20 q-px-10 q-py-0"
		:menu-offset="[0, 30]"
		ref="select"
		@popup-show="setWidth"
		:popup-content-style="popupStyle"
	>
		<template v-slot:option="{ itemProps, opt }">
			<CoinSelectItem
				v-bind="itemProps"
				:coin="opt"
				class="cursor-pointer"
			></CoinSelectItem>
		</template>
		<template v-slot:selected-item="{ opt }">
			<CoinSelectSelected :coin="opt"></CoinSelectSelected>
		</template>
	</q-select>
</template>
