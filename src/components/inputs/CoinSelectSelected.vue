<script setup lang="ts">
import { balancedCurrency } from "@/common/numbers"
import useConfig from "@/store/config"
import { TokenBalance } from "@/types"
import { computed } from "vue"

const configStore = useConfig()

const props = defineProps<{
	coin: TokenBalance
}>()

const available = computed(() => {
	const osmosisToken = configStore.osmosisToken

	if (osmosisToken && props.coin.chains) {
		const chain = props.coin.chains.find(
			(el) => el.symbol === osmosisToken.symbol
		)

		if (chain) {
			return balancedCurrency(chain.available ?? "0", 6)
		}
	}

	return "0"
})
</script>

<template>
	<q-item class="full-width q-pa-0">
		<div class="flex-1 flex justify-between items-center q-py-0 no-wrap">
			<div class="order-xs-3 q-mr-xs-0 q-mr-20">
				<p class="fs-15 q-mb-4 text-white gt-xs">{{ coin.name }}</p>
				<p class="fs-12 text-dark">{{ available }} {{ coin.symbol }}</p>
			</div>
			<div class="order-xs-1 flex items-center no-wrap">
				<q-avatar size="40px" class="q-mr-8 q-mr-xs-20 !fs-xs-24 no-margin-select">
					<img :src="coin.logos.default" alt="" />
				</q-avatar>
				<p class="fs-14 text-white lt-sm">{{ coin.name }}</p>
			</div>
		</div>
	</q-item>
</template>
