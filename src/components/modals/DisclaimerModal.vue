<script setup lang="ts">
import { computed } from "vue"
import Modal from "./Modal.vue"
import StandardButton from "../buttons/StandardButton.vue"
import { resolveIcon } from "@/common/resolvers"

const props = defineProps<{
	modelValue?: any
	checkbox?: boolean
}>()
const emit = defineEmits<{
	(e: "update:modelValue", value: any): void
	(e: "update:checkbox", value: boolean): boolean
}>()
const model = computed({
	get(): any {
		return props.modelValue
	},
	set(value: any) {
		emit("update:modelValue", value)
	},
})
const checkboxModel = computed({
	get(): any {
		return props.checkbox
	},
	set(value: boolean) {
		emit("update:checkbox", value)
	},
})
</script>

<template>
	<Modal v-model="model" no-esc-dismiss no-backdrop-dismiss no-route-dismiss>
		<div class="pt-10 full-height column no-wrap">
			<p class="fs-24 q-mb-40">Before you enter Sinfonia DEX</p>
			<div
				class="bg-white-5 rounded-10 relative-position q-mb-22 overflow-auto max-h-360 grow-1"
			>
				<div class="q-py-30 q-px-30">
					<div class="fs-12 opacity-50">
						<p class="q-mb-20">
							Osmosis is a decentralized peer-to-peer blockchain that people can use to
							create liquidity and trade IBC enabled tokens. The Osmosis blockchain is
							made up of free, public, and open-source software. Your use of Osmosis
							involves various risks, including, but not limited, to losses while
							digital assets are being supplied to Osmosis pools and losses due to the
							fluctuation of prices of tokens in a trading pair or liquidity pool,
							including Impermanence Loss. Before using any pool on the Osmosis
							blockchain, you should review the relevant documentation to make sure you
							understand how Osmosis works, and the pool you use on Osmosis works.
						</p>
						<p>
							Additionally, just as you can access email protocols, such as SMTP,
							through multiple email clients, you can access pools on Osmosis through
							several web or mobile interfaces. You are responsible for doing your own
							diligence on those interfaces to understand the fees and risks they
							present.
						</p>
						<p>
							Additionally, just as you can access email protocols, such as SMTP,
							through multiple email clients, you can access pools on Osmosis through
							several web or mobile interfaces. You are responsible for doing your own
							diligence on those interfaces to understand the fees and risks they
							present.
						</p>
						<p>
							Additionally, just as you can access email protocols, such as SMTP,
							through multiple email clients, you can access pools on Osmosis through
							several web or mobile interfaces. You are responsible for doing your own
							diligence on those interfaces to understand the fees and risks they
							present.
						</p>
					</div>
				</div>
				<div class="sticky-bottom rounded-10 text-overlay-gradient h-100 z-1"></div>
			</div>
			<div>
				<q-checkbox
					v-model="checkboxModel"
					label="I understand the risks and would like to proceed."
					class="fs-12 font-weight-regular q-mb-40"
				/>
			</div>
			<div class="flex justify-center">
				<StandardButton class="q-px-50 q-py-15">
					<div class="flex">
						<p class="q-mr-36 text-uppercase">Proceed</p>
						<q-icon :name="resolveIcon('arrow-right', 14, 14)"></q-icon>
					</div>
				</StandardButton>
			</div>
		</div>
	</Modal>
</template>
