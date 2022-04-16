<script setup lang="ts">
import { computed, ref } from "vue"
import Modal from "./Modal.vue"
import StandardButton from "../buttons/StandardButton.vue"
import { resolveIcon } from "@/common/resolvers"

const props = defineProps<{
	modelValue?: boolean
}>()

const emit = defineEmits<{
	(e: "update:modelValue", value: boolean): void
	(e: "submit", value: boolean): boolean
}>()

const model = computed({
	get(): any {
		return props.modelValue
	},
	set(value: any) {
		emit("update:modelValue", value)
	},
})

const checkboxModel = ref(false)

const submit = () => {
	if (checkboxModel.value) {
		emit("submit", checkboxModel.value)
	}
}

const content = `IMPORTANT DISCLAIMER: 

No part of the content and services that we provide on Sinfonia constitutes financial advice, legal advice or any other form of advice meant for your specific reliance for any purpose, nor any dealing in (or promotion of) securities for which a licence is required from any competent Authorities. 

Any use or reliance on Sinfonia content and services is solely at your own risk and discretion. 

You should conduct your own research, review, analyse and verify our content and services before relying on or using them. 

Trading is a risky activity that can lead to major losses, please therefore consult your financial advisor before making any decision. 

Moreover, we use Google Analytics to carry out statistical analysis of page use and page interactions to evaluate and improve Sinfonia. This is known as 'digital analytics'. 
For further information, you can send an email to legal@bitsong.io`
</script>

<template>
	<Modal v-model="model" no-esc-dismiss no-backdrop-dismiss no-route-dismiss>
		<div class="pt-10 full-height column no-wrap">
			<p class="fs-24 q-mb-40">Before you enter Sinfonia DEx</p>
			<div
				class="bg-white-5 rounded-10 relative-position q-mb-22 overflow-overlay max-h-360 grow-1"
			>
				<div class="q-py-30 q-px-30">
					<div class="fs-14 opacity-50">
						<p class="q-mb-20 white-space-break-spaces">{{ content }}</p>
					</div>
				</div>
				<div class="sticky-bottom rounded-10 text-overlay-gradient h-100 z-1"></div>
			</div>
			<div>
				<q-checkbox
					v-model="checkboxModel"
					label="I understand the risks and would like to proceed."
					class="fs-14 text-weight-regular q-mb-40"
				/>
			</div>
			<div class="flex justify-center">
				<StandardButton
					class="q-px-50 q-py-15"
					:disable="!checkboxModel"
					@click="submit"
				>
					<div class="flex">
						<p class="q-mr-36 text-uppercase">Proceed</p>
						<q-icon :name="resolveIcon('arrow-right', 14, 14)"></q-icon>
					</div>
				</StandardButton>
			</div>
		</div>
	</Modal>
</template>
