<script setup lang="ts">
import { balancedCurrency } from "@/common"
import { TokenBalance } from "@/types"

defineProps<{
	coin: TokenBalance
}>()

defineEmits<{
	(e: "click", value: TokenBalance): void
}>()
</script>

<template>
	<div
		class="full-width q-pa-0 text-white text-weight-medium light:group cursor-pointer"
		@click="$emit('click', coin)"
	>
		<div class="flex-1 flex justify-between items-center q-py-0 no-wrap">
			<q-avatar class="q-mr-18" size="24px">
				<img :src="coin.logos.default" :alt="coin.name" />
			</q-avatar>

			<div class="column no-wrap q-mr-auto">
				<p class="fs-14 !leading-18 text-weight-medium text-uppercase q-mb-2">
					{{ coin.symbol }}
				</p>

				<p class="fs-13 !leading-16 text-weight-medium opacity-40">
					{{ coin.name }}
				</p>
			</div>

			<p class="fs-14 !leading-18 text-weight-medium">
				{{ balancedCurrency(coin.available ?? 0) }}
			</p>
		</div>
	</div>
</template>
