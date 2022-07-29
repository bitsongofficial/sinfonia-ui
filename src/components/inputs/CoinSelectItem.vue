<script setup lang="ts">
import { balancedCurrency } from "@/common"
import useConfig from "@/store/config"
import { TokenBalance } from "@/types"
import { computed } from "vue"

const configStore = useConfig()

const props = defineProps<{
	coin: TokenBalance
}>()

defineEmits<{
	(e: "click", value: TokenBalance): void
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
				{{ available }}
			</p>
		</div>
	</div>
</template>
