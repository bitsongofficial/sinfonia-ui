<script setup lang="ts">
	import { resolveIcon } from '@/common/resolvers'
	import { shortenMiddle } from '@/common/strings'
	import { TokenWithAddress } from '@/types'
	import { computed } from 'vue'

	const props = defineProps<{
		addresses: TokenWithAddress[],
		title?: string,
		modelValue?: TokenWithAddress
	}>()

	const emit = defineEmits<{
		(e: 'update:modelValue', value?: TokenWithAddress): void,
	}>()

	const value = computed<TokenWithAddress | undefined>({
		get() {
			return props.modelValue
		},
		set(value) {
			emit('update:modelValue', value)
		}
	})
</script>

<template>
	<div class="rounded-20 select-border">
		<q-select
			v-model="value"
			:options="addresses"
			:dropdown-icon="resolveIcon('dropdown', 11, 7)"
			borderless
			class="text-white q-px-select-20"
			input-class="q-px-20 q-py-20"
			popup-content-class="rounded-20 q-px-10 q-py-0"
			:menu-offset="[0, 8]"
		>
			<template v-slot:option="{itemProps, opt}">
				<div v-bind="itemProps" class="text-white q-py-16 q-px-10 cursor-pointer">
					<p class="fs-14 q-mb-2">
						{{ opt.name }}
					</p>
				</div>
			</template>
			<template v-slot:selected-item="{ opt }">
				<div class="q-py-15">
					<p class="fs-10 text-uppercase font-weight-medium opacity-40 q-mb-8">
						{{ title }}
					</p>
					<p class="fs-14 q-mb-2">
						{{ opt.name }}
					</p>
					<p class="fs-12 font-weight-medium opacity-40" v-if="opt.address">
						{{ shortenMiddle(opt.address, 20) }}
					</p>
				</div>
			</template>
		</q-select>
	</div>
</template>