<script setup lang="ts">
import { formatShortAddress } from "@/common"
import IconButton from "@/components/buttons/IconButton.vue"
import LargeButton from "@/components/buttons/LargeButton.vue"
import useAuth from "@/store/auth"
import useClipboard from "@/hooks/useClipboard"

const authStore = useAuth()

const { onCopy } = useClipboard()

const keplrInstalled = window.keplr !== undefined
</script>
<template>
	<div
		v-if="authStore.session"
		class="row items-center bg-rounded-translucent q-pl-24 q-pr-18 q-py-16-5 no-wrap w-fit"
	>
		<div class="q-mr-50">
			<p class="text-uppercase text-caption fs-8 opacity-40 q-mb-3">Address</p>
			<p
				class="text-weight-bold text-subtitle1 fs-12 light:text-secondary-320"
				v-if="authStore.bitsongAddress"
			>
				{{ formatShortAddress(authStore.bitsongAddress) }}
			</p>
		</div>
		<IconButton
			icon="copy"
			width="20"
			height="20"
			class="opacity-40 fs-15"
			v-if="authStore.bitsongAddress"
			@click="onCopy(authStore.bitsongAddress)"
		/>
	</div>
	<div v-else>
		<LargeButton
			:disable="!keplrInstalled"
			:padding-x="36"
			fit
			@click="authStore.signIn"
			>Connect to Keplr</LargeButton
		>
	</div>
</template>
