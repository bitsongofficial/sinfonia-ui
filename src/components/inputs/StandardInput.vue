<script setup lang="ts">
import { toRef } from "vue"
import { useField } from "vee-validate"

const props = withDefaults(
	defineProps<{
		name: string
		placeholder?: string
		value?: string
		alternative?: boolean
		type?:
			| "number"
			| "search"
			| "textarea"
			| "time"
			| "text"
			| "password"
			| "email"
			| "tel"
			| "file"
			| "url"
			| "date"
			| undefined
	}>(),
	{
		value: "",
		alternative: false,
		placeholder: "0",
		type: "text",
	}
)

const name = toRef(props, "name")

const emit = defineEmits<{
	(e: "update:modelValue", value: string): void
	(e: "maxClick", value: string): void
}>()

const { value, errorMessage, handleBlur, handleChange, meta } = useField(
	name,
	undefined,
	{
		initialValue: props.value,
	}
)

const updateModelValue = (e: unknown) => {
	handleChange(e)
	emit("update:modelValue", value.value)
}

const defaultClass = props.alternative
	? `absolute-full bg-white rounded-20 opacity-5 light:opacity-100 shadow-md light:shadow-10`
	: "absolute-full rounded-20 bg-primary-darker light:bg-white opacity-50"
</script>

<template>
	<div>
		<div
			class="relative-position flex justify-between q-px-20 q-py-10 no-wrap items-center q-mb-8"
		>
			<div
				:class="
					defaultClass +
					(!meta.valid && meta.initialValue !== value
						? ' border-primary'
						: ' border-transparent')
				"
			></div>
			<q-input
				borderless
				v-model="value"
				:type="type"
				class="fs-16 q-mb-0 text-white full-width"
				no-error-icon
				hide-bottom-space
				:error="!meta.valid"
				:placeholder="placeholder"
				@update:model-value="updateModelValue($event)"
				@blur="handleBlur"
			>
				<template v-for="(_, slot, index) of $slots" v-slot:[slot]="scope">
					<slot :name="slot" v-bind="scope" :key="index"></slot>
				</template>
			</q-input>
		</div>
		<p class="fs-12 text-primary text-weight-medium min-h-fit">
			{{ errorMessage }}
		</p>
	</div>
</template>
