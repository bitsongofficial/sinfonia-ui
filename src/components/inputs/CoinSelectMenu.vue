<script lang="ts" setup>
import { ref, getCurrentInstance, onMounted, RendererNode, computed } from "vue"
import { onClickOutside, useElementBounding } from "@vueuse/core"
import Title from "../typography/Title.vue"

const menu = ref<HTMLDivElement>()
const selectParent = ref<HTMLDivElement>()

const { left, width } = useElementBounding(selectParent)

const props = defineProps<{
	modelValue: boolean
}>()

const emit = defineEmits<{
	(e: "update:modelValue", value: boolean): void
}>()

onClickOutside(menu, () => {
	if (props.modelValue) {
		emit("update:modelValue", false)
	}
})

onMounted(() => {
	const element = getCurrentInstance()?.parent?.vnode.el

	if (element) {
		selectParent.value = element as HTMLDivElement
	}
})

const menuPosition = computed(() => ({
	left: `${left.value}px`,
	bottom: "76px",
	transform: `translate(${width.value + 82}px, 0)`,
}))
</script>

<template>
	<Teleport to="body">
		<div
			class="backdrop"
			:class="{
				open: modelValue,
			}"
		>
			<p class="text-white">{{ left }} - {{ width }}</p>
		</div>
		<div
			ref="menu"
			class="coin-select-menu"
			:class="{
				open: modelValue,
			}"
			:style="menuPosition"
		>
			<Title :font-size="18" class="q-mb-26">Select Token</Title>
		</div>
	</Teleport>
</template>

<style lang="scss" scroped>
.coin-select-menu {
	background: rgba(122, 110, 124, 0.1);
	box-shadow: 0px 0px 20px rgb(20 20 46 / 20%);
	backdrop-filter: blur(60px);
	border-radius: 20px;
	width: 355px;
	height: 580px;
	position: fixed;
	opacity: 0;
	transition: opacity 250ms ease-in-out;
	pointer-events: none;
	z-index: 20;
	padding-left: 20px;
	padding-right: 20px;
	padding-top: 38px;

	&.open {
		opacity: 1;
		pointer-events: all;
	}
}

.backdrop {
	position: fixed;
	z-index: 11;
	width: 100%;
	height: 100%;
	background: transparentize($color: $primary-dark-400, $amount: 0.2);
	top: 0;
	left: 0;
	opacity: 0;
	transition: opacity 250ms ease-in-out;
	pointer-events: none;

	&.open {
		opacity: 1;
		pointer-events: all;
	}
}
</style>
