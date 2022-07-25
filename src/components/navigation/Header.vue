<script setup lang="ts">
import { RouterLink } from "vue-router"
import { useQuasar } from "quasar"
import { resolveIcon } from "@/common/resolvers"
import useBank from "@/store/bank"
import Logo from "@/components/Logo.vue"
import StandardButton from "@/components/buttons/StandardButton.vue"
import Drawer from "@/components/navigation/Drawer.vue"
import WalletAddress from "@/components/WalletAddress.vue"
import useAuth from "@/store/auth"
import Breadcrumb from "@/components/navigation/Breadcrumb.vue"

const $q = useQuasar()
const bankStore = useBank()
const authStore = useAuth()

const isProduction = import.meta.env.VITE_MODE
</script>
<template>
	<div v-if="$q.screen.gt.md" class="row justify-between items-center">
		<div
			class="full-width !w-xs-1/3 q-px-xs-0 !w-sm-1/4 !w-md-1/6 self-end fixed-xs z-10 left-0 bottom-0"
		>
			<RouterLink to="/fantokens">
				<Logo></Logo>
			</RouterLink>
		</div>

		<div
			class="row items-center justify-between full-width q-ml-auto !w-xs-2/3 !w-sm-3/4 !w-md-5/6"
		>
			<Breadcrumb />
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
