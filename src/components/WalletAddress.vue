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
const router = useRouter()

const fantoken = computed(() => route.name === "Fantoken")

const { onCopy } = useClipboard()

const keplrInstalled = window.keplr !== undefined

const goToProfile = async () => {
	await router.push({ name: "Profile" })
}
</script>
<template>
	<div
		v-if="authStore.session"
		class="row items-center bg-rounded-translucent q-pl-24 q-pr-18 q-py-15 no-wrap w-fit cursor-pointer"
		:class="{
			'!shadow-10 !bg-white-20': fantoken,
		}"
		@click="goToProfile"
	>
		<div class="q-mr-50">
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
			icon="copy"
			width="20"
			height="20"
			class="text-primary-light fs-16"
			v-if="authStore.bitsongAddress"
			@click.stop="onCopy(authStore.bitsongAddress)"
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
