<script setup lang="ts">
import { formatShortAddress } from "@/common"
import IconButton from "@/components/buttons/IconButton.vue"
import LargeButton from "@/components/buttons/LargeButton.vue"
import useAuth from "@/store/auth"
import useClipboard from "@/hooks/useClipboard"
import { useRoute, useRouter } from "vue-router"
import { computed } from "vue"

const authStore = useAuth()
const route = useRoute()

const fantoken = computed(() => route.name === "Fantoken")

const { onCopy } = useClipboard()

const keplrInstalled = window.keplr !== undefined

const logout = () => {
	authStore.$reset()
}
</script>
<template>
	<div
		v-if="authStore.session"
		class="row items-center bg-rounded-translucent q-pl-24 q-pr-18 q-py-15 no-wrap w-fit"
		:class="{
			'!shadow-10 !bg-white-20': fantoken,
		}"
	>
		<div
			class="q-mr-50 cursor-pointer"
			@click.stop="onCopy(authStore.bitsongAddress)"
		>
			<p class="text-primary-light text-uppercase text-caption fs-8 q-mb-3">
				Address
			</p>
			<p
				class="text-weight-bold text-subtitle1 fs-12 light:text-secondary-320"
				v-if="authStore.bitsongAddress"
			>
				{{ formatShortAddress(authStore.bitsongAddress) }}
			</p>
		</div>
		<IconButton
			icon="log-out"
			width="24"
			height="24"
			class="text-primary-light fs-18"
			v-if="authStore.bitsongAddress"
			@click="logout"
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
