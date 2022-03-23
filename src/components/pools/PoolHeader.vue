<script setup lang="ts">
	import IconButton from '@/components/buttons/IconButton.vue'
	import ImagePair from '@/components/ImagePair.vue'
	import { Pool } from '@/types'
	import { balancedCurrency, percentage } from '@/common/numbers'

	const props = defineProps<{
		pool: Pool
	}>()
</script>

<template>
	<div class="row q-mb-34">
		<div class="col-4">
			<div class="q-pr-24">
				<ImagePair
					:image1="props.pool.coin1?.token.logos.default"
					:image2="props.pool.coin2?.token.logos.default"
				/>
			</div>
		</div>
		<div class="col-4">
			<div class="row justify-between no-wrap">
				<div>
					<p class="fs-10 opacity-40 font-weight-medium q-mb-8">
						Pool {{ props.pool.id }}
					</p>
					<p class="fs-16 font-weight-bold w-fit" v-if="props.pool.coin1">
						{{ props.pool.coin1.token.symbol }}
					</p>
					<div class="separator q-my-4"></div>
					<p class="fs-16 font-weight-bold w-fit" v-if="props.pool.coin2">
						{{ props.pool.coin2.token.symbol }}
					</p>
				</div>
				<div>
					<IconButton icon="vertical-dots" width="4" height="16" class="fs-14 s-28 q-mr--12" />
				</div>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="col-4">
			<p class="fs-10 font-weight-medium opacity-40 q-pb-10">APR</p>
			<p class="fs-16 font-weight-medium">{{percentage(props.pool.APR)}} %</p>
		</div>
		<div class="col-4">
			<p class="fs-10 font-weight-medium opacity-40 q-pb-10">Liquidity</p>
			<p class="fs-16 font-weight-medium text-no-wrap">{{balancedCurrency(props.pool.liquidity)}} $</p>
		</div>
	</div>
</template>