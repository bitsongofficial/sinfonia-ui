<script setup lang="ts">
import { resolveIcon } from "@/common/resolvers"
import { TokenBalance } from "@/types"
import { computed, ref, watch, onUnmounted } from "vue"
import CoinSelectSelected from "./CoinSelectSelected.vue"
import CoinSelectMenu from "./CoinSelectMenu.vue"

const openMenu = ref(false)

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

const select = ref<any>(null)

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
	<div class="position-relative w-full">
		<div
			class="w-full cursor-pointer position-relative z-1"
			@click="openMenu = !openMenu"
			:class="{
				'no-pointer-events z-30': openMenu,
			}"
		>
			<q-select
				v-model="value"
				:options="options"
				:dropdown-icon="resolveIcon('dropdown', 11, 7)"
				borderless
				class="coin-select text-white w-full bg-primary-dark-500 light:bg-primary-dark-500-5 rounded-30 q-px-20 no-pointer-events"
				:class="{
					'light:bg-white': openMenu,
				}"
				input-class="q-px-20 q-py-20"
				ref="select"
			>
				<template v-slot:selected-item="{ opt }">
					<CoinSelectSelected :coin="opt"></CoinSelectSelected>
				</template>
			</q-select>
		</div>

		<CoinSelectMenu
			v-model="openMenu"
			v-model:option="value"
			:options="options"
		/>
	</div>
</template>

<style lang="scss" scoped>
.coin-select {
	&:deep(.q-field__marginal) {
		color: inherit;
	}

	@media screen and (max-width: $breakpoint-xs) {
		background: none !important;
		padding: 0 !important;

		&:deep(.q-field__control),
		&:deep(.q-field__native) {
			min-height: 24px;
			height: 24px;
			padding: 0;
		}
	}
}
</style>
