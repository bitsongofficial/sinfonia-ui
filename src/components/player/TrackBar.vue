<script setup lang="ts">
import { computed, ref } from "vue"
import { formatDurationWithSeparator } from "@/common"

const props = defineProps<{
	modelValue: number
	min: number
	max: number
}>()

const emit = defineEmits<{
	(e: "update:modelValue", value: number): void
}>()

const panPhase = ref<"start" | "end">("end")
const internalValue = ref(0)

const value = computed<number>({
	get() {
		return props.modelValue
	},
	set(value) {
		internalValue.value = value
	},
})

const currentValue = computed(() => {
	if (panPhase.value === "start") {
		return internalValue.value
	}

	return value.value
})
const endTimeStr = computed(() => formatDurationWithSeparator(props.max))
const startTimeStr = computed(() =>
	formatDurationWithSeparator(currentValue.value)
)

const change = () => {
	emit("update:modelValue", internalValue.value)
}

const pan = (value: "start" | "end") => {
	panPhase.value = value
}
</script>

<template>
	<div class="row items-center grid-gap-8 no-wrap">
		<span class="text-white fs-11 text-right min-w-40 q-mr-4">{{
			startTimeStr
		}}</span>
		<q-slider
			v-model="value"
			@change="change"
			@pan="pan"
			class="gradient-slider rounded"
			:min="min"
			:max="max"
		/>
		<span class="text-white fs-11 text-left min-w-40 q-ml-4">{{
			endTimeStr
		}}</span>
	</div>
</template>
