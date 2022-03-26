<script setup lang="ts">
import { balancedCurrency } from "@/common/numbers"
import { UserCoinInfo } from "@/types/user"

defineProps<{
	coin: UserCoinInfo
}>()
</script>

<template>
	<q-item class="full-width q-pa-0 text-white">
		<div class="flex-1 flex justify-between items-center q-py-0 no-wrap">
			<div class="q-mr-20">
				<p class="fs-12">{{ coin.coin.name }}</p>
			</div>
			<div class="flex items-center">
				<p class="fs-10 q-mr-20 q-mt-2">{{ coin.coin.symbol }}</p>
				<q-avatar size="24px">
					<img :src="coin.coin.iconUrl" alt="" />
				</q-avatar>
			</div>
		</div>
	</q-item>
</template>
