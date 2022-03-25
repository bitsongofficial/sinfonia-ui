<script setup lang="ts">
	import ImagePair from '@/components/ImagePair.vue'
	import OutlineButton from '@/components/buttons/OutlineButton.vue'
	import StandardButton from '@/components/buttons/StandardButton.vue'
	import CardWithHeader from '@/components/cards/CardWithHeader.vue'
	import PercentageWithImage from '@/components/infographics/PercentageWithImage.vue'
	import { balancedCurrency, percentage, toDecimalGamm } from '@/common/numbers'
	import InfoCard from '@/components/cards/InfoCard.vue'
	import ExpandableCard from '@/components/cards/ExpandableCard.vue'
	import Progress from '@/components/Progress.vue'
	import LightTable from '@/components/LightTable.vue'
	import BondModal from '@/components/modals/BondModal.vue'
	import { TableColumn, LockableDurationWithApr } from '@/types'
	import usePools from '@/store/pools'
	import { useRoute } from 'vue-router'
	import { computed, onMounted, onUnmounted, ref } from 'vue'
	import { BigNumber } from 'bignumber.js'
	import { reduce } from 'lodash'
	import { Coin } from '@cosmjs/proto-signing'
	import { formatEpochDate, unboundingEndTimeStart, fromNow } from '@/common'
	import useTransactionManager from '@/store/transaction-manager'

	const transactionManagerStore = useTransactionManager()
	const poolsStore = usePools()
	const route = useRoute()
	const id = route.params['id'] as string
	const openBondModal = ref(false)

	const pool = computed(() => poolsStore.poolById(id))
	const lpLiquidity = computed(() => {
		if (pool.value) {
			return new BigNumber(pool.value.userLiquidity).minus(pool.value.bonded).toString()
		}

		return '0'
	})

	const columns: TableColumn[] = [
		{
			name: 'title',
			required: true,
			label: 'unbonding duration',
			align: 'left',
			field: (row: LockableDurationWithApr) => row.readableDuration,
			format: (duration: string) => `${duration} unbonding`,
			sortable: false,
		},
		{ 
			name: 'APR',
			align: 'right',
			label: 'APR',
			field: (row: LockableDurationWithApr) => row.apr,
			sortable: true,
			format: (val: string) => `${percentage(val)} %`,
		},
		{ 
			name: 'total',
			align: 'right',
			label: 'amount',
			field: (row: LockableDurationWithApr) => row.lockedLonger ? reduce<Coin, BigNumber>(row.lockedLonger.coins, (all, coin) => {
				return all.plus(coin.amount)
			}, new BigNumber('0')) : '0',
			format: (val: string) => `${balancedCurrency(toDecimalGamm(val))} GAMM/${pool.value?.id ?? '0'}`,
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

	const beginUnlocking = (id: string) => {
		transactionManagerStore.beginUnlocking(id)
	}

	const compositionGraphStyle = ref({width: "0"})
	const heightRef = ref<HTMLElement | null>(null)

	const setSize = () => {
		if(heightRef.value) {
			compositionGraphStyle.value.width = heightRef.value.clientHeight - 5 + 'px'

			return true
		}

		return false
	}

	const untilSetSize = () => {
		const res = setSize()

		if(!res) {
			setTimeout(untilSetSize, 200)
		}
	}

	onMounted(() => {
		window.addEventListener("resize", setSize)
		untilSetSize()
	})

	onUnmounted(() => {
		window.removeEventListener("resize", setSize);
	})
</script>

<template>
	<div class="text-white text-weight-medium" v-if="pool">
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
		<div class="row q-col-gutter-x-xl q-col-gutter-y-lg q-mb-72">
			<div class="col-8 col-md-4 col-xl-2 flex justify-center">
				<div :style="compositionGraphStyle">
					<PercentageWithImage class="full-width full-height" imageSize="48px" :thickness="0.35" :icon="{name: 'bitsong', width: 48, height: 47}" :value="50" full>
					</PercentageWithImage>
				</div>
			</div>
			<div class="col-8 col-md-4 col-xl-2">
        <div ref="heightRef">
          <CardWithHeader header="Pool composition" :padding="0" class="q-px-30 q-py-20">
              <div class="flex justify-between q-pt-24 q-mb-48" v-if="pool.coin1">
                <div class="flex">
                  <PercentageWithImage
                    class="q-mr-22"
                    :image="pool.coin1.token.logos.default ?? ''"
                    :value="pool.coin1.weightPercentage * 100"
                  />
                  <div>
                    <p class="fs-21 q-mb-14">{{ balancedCurrency(pool.coin1.token.amount) }}</p>
                    <p class="fs-14">{{ percentage(pool.coin1.weightPercentage) }} %</p>
                  </div>
                </div>
                <p class="fs-12 opacity-50">{{ pool.coin1.token.symbol }}</p>
              </div>
              <div class="flex justify-between" v-if="pool.coin2">
                <div class="flex">
                  <PercentageWithImage
                    class="q-mr-22"
										v-if="pool.coin2"
										negative
                    :image="pool.coin2.token.logos.default ?? ''"
                    :value="pool.coin2.weightPercentage * 100"
                  />
                  <div>
                  <p class="fs-21 q-mb-14">{{balancedCurrency(pool.coin2.token.amount)}}</p>
                  <p class="fs-14">{{percentage(pool.coin2.weightPercentage)}} %</p>
                  </div>
                </div>
                <p class="fs-12 opacity-50" v-if="pool.coin2">{{ pool.coin2.token.symbol }}</p>
              </div>
					</CardWithHeader>
				</div>
			</div>
			<div class="col-8 col-md-4 col-xl-2">
				<InfoCard header="Pool liquidity" class="q-mb-27">
					{{ balancedCurrency(pool.liquidity) }} $
				</InfoCard>
				<InfoCard header="Bonded">
					{{ balancedCurrency(pool.bonded) }} $
				</InfoCard>
			</div>
			<div class="col-8 col-md-4 col-xl-2">
					<InfoCard header="My liquidity" class="q-mb-27">
							{{ balancedCurrency(pool.userLiquidity) }} $
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
					<p class="fs-24 q-mb-14">{{ balancedCurrency(lpLiquidity) }} $</p>
					<StandardButton @click="openBondModal = true">
						Start Earning
					</StandardButton>
				</div>
		</div>
		<div class="row q-col-gutter-xl items-center q-mb-80">
			<div class="col-8 !w-md-1/3" v-for="unbonding in pool.lockableDurationApr">
					<ExpandableCard transparency="5">
							<p class="fs-12 opacity-30 q-mb-16 text-uppercase">{{ unbonding.readableDuration }} unbonding</p>
							<div class="q-mb-20">
									<p class="fs-36 q-mb-8">{{ percentage(unbonding.apr) }} %</p>
									<div class="flex items-center">
											<p class="text-primary fs-14 q-mr-16 text-weight-medium">External Incentives Pool</p>
											<template v-for="gauge in unbonding.extraGagues">
												<q-avatar
													class="q-mr-9"
													size="24px"
													v-for="(coin, index) in gauge.coins" :key="index"
												>
													<img :src="coin.token?.logos.default">
												</q-avatar>
											</template>
									</div>
							</div>
							<p class="fs-12 opacity-40 font-weight-regular q-mb-20">
									BitSong Launchpad is the platform where you can buy and. Incentives for 22 epochs.
							</p>
							<div class="flex no-wrap items-center text-weight-medium">
									<div class="q-mr-21">
											<p class="fs-12 text-uppercase opacity-50 q-mb-8">
													Start
											</p>
											<p class="fs-18 text-no-wrap">{{ formatEpochDate(unbonding.extraGagues[0].start_time) }}</p>
									</div>
									<Progress :height="6" :value="unbonding.extraGagues[0].filledEpochs" :max="unbonding.extraGagues[0].numEpochsPaidOver"></Progress>
									<div class="q-ml-21">
											<p class="fs-12 text-uppercase text-right opacity-50 q-mb-8">
													End
											</p>
											<p class="fs-18 text-no-wrap">{{ formatEpochDate(unbonding.extraGagues[0].endTime) }}</p>
									</div>
							</div>
							<template #extra>
									<div v-for="gauge in unbonding.extraGagues" :key="gauge.id">
											<div v-for="(coin, index) in gauge.coins" :key="index" class="rounded-20 border-primary-light q-pa-18 flex items-center q-mb-6">
											<q-avatar
												class="q-mr-18"
												size="25px"
											>
												<img :src="coin.token?.logos.default" alt="">
											</q-avatar>
											<div class="flex-1">
												<div class="flex no-wrap items-center q-mb-10">
													<p class="fs-14 text-weight-medium q-mr-30">{{ coin.token?.symbol }}</p>
													<Progress :height="6" :value="gauge.filledEpochs" :max="gauge.numEpochsPaidOver"></Progress>
													<p class="fs-14 text-weight-medium q-ml-22 text-no-wrap">
														{{ gauge.leftEpochs }} epochs left
													</p>
												</div>
												<div class="flex justify-between items-center">
													<p class="fs-10 text-primary text-uppercase text-weight-medium">
														Incentive <span class="text-white">{{balancedCurrency(coin.amount)}}</span> {{ coin.token?.symbol }}
													</p>
													<!-- <div class="flex">
														<p class="q-mr-12 opacity-30">APR</p>
														<p>{{percentage(81.9)}} %</p>
													</div> -->
												</div>
											</div>
										</div>
									</div>
							</template>
					</ExpandableCard>
			</div>
		</div>
		<p class="fs-18 q-mb-30">My Bondings</p>
		<LightTable :rows="pool.lockableDurationApr" :columns="columns">
			<template v-slot:body-cell-unbond="props">
					<q-td :props="props">
						<template v-if="props.row.lockedLonger">
							<span class="text-primary text-weight-medium cursor-pointer" v-if="!unboundingEndTimeStart(props.row.lockedLonger.end_time)" @click="beginUnlocking(props.row.lockedLonger.ID)">
								Unbond all
							</span>
							<span class="text-white opacity-20 text-weight-medium" v-else>
								{{ fromNow(props.row.lockedLonger.end_time) }}
							</span>
						</template>
						<span class="text-white opacity-20 text-weight-medium" v-else>
							Unbond all
						</span>
					</q-td>
			</template>
		</LightTable>

		<BondModal v-model="openBondModal" :pool="pool" />
	</div>
</template>