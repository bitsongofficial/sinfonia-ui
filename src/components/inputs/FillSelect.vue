<script setup lang="ts">
import { resolveIcon } from "@/common/resolvers"
import { Option } from "@/types"
import { computed, toRef } from "vue"
import { useField } from "vee-validate"

const props = withDefaults(
	defineProps<{
		name: string
		value?: unknown
		options?: string[] | Option[]
		light?: boolean
		large?: boolean
	}>(),
	{
		light: false,
		large: false,
	}
)

const name = toRef(props, "name")

const emit = defineEmits<{
	(e: "update:modelValue", value: any): void
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
</script>

<template>
	<div>
		<q-select
			v-model="value"
			:options="options"
			class="fill-select text-white text-capitalize fs-14 text-weight-medium"
			:class="{
				'fill-select-light': light,
				large,
			}"
			popup-content-class="text-white alternative"
			rounded
			map-options
			emit-value
			no-error-icon
			standout="!bg-white-10 !text-white"
			:dark="false"
			:dropdown-icon="resolveIcon('dropdown', 11, 7)"
			:error="!meta.valid && errorMessage !== undefined"
			behavior="menu"
			@update:model-value="updateModelValue($event)"
			@blur="handleBlur"
		>
			<template v-slot:selected-item="scope">
				<div class="flex row items-center">
					<q-icon
						v-if="scope.opt.icon"
						class="fs-24 q-mr-8"
						:name="
							resolveIcon(
								scope.opt.icon.name,
								scope.opt.icon.width ?? 24,
								scope.opt.icon.height ?? 24
							)
						"
					/>

					<q-item-label class="fs-14">{{ scope.opt.label }}</q-item-label>
				</div>
			</template>
			<template v-slot:option="scope">
				<q-item v-bind="scope.itemProps">
					<div class="flex row items-center">
						<q-icon
							v-if="scope.opt.icon"
							class="fs-24 q-mr-8"
							:name="
								resolveIcon(
									scope.opt.icon.name,
									scope.opt.icon.width ?? 24,
									scope.opt.icon.height ?? 24
								)
							"
						/>

						<q-item-label class="fs-14">{{ scope.opt.label }}</q-item-label>
					</div>
				</q-item>
			</template>
		</q-select>
		<p class="fs-12 text-primary text-weight-medium min-h-fit">
			{{ errorMessage }}
		</p>
	</div>
</template>

<style lang="scss" scoped>
.fill-select:deep(.q-field__control) {
	min-height: 42px;
	height: 42px;
	padding-left: 14px;
	padding-right: 14px;
	box-shadow: none;
	background: transparentize($color: $white, $amount: 0.9);
}

.fill-select.large:deep(.q-field__control) {
	min-height: 52px;
	height: 52px;
}

.fill-select.fill-select-light:deep(.q-field__control) {
	background: transparentize($color: $white, $amount: 0.95);
}

.fill-select:deep(.q-field__control):before {
	opacity: 0 !important;
}

.fill-select:deep(.q-field__marginal) {
	height: auto;
	color: inherit;
}

.fill-select:deep(.q-field__native) {
	min-height: 42px;
	color: inherit;
}

.fill-select.large:deep(.q-field__native) {
	min-height: 52px;
	color: inherit;
}

body.body--light {
	.fill-select:deep(.q-field__control) {
		background: $white !important;
	}
}
</style>
