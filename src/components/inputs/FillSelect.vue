<script setup lang="ts">
import { resolveIcon } from "@/common/resolvers"
import { Option } from "@/types"
import { computed } from "vue"

const props = withDefaults(
	defineProps<{
		modelValue?: any
		options?: string[] | Option[]
		light?: boolean
	}>(),
	{
		light: false,
	}
)

const emit = defineEmits<{
	(e: "update:modelValue", value: any): void
}>()

const model = computed({
	get(): any {
		return props.modelValue
	},
	set(value: any) {
		emit("update:modelValue", value)
	},
})
</script>

<template>
	<q-select
		v-model="model"
		:options="options"
		class="fill-select text-white text-capitalize fs-14 text-weight-medium"
		:class="{
			'fill-select-light': light,
		}"
		popup-content-class="text-white alternative"
		rounded
		map-options
		emit-value
		standout="!bg-white-10 !text-white"
		:dark="false"
		:dropdown-icon="resolveIcon('dropdown', 11, 7)"
		behavior="menu"
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

body.body--light {
	.fill-select:deep(.q-field__control) {
		background: $white !important;
	}
}
</style>
