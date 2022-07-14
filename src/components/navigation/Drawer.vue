<script setup lang="ts">
import { computed, ref } from "vue"
import { RouterView, RouterLink } from "vue-router"
import Logo from "@/components/Logo.vue"
import { resolveIcon } from "@/common/resolvers"
import LightModeSwitch from "../inputs/LightModeSwitch.vue"
import SideMenu from "./SideMenu.vue"
import WalletAddress from "../WalletAddress.vue"

const rightDrawerOpen = ref(false)

const toggleRightDrawer = () => {
	rightDrawerOpen.value = !rightDrawerOpen.value
}

const drawerWidth = computed(() => {
	return window.innerWidth
})
</script>

<template>
	<q-layout view="hHh lpR fFf" class="z-20">
		<q-header class="bg-transparent text-white">
			<div class="container bg-primary-dark light:bg-white">
				<q-toolbar class="flex justify-between q-pt-20 q-pt-md-64 q-pb-20 q-px-0">
					<RouterLink to="/fantokens">
						<Logo></Logo>
					</RouterLink>

					<q-btn
						dense
						flat
						round
						:icon="resolveIcon('menu', 20, 14)"
						@click="toggleRightDrawer"
					/>
				</q-toolbar>
			</div>
		</q-header>

		<q-drawer
			:width="drawerWidth"
			v-model="rightDrawerOpen"
			side="right"
			overlay
			behavior="mobile"
			class="column bg-primary-dark light:bg-gray-light container"
		>
			<div class="column flex-1 no-wrap q-pt-20 q-pt-md-64 q-pb-30">
				<div class="flex justify-between items-center">
					<Logo disabled></Logo>
					<div class="flex items-center">
						<LightModeSwitch class="q-mr-16"></LightModeSwitch>
						<q-btn
							class="opacity-100"
							dense
							flat
							round
							:icon="resolveIcon('close', 12, 12)"
							@click="rightDrawerOpen = false"
						/>
					</div>
				</div>
				<div class="flex-1 column justify-center">
					<SideMenu></SideMenu>
				</div>
				<div>
					<WalletAddress></WalletAddress>
				</div>
			</div>
		</q-drawer>
		<q-page-container class="container !q-pt-0">
			<RouterView />
		</q-page-container>
	</q-layout>
</template>
