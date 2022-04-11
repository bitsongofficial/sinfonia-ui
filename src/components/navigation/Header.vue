<script setup lang="ts">
import { RouterLink } from "vue-router"
import { useQuasar } from "quasar"
import Logo from "@/components/Logo.vue"
import { resolveIcon } from "@/common/resolvers"
import StandardButton from "../buttons/StandardButton.vue"
import useBank from "@/store/bank"
import Drawer from "./Drawer.vue"
import LightModeSwitch from "../inputs/LightModeSwitch.vue"

const $q = useQuasar()
const bankStore = useBank()

const isProduction = import.meta.env.VITE_MODE
</script>
<template>
	<div v-if="$q.screen.gt.xs" class="row justify-between items-center">
		<RouterLink to="/fantokens">
			<Logo></Logo>
		</RouterLink>
		<div class="row items-center">
			<!-- <IconButton class="q-mr-20" icon="setting" width="20" height="20" size="sm"></IconButton> -->
			<div class="settings flex items-center no-wrap">
				<LightModeSwitch></LightModeSwitch>
				<div>
					<StandardButton
						v-if="isProduction === 'testnet'"
						:disabled="bankStore.loadingFaucet"
						@click="bankStore.getFaucet"
						with-icon
						:icon="resolveIcon('coin', 24, 24)"
						class="bg-gradient-primary-pink fs-14"
					>
						Get BTSG
					</StandardButton>
				</div>
			</div>
		</div>
	</div>
	<Drawer v-else></Drawer>
</template>
