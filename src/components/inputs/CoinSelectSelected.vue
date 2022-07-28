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
					<img :src="coin.logos.default" alt="" />
				</q-avatar>
			</div>
			<div class="q-mr-xs-0 q-mr-20 row items-center flex-1">
				<p class="fs-16 text-weight-medium fs-xs-14 !leading-20 text-white">
					{{ coin.name }}
				</p>
				<p
					class="fs-13 text-weight-medium !leading-16 text-dark hidden block-xs q-ml-auto q-pr-4"
				>
					{{ available }} {{ coin.symbol }}
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
