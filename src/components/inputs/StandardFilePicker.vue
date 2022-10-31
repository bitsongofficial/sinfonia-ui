<script setup lang="ts">
import vueFilePond from "vue-filepond"
import { FilePondFile } from "filepond"
import "filepond/dist/filepond.min.css"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css"
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"
import { toRef } from "vue"
import { useField } from "vee-validate"

const props = withDefaults(
	defineProps<{
		name: string
		fileTypes?: string
		placeholder?: string
		value?: FilePondFile[] | undefined
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
		value: undefined,
		alternative: false,
		placeholder: "0",
		fileTypes: "image/jpeg, image/png, image/webp",
		type: "text",
	}
)

const name = toRef(props, "name")

const emit = defineEmits<{
	(e: "update:modelValue", value: FilePondFile[] | undefined): void
}>()

const { value, errorMessage, meta, handleBlur, handleChange, setTouched } =
	useField(name, undefined, {
		initialValue: props.value,
	})

const updateModelValue = (e: FilePondFile[] | undefined) => {
	handleChange(e)
	emit("update:modelValue", value.value)

	if (e && e.length > 0) {
		setTouched(true)
	}
}

const FilePond = vueFilePond(
	FilePondPluginFileValidateType,
	FilePondPluginImagePreview
)
</script>

<template>
	<div>
		<file-pond
			:label-idle="placeholder"
			:accepted-file-types="fileTypes"
			v-model="value"
			@input="updateModelValue($event)"
			class="shadow-md light:shadow-10"
		/>
		<p
			class="fs-12 text-primary text-weight-medium min-h-fit q-mt-8"
			v-if="meta.touched && !meta.valid"
		>
			{{ errorMessage }}
		</p>
	</div>
</template>
