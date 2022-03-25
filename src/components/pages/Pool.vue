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
	import { computed, onMounted, onUnmounted, ref } from 'vue'

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
    const compositionGraphStyle = ref({width: "0"})
    const heightRef = ref<HTMLElement | null>(null)

    const setSize = () =>
    {
        if(heightRef.value)
        {
            compositionGraphStyle.value.width = heightRef.value.clientHeight - 5 + "px"
			return true
        }
		return false
    }
	const untilSetSize = () =>
	{
		const res = setSize()
		if(!res)
		{
			setTimeout(untilSetSize, 200)
		}
	}

	onMounted(() => {
		window.addEventListener("resize", setSize)
		untilSetSize()
	})

	onUnmounted(() =>
	{
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
						<p class="fs-24 q-mb-14">{{124}} $</p>
						<StandardButton>
								Start Earning
						</StandardButton>
				</div>
		</div>
		<div class="row q-col-gutter-xl items-center q-mb-80">
            <div class="col-8 !w-md-1/3" v-for="unbonding in unbondings">
                <ExpandableCard transparency="5">
                    <p class="fs-12 opacity-30 q-mb-16 text-uppercase">{{unbonding.title}} unbonding</p>
                    <div class="q-mb-20">
                        <p class="fs-36 q-mb-8">{{percentage(unbonding.apr)}}</p>
                        <div class="flex items-center">
                            <p class="text-primary fs-14 q-mr-16 text-weight-medium">External Incentives Pool</p>
                            <q-avatar
                                class="q-mr-9"
                                size="24px"
                            >
                                <img :src="pool.coin1?.token.logos.default" alt="">
                            </q-avatar>
                            <q-avatar
                                class="q-mr-9"
                                size="24px"
                            >
                                <img :src="pool.coin2?.token.logos.default" alt="">
                            </q-avatar>
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
                            <p class="fs-18 text-no-wrap">22 Feb</p>
                        </div>
                        <Progress :height="12" :value="unbonding.value" :max="unbonding.max"></Progress>
                        <div class="q-ml-21">
                            <p class="fs-12 text-uppercase text-right opacity-50 q-mb-8">
                                End
                            </p>
                            <p class="fs-18 text-no-wrap">22 Mar</p>
                        </div>
                    </div>
                    <template #extra>
                        <div v-for="coin in [pool.coin1, pool.coin2]" class="rounded-20 border-primary-light q-pa-18 flex items-center q-mb-6">
                            <q-avatar
                                class="q-mr-18"
                                size="25px"
                            >
                                <img :src="coin?.token.logos.default" alt="">
                            </q-avatar>
                            <div class="flex-1">
                                <div class="flex no-wrap items-center q-mb-10">
                                    <p class="fs-14 text-weight-medium q-mr-30">{{ coin?.token.symbol }}</p>
                                    <Progress :height="6" :value="unbonding.value" :max="unbonding.max"></Progress>
                                    <p class="fs-14 text-weight-medium q-ml-22 text-no-wrap">
                                        18 epochs left
                                    </p>
                                </div>
                                <div class="flex justify-between items-center">
                                    <p class="fs-10 text-primary text-uppercase text-weight-medium">
                                        Incentive <span class="text-white">{{balancedCurrency(100000)}}</span> {{ coin?.token.symbol }}
                                    </p>
                                    <div class="flex">
                                        <p class="q-mr-12 opacity-30">APR</p>
                                        <p>{{percentage(81.9)}} %</p>
                                    </div>
                                </div>
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