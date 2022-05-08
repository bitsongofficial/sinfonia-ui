<script lang="ts" setup>
import { LockableDurationWithApr } from "@/types"
import { computed } from "vue"
import { percentage, equalZero } from "@/common/numbers"

const props = withDefaults(
	defineProps<{
		modelValue?: LockableDurationWithApr
		value: LockableDurationWithApr
		disabled?: boolean
	}>(),
	{
		disabled: undefined,
	}
)

const emit = defineEmits<{
	(e: "update:modelValue", value: LockableDurationWithApr | undefined): void
}>()

const model = computed<LockableDurationWithApr | undefined>({
	get() {
		return props.modelValue
	},
	set(value) {
		emit("update:modelValue", value)
	},
})

const disabled = computed(() => {
	if (props.disabled !== undefined) {
		return props.disabled
	}

	return equalZero(props.value.totalApr)
})
</script>

<template>
	<div
		@click="!disabled ? (model = value) : undefined"
		class="rounded-20 q-py-16 q-px-16 flex justify-center items-center full-height cursor-pointer"
		:class="{
			'bg-gradient light:text-white no-border':
				model && value.duration === model.duration,
			'border-primary-darker light:border-gradient-primary light:border-none hover:bg-white-5':
				model && value.duration !== model.duration && !disabled,
			'bg-primary-darker-half light:bg-white border-transparent cursor-not-allowed':
				disabled,
		}"
	>
		<div>
			<p
				class="fs-18 q-mb-8 text-center"
				:class="{
					'opacity-10 light:opacity-50': disabled,
				}"
			>
				{{ value.readableDuration }}
			</p>
			<p
				class="total-apr fs-15 text-center overflow-hidden text-overflow-ellipsis text-no-wrap text-dark"
				:class="{
					'text-primary-dark-700 light:text-white':
						model && value.duration === model.duration && !disabled,
					'opacity-10 text-dark light:opacity-50': disabled,
				}"
			>
				{{ percentage(value.totalApr) }} %
			</p>
		</div>
	</div>
</template>
