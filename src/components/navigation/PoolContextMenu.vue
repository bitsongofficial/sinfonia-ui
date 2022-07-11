<script setup lang="ts">
import useAuth from "@/store/auth"

const authStore = useAuth()

defineEmits<{
	(e: "osmosis"): void
	(e: "liquidity"): void
	(e: "swap"): void
}>()
</script>

<template>
	<q-menu
		no-parent-event
		touch-position
		class="rounded-20 text-white"
		anchor="center start"
		self="center end"
	>
		<q-list style="min-width: 130px">
			<!-- <q-item clickable :hoverable="false" v-close-popup>
				<q-item-section @click="$emit('osmosis')">View on Osmosis</q-item-section>
			</q-item> -->
			<q-item clickable :hoverable="false" v-close-popup v-if="authStore.session">
				<q-item-section @click="$emit('liquidity')">
					Manage Liquidity
				</q-item-section>
			</q-item>
			<q-item clickable :hoverable="false" v-close-popup>
				<q-item-section @click="$emit('swap')">Swap Tokens</q-item-section>
			</q-item>
		</q-list>
	</q-menu>
</template>
