<script setup lang="ts">
import { TokenBalance } from "@/types"

defineProps<{
	coin: TokenBalance
}>()
</script>

<template>
	<q-item class="full-width q-pa-0 text-white text-weight-medium light:group">
		<div class="flex-1 flex justify-between items-center q-py-0 no-wrap">
			<div class="q-mr-20">
				<p class="fs-12">{{ coin.name }}</p>
			</div>
			<div class="flex items-center no-wrap">
				<p class="fs-10 q-mr-20 q-mt-2 light:group-hover:text-primary">{{ coin.symbol }}</p>
				<q-avatar size="24px">
					<img :src="coin.logos.default" alt="" />
				</q-avatar>
			</div>
		</div>
	</q-item>
</template>
