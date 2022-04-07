<script setup lang="ts">
import { computed } from "vue"
import { RouterLink } from "vue-router"
import { useQuasar } from "quasar"
import Logo from "@/components/Logo.vue"
import useSettings from "@/store/settings"
import { resolveIcon } from "@/common/resolvers"
import StandardButton from "../buttons/StandardButton.vue"
import useBank from "@/store/bank"
import Drawer from "./Drawer.vue"

const $q = useQuasar()
const settingsStore = useSettings()
const bankStore = useBank()

const isProduction = import.meta.env.VITE_MODE

const lightMode = computed({
	get() {
		return !$q.dark.isActive
	},
	set(value: boolean) {
		$q.dark.set(!value)
		settingsStore.setDarkMode(!value)
	},
})
</script>
<template>
	<div v-if="$q.screen.gt.xs" class="row justify-between items-center">
		<RouterLink to="/fantokens">
			<Logo></Logo>
		</RouterLink>
		<div class="row items-center">
			<!-- <IconButton class="q-mr-20" icon="setting" width="20" height="20" size="sm"></IconButton> -->
			<div class="settings flex items-center no-wrap">
				<q-toggle
					v-model="lightMode"
					color="white"
					class="dark-mode-toggle q-mr-20 light:inner:shadow-none"
				/>
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
