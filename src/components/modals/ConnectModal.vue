<script lang="ts" setup>
import ModalWithClose from "@/components/modals/ModalWithClose.vue"
import ConnectionItem from "@/components/cards/ConnectionItem.vue"
import useAuth from "@/store/auth"
import { computed, ref } from "vue"

const props = defineProps<{
	modelValue: boolean
}>()

const emit = defineEmits<{
	(e: "update:modelValue", value: boolean): void
}>()

const authStore = useAuth()

const show = ref(false)

const model = computed({
	get() {
		return props.modelValue
	},
	set(value: boolean) {
		emit("update:modelValue", value)
	},
})
</script>

<template>
	<ModalWithClose v-model="model" title="Connect wallet" @click="show = false">
		<ConnectionItem
			title="Keplr Wallet"
			subtitle="Keplr Browser Extension"
			@click="authStore.signIn"
		>
			<template v-slot:logo>
				<q-img
					class="rounded-10 shadow-20 min-w-80"
					src="@/assets/images/keplr-logo.svg"
					height="80px"
					width="80px"
				/>
			</template>
		</ConnectionItem>
	</ModalWithClose>
</template>
