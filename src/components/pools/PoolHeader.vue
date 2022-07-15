<script setup lang="ts">
import { Pool } from "@/types/pool"
import { ref, watch, onUnmounted } from "vue"
import { useRouter } from "vue-router"

import PoolContextMenu from "@/components/navigation/PoolContextMenu.vue"
import ImagePair from "@/components/ImagePair.vue"
import LiquidityModal from "../modals/LiquidityModal.vue"
import useTransactionManager from "@/store/transaction-manager"
import IconButton from "../buttons/IconButton.vue"

const router = useRouter()
const transactionManagerStore = useTransactionManager()

const props = defineProps<{
	pool: Pool
}>()

const show = ref(false)
const openAddRemoveModal = ref(false)

const broadcastingWatcher = watch(
	() => transactionManagerStore.loadingBroadcasting,
	(oldLoading, newLoading) => {
		if (oldLoading !== newLoading) {
			openAddRemoveModal.value = false
		}
	}
)

onUnmounted(() => {
	broadcastingWatcher()
})

const onSwapClick = () => {
	const coins = [...props.pool.coins]
	const fromCoin = coins.shift()
	const toCoin = coins.shift()

	if (fromCoin && toCoin) {
		router.push(`/swap?from=${fromCoin.token.symbol}&to=${toCoin.token.symbol}`)
	}
}
</script>

<template>
	<div class="row q-mb-28 justify-between">
		<div class="column w-full">
			<div class="row items-center justify-between q-mb-14 relative-position">
				<div class="row items-center">
					<template v-for="(coin, index) in pool.coins" :key="index">
						<p class="fs-18 !leading-24 text-weight-medium">
							{{ coin.token.symbol }}
						</p>
						<span
							class="fs-18 !leading-24 text-weight-medium white-space-break-spaces"
							v-if="index < pool.coins.length - 1"
						>
							·
						</span>
					</template>
					<p
						class="fs-12 opacity-40 text-weight-medium light:text-primary light:opacity-100 q-ml-16"
					>
						Pool {{ pool.id }}
					</p>
				</div>

				<IconButton
					icon="vertical-dots"
					width="4"
					height="16"
					class="fs-16 s-28 q-mr--4 opacity-30 hover:opacity-100 absolute -right-8"
					@click.native.prevent="show = true"
				>
					<PoolContextMenu
						v-model="show"
						@swap="onSwapClick"
						@liquidity="openAddRemoveModal = true"
					></PoolContextMenu>
				</IconButton>
			</div>
			<ImagePair
				:size="31"
				:smaller-size="31"
				:spacing="8"
				:coins="pool.coins"
				inline
			/>
		</div>
	</div>
	<LiquidityModal v-model="openAddRemoveModal" :pool="pool" />
</template>
