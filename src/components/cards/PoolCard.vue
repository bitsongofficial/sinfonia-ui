<script setup lang="ts">
import PoolHeader from "@/components/pools/PoolHeader.vue"
import Card from "@/components/cards/Card.vue"
import { balancedCurrency, percentage } from "@/common/numbers"
import { Pool } from "@/types"

withDefaults(
	defineProps<{
		pool: Pool
		userPool?: boolean
	}>(),
	{
		userPool: false,
	}
)
</script>

<template>
	<Card
		:padding="30"
		:transparency="5"
		shadow="none"
		class="full-width text-white cursor-pointer transition-all hover:bg-white-10 light:bg-white full-height !flex column justify-between no-wrap"
	>
		<PoolHeader :pool="pool" />
		<div class="grid grid-cols-2 grid-gap-16">
			<template v-if="userPool">
				<div class="column">
					<p class="fs-12 !leading-14 text-weight-medium opacity-40 q-pb-10">
						My Bonded
					</p>
					<p class="fs-16 !leading-20 text-weight-medium work-break-all">
						{{ balancedCurrency(pool.bonded) }} $
					</p>
				</div>
				<div class="column items-end">
					<p class="fs-12 !leading-14 text-weight-medium opacity-40 q-pb-10">
						My Liquidity
					</p>
					<p class="fs-16 !leading-20 text-weight-medium work-break-all">
						{{ balancedCurrency(pool.userLiquidity) }} $
					</p>
				</div>
			</template>
			<div class="column">
				<p class="fs-12 text-weight-medium opacity-40 q-pb-10">Liquidity</p>
				<p class="fs-16 !leading-20 text-weight-medium work-break-all">
					{{ balancedCurrency(pool.liquidity) }} $
				</p>
			</div>
			<div class="column items-end">
				<p class="fs-12 !leading-14 text-weight-medium opacity-40 q-pb-10">APR</p>
				<p class="fs-16 !leading-20 text-weight-medium work-break-all">
					{{ percentage(pool.APR) }} %
				</p>
			</div>
		</div>
	</Card>
</template>
