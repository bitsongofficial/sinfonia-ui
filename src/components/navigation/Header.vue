<script setup lang="ts">
import { RouterLink } from "vue-router"
import { useQuasar } from "quasar"
import Logo from "@/components/Logo.vue"
import { resolveIcon } from "@/common/resolvers"
import StandardButton from "../buttons/StandardButton.vue"
import useBank from "@/store/bank"
import Drawer from "./Drawer.vue"
import LightModeSwitch from "../inputs/LightModeSwitch.vue"
import WalletAddress from "../WalletAddress.vue"
import useAuth from "@/store/auth"

const $q = useQuasar()
const bankStore = useBank()
const authStore = useAuth()

const isProduction = import.meta.env.VITE_MODE
</script>
<template>
	<div v-if="$q.screen.gt.md" class="row justify-between items-center">
		<RouterLink to="/fantokens">
			<Logo></Logo>
		</RouterLink>
		<div class="row items-center">
			<!-- <IconButton class="q-mr-20" icon="setting" width="20" height="20" size="sm"></IconButton> -->
			<div class="settings flex items-center no-wrap">
				<div>
					<StandardButton
						v-if="isProduction === 'testnet' && authStore.session"
						:disable="bankStore.loadingFaucet"
						@click="bankStore.getFaucet"
						with-icon
						:icon="resolveIcon('coin', 24, 24)"
						class="bg-gradient-primary-pink fs-14 q-mr-30"
					>
						Get BTSG
					</StandardButton>
				</div>
				<WalletAddress></WalletAddress>
			</div>
		</div>
	</div>
	<Drawer v-else></Drawer>
</template>
