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
	<q-item class="full-width q-pa-0 coin-selected">
		<div class="flex-1 flex items-center q-py-0 no-wrap">
			<div class="flex items-center no-wrap">
				<q-avatar size="24px" class="q-mr-20 no-margin-select">
					<img :src="coin.logos.default" :alt="coin.name" />
				</q-avatar>
			</div>
			<div
				class="q-mr-xs-0 q-mr-20 column row-xs items-center-xs justify-between-xs flex-1"
			>
				<p class="fs-16 text-weight-medium fs-xs-14 !leading-20 text-white">
					{{ coin.symbol }}
				</p>
				<p class="fs-12 text-weight-medium !leading-15 text-dark q-mt-2">
					{{ available }}
				</p>
			</div>
		</div>
	</q-item>
</template>

<style lang="scss" scoped>
.coin-selected {
	@media screen and (max-width: $breakpoint-xs) {
		min-height: auto;
	}
}
</style>
