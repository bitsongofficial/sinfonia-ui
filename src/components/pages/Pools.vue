<script setup lang="ts">
import Title from "@/components/typography/Title.vue"
import PoolHeader from "@/components/pools/PoolHeader.vue"
import Card from "@/components/cards/Card.vue"
import { balancedCurrency } from "@/common/numbers"
import { RouterLink } from "vue-router"
import usePools from "@/store/pools"
import PoolCard from "../cards/PoolCard.vue"

const poolsStore = usePools()
</script>

<template>
	<template v-if="poolsStore.myPools.length > 0">
		<Title class="q-mb-50">My Pools</Title>
		<div
			class="grid grid-cols-min-xs-1 grid-cols-2 grid-cols-md-3 grid-cols-lg-4 grid-gap-30 q-mb-74"
		>
			<RouterLink
				v-for="(userPool, index) in poolsStore.myPools"
				:key="index"
				:to="'/pools/' + userPool.id"
				class="block full-height"
			>
				<PoolCard :pool="userPool" user-pool />
			</RouterLink>
		</div>
	</template>
	<Title class="q-mb-50" :font-size="18">All Pools</Title>
	<div
		class="grid grid-cols-min-xs-1 grid-cols-2 grid-cols-md-3 grid-cols-lg-4 grid-gap-30"
	>
		<RouterLink
			v-for="(pool, index) in poolsStore.pools"
			:key="index"
			:to="'/pools/' + pool.id"
			class="block full-height"
		>
			<PoolCard :pool="pool" />
		</RouterLink>
	</div>
</template>
