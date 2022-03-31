<script setup lang="ts">
import { Pool } from "@/types/pool"
import { balancedCurrency, percentage } from "@/common/numbers"
import { resolveIcon } from "@/common/resolvers"
import { ref } from "vue"
import { useRouter } from "vue-router"

import PoolContextMenu from "@/components/navigation/PoolContextMenu.vue"
import ImagePair from "@/components/ImagePair.vue"
import LiquidityModal from "../modals/LiquidityModal.vue"

const router = useRouter()

defineProps<{
	pool: Pool
}>()

const show = ref(false)
const openAddRemoveModal = ref(false)

const onSwapClick = () => {
	router.push("/swap")
}
</script>

<template>
	<div class="row q-mb-34">
		<div class="col-4">
			<div class="q-pr-24">
				<ImagePair :coins="pool.coins"> </ImagePair>
			</div>
		</div>
		<div class="col-4 q-ml--12">
			<div class="row justify-between no-wrap">
				<div>
					<p class="fs-12 opacity-40 text-weight-medium q-mb-10 light:text-primary light:opacity-100">
						Pool {{ pool.id }}
					</p>
					<template v-for="(coin, index) in pool.coins" :key="index">
						<p class="fs-16 text-weight-bold w-fit">
							{{ coin.token.symbol }}
						</p>
						<div
							class="separator q-mt-4 q-mb-6"
							v-if="index !== pool.coins.length - 1"
						></div>
					</template>
				</div>
				<div class="q-mr--12" @click.native.prevent="show = true">
					<q-icon
						:name="resolveIcon('vertical-dots', 4, 16)"
						class="fs-14 s-28 q-mr--12 opacity-30 hover:opacity-100"
					></q-icon>
					<PoolContextMenu
						v-model="show"
						@swap="onSwapClick"
						@liquidity="openAddRemoveModal = true"
					></PoolContextMenu>
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-4">
			<p class="fs-12 text-weight-medium opacity-40 q-pb-10">APR</p>
			<p class="fs-16 text-weight-medium">{{ percentage(pool.APR) }} %</p>
		</div>
		<div class="col-4 q-ml--12">
			<p class="fs-12 text-weight-medium opacity-40 q-pb-10">Liquidity</p>
			<p class="fs-16 text-weight-medium text-no-wrap">
				{{ balancedCurrency(pool.liquidity) }} $
			</p>
		</div>
	</div>
	<LiquidityModal v-model="openAddRemoveModal" :pool="pool" />
</template>
