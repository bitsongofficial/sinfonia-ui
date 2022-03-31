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
			return balancedCurrency(chain.available ?? "0")
		}
	}

	return "-"
})
</script>

<template>
	<q-item class="full-width q-pa-0">
		<div class="flex-1 flex justify-between items-center q-py-12 no-wrap">
			<div>
				<p class="fs-15 q-mb-4 text-white">{{ coin.name }}</p>
				<p class="fs-12 text-dark">{{ available }} {{ coin.symbol }}</p>
			</div>
			<div>
				<q-avatar size="40px" class="q-mr-22">
					<img :src="coin.logos.default" alt="" />
				</q-avatar>
			</div>
		</div>
	</q-item>
</template>
