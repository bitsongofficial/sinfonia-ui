<script setup lang="ts">
import { resolveIcon } from "@/common/resolvers"
import MenuItem from "@/components/navigation/MenuItem.vue"
</script>
<template>
	<div
		class="column min-width justify-around items-center bg-rounded-translucent q-px-20 q-py-28"
	>
		<MenuItem
			:icon="{ name: 'list', width: 19, height: 13 }"
			class="q-mb-lg"
			url="/fantokens"
		>
			DEX
		</MenuItem>
		<MenuItem
			:icon="{ name: 'refresh', width: 21, height: 17 }"
			class="q-mb-lg"
			url="/swap"
		>
			Swap
		</MenuItem>
		<MenuItem
			:icon="{ name: 'stack', width: 17, height: 17 }"
			class="q-mb-lg"
			url="/pools"
		>
			Pools
		</MenuItem>
		<MenuItem
			:icon="{ name: 'suitcase', width: 18, height: 16 }"
			class="q-mb-lg"
			url="/assets"
		>
			Assets
		</MenuItem>
		<MenuItem
			is-link
			:icon="{ name: 'swap', width: 21, height: 16 }"
			url="https://www.mintscan.io/bitsong/txs"
		>
			<div class="flex no-wrap items-center">
				<p class="q-mr-8">Transactions</p>
				<q-icon :name="resolveIcon('external', 10, 10)" class="fs-10"></q-icon>
			</div>
		</MenuItem>
	</div>
</template>
