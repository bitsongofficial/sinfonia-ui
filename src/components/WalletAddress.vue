<script setup lang="ts">
import { ref } from "vue"
import IconButton from "./buttons/IconButton.vue"
import LargeButton from "./buttons/LargeButton.vue"
import useAuth from "@/store/auth"

const authStore = useAuth()
</script>
<template>
	<div
		v-if="authStore.session"
		class="row items-center bg-rounded-translucent q-pl-24 q-pr-18 q-py-16-5 no-wrap w-fit"
	>
		<div class="q-mr-50">
			<p class="text-uppercase text-caption fs-8 opacity-40 q-mb-3">Address</p>
			<p class="text-weight-bold text-subtitle1 fs-12">bitsong1...u085</p>
		</div>
		<IconButton
			icon="copy"
			width="20"
			height="20"
			class="opacity-40 fs-15"
		></IconButton>
	</div>
	<div v-else>
		<LargeButton :padding-x="36" fit @click="authStore.signIn"
			>Connect to Keplr</LargeButton
		>
	</div>
</template>
