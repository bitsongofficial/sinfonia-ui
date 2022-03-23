<script setup lang="ts">
	import ImagePair from '@/components/ImagePair.vue'
	import OutlineButton from '@/components/buttons/OutlineButton.vue'
	import StandardButton from '@/components/buttons/StandardButton.vue'
	import CardWithHeader from '@/components/cards/CardWithHeader.vue'
	import PercentageWithImage from '@/components/infographics/PercentageWithImage.vue'
	import { balancedCurrency, percentage } from '@/common/numbers'
	import InfoCard from '@/components/cards/InfoCard.vue'
	import ExpandableCard from '@/components/cards/ExpandableCard.vue'
	import Progress from '@/components/Progress.vue'
	import LightTable from '@/components/LightTable.vue'
	import { TableColumn } from '@/types/table'
	import usePools from '@/store/pools'
	import { useRoute } from 'vue-router'
	import { computed } from 'vue'

	const poolsStore = usePools()
	const route = useRoute();
	const id = route.params['id'] as string;

	const pool = computed(() => poolsStore.poolById(id))

	const unbondings = [
		{
			title: "one day",
			apr: 106.6,
			total: 100000,
			value: 22,
			max: 30,
		},
		{
			title: "7 days",
			apr: 118.4,
			total: 200000,
			value: 22,
			max: 30,
		},
		{
			title: "14 days",
			apr: 148.6,
			total: 400000,
			value: 22,
			max: 30,
		},
	]

	const columns: TableColumn[] = [
		{
			name: 'title',
			required: true,
			label: 'unbonding duration',
			align: 'left',
			field: 'title',
			sortable: false,
		},
		{ 
			name: 'APR',
			align: 'right',
			label: 'APR',
			field: 'apr',
			sortable: true,
			format: (val:any) => `${percentage(val)} %`,
		},
		{ 
			name: 'total',
			align: 'right',
			label: 'amount',
			field: 'total',
			sortable: true,
		},
		{
			name: 'value',
			align: 'right',
			label: 'value',
			field: 'value',
			sortable: true,
		},
		{
			name: 'unbond',
			align: 'center',
			label: '',
			field: 'max',
			sortable: false,
		},
	]
</script>

<template>
	<div class="text-white font-weight-medium" v-if="pool">
		<div class="q-mb-90 flex justify-between items-center">
			<div class="flex">
				<ImagePair
					:image1="pool.coin1?.token.logos.default"
					:image2="pool.coin2?.token.logos.default"
					class="q-mr-20"
				>
				</ImagePair>
				<h1 class="fs-27">#{{ pool.id }}: {{ pool.coin1?.token.symbol }}/{{ pool.coin2?.token.symbol }}</h1>
			</div>
			<div class="flex items-center">
				<OutlineButton class="q-mr-12">Swap Tokens</OutlineButton>
				<StandardButton>Add/Remove Liquidity</StandardButton>
			</div>
		</div>
		<div class="row q-col-gutter-xl q-mb-72">
			<div class="col-2">
				<img src="@/assets/images/round_chart_placeholder.png" alt="">
			</div>
			<div class="col-2">
				<CardWithHeader header="Pool composition">
					<div class="flex justify-between q-pt-15 q-mb-40" v-if="pool.coin1">
						<div class="flex">
							<PercentageWithImage
								class="q-mr-22"
								:image="pool.coin1.token.logos.default ?? ''"
								:value="pool.coin1.weightPercentage * 100"
							/>
							<div>
								<p class="fs-21 q-mb-14">{{ balancedCurrency(pool.coin1.token.amount) }}</p>
								<p class="fs-14">{{ percentage(pool.coin1.weightPercentage * 100) }} %</p>
							</div>
						</div>
						<p class="fs-12 opacity-50">{{ pool.coin1.token.symbol }}</p>
					</div>
					<div class="flex justify-between" v-if="pool.coin2">
							<div class="flex">
								<PercentageWithImage class="q-mr-22" negative :image="pool.coin2.token.logos.default ?? ''" :value="pool.coin2.weightPercentage * 100">
								</PercentageWithImage>
								<div>
									<p class="fs-21 q-mb-14">{{balancedCurrency(pool.coin2.token.amount)}}</p>
									<p class="fs-14">{{percentage(pool.coin2.weightPercentage * 100)}} %</p>
								</div>
							</div>
							<p class="fs-12 opacity-50">{{ pool.coin2.token.symbol }}</p>
					</div>
				</CardWithHeader>
			</div>
			<div class="col-2">
				<InfoCard header="Pool liquidity" class="q-mb-27">
					{{ balancedCurrency(pool.liquidity) }} $
				</InfoCard>
				<InfoCard header="Bonded">
					{{ balancedCurrency(pool.liquidity) }} $
				</InfoCard>
			</div>
			<div class="col-2">
					<InfoCard header="My liquidity" class="q-mb-27">
							{{ balancedCurrency(pool.liquidity) }} $
					</InfoCard>
					<InfoCard header="Swap fee">
							{{ percentage(pool.poolParams.swapFee) }} %
					</InfoCard>
			</div>
		</div>
		<div class="row q-mb-42">
				<div class="col-3">
						<h3 class="fs-21 q-mb-20">Liquidity Mining</h3>
						<p class="fs-16 opacity-40">
								BitSong Launchpad is the platform where you can buy and mint your favorite Artist Fantoken.
						</p>
				</div>
				<div class="col-5 column items-end">
						<p class="fs-12 opacity-40 q-mb-8">
								Available LP Tokens
						</p>
						<p class="fs-24 q-mb-14">{{124}} $</p>
						<StandardButton>
								Start Earning
						</StandardButton>
				</div>
		</div>
		<div class="row q-col-gutter-x-xl items-center q-mb-80">
				<div class="col-2 !w-1/3" v-for="unbonding in unbondings">
						<ExpandableCard transparency="5">
								<p class="fs-12 opacity-30 q-mb-16 text-uppercase">{{unbonding.title}} unbonding</p>
								<div class="flex justify-between q-mb-20" v-if="pool.coin2">
										<div>
												<p class="fs-36 q-mb-8">{{percentage(unbonding.apr)}}</p>
												<p class="text-primary fs-10">Total Bonus {{balancedCurrency(unbonding.total)}} {{ pool.coin2.token.symbol }}</p>
										</div>
										<ImagePair
											:image1="pool.coin1?.token.logos.default"
											:image2="pool.coin2?.token.logos.default"
										/>
								</div>
								<p class="fs-12 opacity-40 font-weight-regular q-mb-20">
										BitSong Launchpad is the platform where you can buy and. Incentives for 22 epochs.
								</p>
								<div class="flex no-wrap items-center">
										<p class="fs-16 q-mr-9">{{unbonding.value}}</p>
										<p class="fs-12 q-mr-30 text-no-wrap">Epochs left</p>
										<Progress :value="unbonding.value" :max="unbonding.max"></Progress>
								</div>
								<template #extra>
										<div class="flex justify-between q-mb-14">
												<div class="row items-center">
														<q-avatar
																size="sm"
																class="q-mr-22">
																<img :src="pool.coin2?.token.logos.default" alt="">                   
														</q-avatar>
														<p class="text-weight-medium">
																{{ pool.coin2?.token.symbol }}
														</p>
												</div>
												<div class="flex items-center">
														<p class="fs-10 text-primary q-mr-16">APR</p>
														<p class="fs-16">{{percentage(pool.APR)}}</p>
												</div>
										</div>
										<div class="flex justify-between">
												<div class="row items-center">
														<q-avatar size="sm" class="q-mr-22">
															<img :src="pool.coin1?.token.logos.default" alt="">                   
														</q-avatar>
														<p class="text-weight-medium">
															{{ pool.coin1?.token.symbol }}
														</p>
												</div>
												<div class="flex items-center">
													<p class="fs-10 text-primary q-mr-16">APR</p>
													<p class="fs-16">{{percentage(pool.APR)}}</p>
												</div>
										</div>
								</template>
						</ExpandableCard>
				</div>
		</div>
		<p class="fs-18 q-mb-30">My Bondings</p>
		<LightTable :rows="unbondings" :columns="columns">
				<template v-slot:body-cell-unbond="props">
						<q-td :props="props">
								<span class="text-primary text-weight-medium cursor-pointer">
										Unbond all
								</span>
						</q-td>
				</template>
		</LightTable>
	</div>
</template>