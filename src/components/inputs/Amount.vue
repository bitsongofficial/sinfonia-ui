<script setup lang="ts">
import { computed, toRef } from "vue"
import { gtnZero } from "@/common/numbers"
import { TokenWithAddress } from "@/types"
import { useMaxAmount } from "@/hooks/useMaxAmount"
import { useField } from "vee-validate"
import SmallButton from "@/components/buttons/SmallButton.vue"

const props = withDefaults(
	defineProps<{
		name: string
		placeholder?: string
		value?: string
		token?: TokenWithAddress
		max?: string
	}>(),
	{
		value: "",
		placeholder: "0",
	}
)

const name = toRef(props, "name")

const available = toRef(props, "max")

const emit = defineEmits<{
	(e: "update:modelValue", value: string): void
	(e: "maxClick", value: string): void
}>()

const network = computed(() => {
	if (props.token) {
		return props.token
	}
})

const { getMaxAmount } = useMaxAmount(available, network)

const availableGtnZero = computed(() => gtnZero(available.value ?? "0"))

const { value, errorMessage, handleBlur, handleChange, setValue, meta } =
	useField(name, undefined, {
		initialValue: props.value,
	})

const updateModelValue = (e: unknown) => {
	handleChange(e)
	emit("update:modelValue", value.value)
}

const setMaxAmount = () => {
	let amount = "0"

	if (network.value) {
		amount = getMaxAmount()
	} else if (props.max) {
		amount = props.max
	}

	setValue(amount)
	emit("maxClick", amount)
}
</script>

<template>
	<div>
		<div
			class="relative-position flex justify-between q-px-20 q-py-10 no-wrap items-center q-mb-8"
		>
			<div
				:class="
					'absolute-full rounded-20 bg-primary-darker light:bg-white opacity-50' +
					(!meta.valid && meta.initialValue !== value
						? ' border-primary'
						: ' border-transparent')
				"
			></div>
			<q-input
				borderless
				v-model="value"
				type="text"
				class="fs-32 q-mb-0 text-white"
				no-error-icon
				hide-bottom-space
				:error="!meta.valid"
				:placeholder="placeholder"
				@update:model-value="updateModelValue($event)"
				@blur="handleBlur"
			/>
			<div v-if="max">
				<SmallButton
					label="max"
					xs
					@click="setMaxAmount"
					:disable="!availableGtnZero"
				/>
			</div>
		</div>
		<p
			class="fs-12 text-primary text-weight-medium min-h-fit"
			:class="{
				invisible: !(!meta.valid && meta.initialValue !== value),
			}"
		>
			{{ errorMessage }}
		</p>
	</div>
</template>
