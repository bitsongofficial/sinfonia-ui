<script setup lang="ts">
import ModalWithClose from "./ModalWithClose.vue"
import Swapper from "../inputs/Swapper.vue"
import { computed } from "vue"
import { TokenBalance } from "@/types"

const props = defineProps<{
	coin1: TokenBalance | null
	coin2: TokenBalance | null
}>()

const emit = defineEmits<{
	(e: "update:coin1", value: TokenBalance | null): void
	(e: "update:coin2", value: TokenBalance | null): void
}>()

const coin1Wrapper = computed<TokenBalance | null>({
	get() {
		return props.coin1
	},
	set(value) {
		emit("update:coin1", value)
	},
})

const coin2Wrapper = computed<TokenBalance | null>({
	get() {
		return props.coin2
	},
	set(value) {
		emit("update:coin2", value)
	},
})
</script>

<template>
	<ModalWithClose title="Swap Tokens" class="bigger-modal">
		<Swapper
			default-from="BTSG"
			default-to="CLAY"
			v-model:coin1="coin1Wrapper"
			v-model:coin2="coin2Wrapper"
		></Swapper>
	</ModalWithClose>
</template>
