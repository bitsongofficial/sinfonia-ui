<script setup lang="ts">
	import Title from '@/components/typography/Title.vue'
	import PoolHeader from '@/components/pools/PoolHeader.vue'
	import Card from '@/components/cards/Card.vue'
	import {balancedCurrency} from "@/common/numbers"
	import { RouterLink } from "vue-router"
	import usePools from '@/store/pools'

	const poolsStore = usePools()
</script>

<template>
	<Title class="q-mb-50">Your Pools</Title>
	<!-- <div class="row q-mb-72 q-col-gutter-xl">
			<div v-for="(userPool, index) in myPools" class="col-2">
					<RouterLink :to="'/pools/' + userPool.pool.name">
							<Card class="full-width cursor-pointer">
									<PoolHeader :pool="userPool.pool">

									</PoolHeader>
									<div class="separator-light q-my-20"></div>
									<div class="row">
											<div class="col-4">
													<p class="fs-10 font-weight-medium opacity-40 q-pb-10">My Liquidity</p>
													<p class="fs-16 font-weight-medium text-no-wrap">{{balancedCurrency(userPool.user.liquidity)}} $</p>
											</div>
											<div class="col-4">
													<p class="fs-10 font-weight-medium opacity-40 q-pb-10">My Bonded Tokens</p>
													<p class="fs-16 font-weight-medium text-no-wrap">{{balancedCurrency(userPool.user.bonded)}} $</p>
											</div>
									</div>
							</Card>
					</RouterLink>
			</div>
	</div> -->
	<Title class="q-mb-50">All Pools</Title>
	<div class="row q-col-gutter-xl">
		<div v-for="(pool) in poolsStore.pools" class="col-2">
			<RouterLink :to="'/pools/' + pool.id">
				<Card class="full-width cursor-pointer">
					<PoolHeader :pool="pool" />
				</Card>
			</RouterLink>
		</div>
	</div>
</template>