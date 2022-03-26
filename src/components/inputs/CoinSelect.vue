<script setup lang="ts">
import { newUserCoin } from "@/common/mockups"
import { balancedCurrency } from "@/common/numbers"
import { resolveIcon } from "@/common/resolvers"
import { UserCoinInfo } from "@/types/user"
import { computed, ref } from "vue"
import CoinSelectItem from "./CoinSelectItem.vue"
import CoinSelectSelected from "./CoinSelectSelected.vue"

const props = defineProps<{
	modelValue: UserCoinInfo | null
}>()
const emit = defineEmits<{
	(e: "update:modelValue", value: UserCoinInfo | null): void
}>()
const options = [newUserCoin("BTSG", "Bitsong"), newUserCoin("ADAM", "Adam")]
const value = computed({
	get(): UserCoinInfo | null {
		return props.modelValue
	},
	set(value: UserCoinInfo | null) {
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
