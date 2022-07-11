<script lang="ts" setup>
import { LockableDurationWithApr } from "@/types"
import { computed, toRef } from "vue"
import { percentage } from "@/common/numbers"
import { useField } from "vee-validate"

const props = defineProps<{
	name: string
	defaultValue: LockableDurationWithApr
}>()

const name = toRef(props, "name")
const defaultValue = toRef(props, "defaultValue")

const emit = defineEmits<{
	(e: "update:modelValue", value: LockableDurationWithApr | undefined): void
}>()

const { value, handleChange, uncheckedValue, setValue, meta } = useField(
	name,
	undefined,
	{
		initialValue: defaultValue.value,
		type: "radio",
	}
)

const updateModelValue = () => {
	handleChange(defaultValue.value)
	emit("update:modelValue", defaultValue.value)
}

const isDefaultDuration = computed(() => {
	if (value.value) {
		return value.value.duration === defaultValue.value.duration
	}

	return false
})
</script>

<template>
	<div
		@click="meta.valid ? updateModelValue() : undefined"
		class="rounded-20 q-py-16 q-px-16 flex justify-center items-center full-height cursor-pointer"
		:class="{
			'bg-gradient light:text-white no-border': isDefaultDuration,
			'border-primary-darker light:border-gradient-primary light:border-none hover:bg-white-5':
				meta.valid,
			'bg-primary-darker-half light:bg-white border-transparent cursor-not-allowed':
				!meta.valid,
		}"
	>
		<div>
			<p
				class="fs-18 q-mb-8 text-center"
				:class="{
					'opacity-10 light:opacity-50': !meta.valid,
				}"
			>
				{{ defaultValue.readableDuration }}
			</p>
			<p
				class="total-apr fs-15 text-center overflow-hidden text-overflow-ellipsis text-no-wrap text-dark"
				:class="{
					'text-primary-dark-700 light:text-white': isDefaultDuration && meta.valid,
					'opacity-10 text-dark light:opacity-50': !meta.valid,
				}"
			>
				{{ percentage(defaultValue.totalApr) }} %
			</p>
		</div>
	</div>
</template>
