<script setup lang="ts">
    import { newMyPool } from '@/common/mockups'
    import ImagePair from '../ImagePair.vue'
    import OutlineButton from '../buttons/OutlineButton.vue'
    import StandardButton from '../buttons/StandardButton.vue'
    import CardWithHeader from '../cards/CardWithHeader.vue'
    import PercentageWithImage from '../infographics/PercentageWithImage.vue'
    import { balancedCurrency, percentage } from '@/common/numbers'
    import InfoCard from '../cards/InfoCard.vue'
    import ExpandableCard from '../cards/ExpandableCard.vue'
    import Progress from '../Progress.vue'
    import LightTable from '../LightTable.vue'
    import { TableColumn } from '@/types/table'

    const userPool = newMyPool()
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
    <div class="text-white font-weight-medium">
        <div class="q-mb-90 flex justify-between items-center">
            <div class="flex">
                <ImagePair
                    :image1="userPool.pool.coin1.iconUrl"
                    :image2="userPool.pool.coin2.iconUrl"
                    class="q-mr-20"
                >
                </ImagePair>
                <h1 class="fs-27">{{userPool.pool.name}}: {{userPool.pool.coin1.symbol}}/{{userPool.pool.coin2.symbol}}</h1>
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
                    <div class="flex justify-between q-pt-15 q-mb-40">
                        <div class="flex">
                            <PercentageWithImage class="q-mr-22" :image="userPool.pool.coin1.iconUrl" :value="userPool.pool.coin1Percentage * 100">
                            </PercentageWithImage>
                            <div>
                                <p class="fs-21 q-mb-14">{{balancedCurrency(userPool.pool.liquidity * userPool.pool.coin1Percentage)}}</p>
                                <p class="fs-14">{{percentage(userPool.pool.coin1Percentage * 100)}} %</p>
                            </div>
                        </div>
                        <p class="fs-12 opacity-50">{{userPool.pool.coin1.symbol}}</p>
                    </div>
                    <div class="flex justify-between">
                        <div class="flex">
                            <PercentageWithImage class="q-mr-22" negative :image="userPool.pool.coin2.iconUrl" :value="100 - userPool.pool.coin1Percentage * 100">
                            </PercentageWithImage>
                            <div>
                                <p class="fs-21 q-mb-14">{{balancedCurrency(userPool.pool.liquidity * (1 - userPool.pool.coin1Percentage))}}</p>
                                <p class="fs-14">{{percentage((1 - userPool.pool.coin1Percentage) * 100)}} %</p>
                            </div>
                        </div>
                        <p class="fs-12 opacity-50">{{userPool.pool.coin2.symbol}}</p>
                    </div>
                </CardWithHeader>
            </div>
            <div class="col-2">
                <InfoCard header="Pool liquidity" class="q-mb-27">
                    {{balancedCurrency(userPool.pool.liquidity)}} $
                </InfoCard>
                <InfoCard header="Bonded">
                    {{balancedCurrency(userPool.user.bonded)}} $
                </InfoCard>
            </div>
            <div class="col-2">
                <InfoCard header="My liquidity" class="q-mb-27">
                    {{balancedCurrency(userPool.user.liquidity)}} $
                </InfoCard>
                <InfoCard header="Swap fee">
                    {{percentage(userPool.pool.swapFee)}} %
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
                    <div class="q-mb-20">
                        <p class="fs-36 q-mb-8">{{percentage(unbonding.apr)}}</p>
                        <div class="flex items-center">
                            <p class="text-primary fs-14 q-mr-16 font-weight-medium">External Incentives Pool</p>
                            <q-avatar
                                class="q-mr-9"
                                size="24px"
                            >
                                <img :src="userPool.pool.coin1.iconUrl" alt="">
                            </q-avatar>
                            <q-avatar
                                class="q-mr-9"
                                size="24px"
                            >
                                <img :src="userPool.pool.coin2.iconUrl" alt="">
                            </q-avatar>
                        </div>
                    </div>
                    <p class="fs-12 opacity-40 font-weight-regular q-mb-20">
                        BitSong Launchpad is the platform where you can buy and. Incentives for 22 epochs.
                    </p>
                    <div class="flex no-wrap items-center font-weight-medium">
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
                        <div v-for="coin in [userPool.pool.coin1, userPool.pool.coin2]" class="rounded-20 border-primary-light q-pa-18 flex items-center q-mb-6">
                            <q-avatar
                                class="q-mr-18"
                                size="25px"
                            >
                                <img :src="coin.iconUrl" alt="">
                            </q-avatar>
                            <div class="flex-1">
                                <div class="flex no-wrap items-center q-mb-10">
                                    <p class="fs-14 font-weight-medium q-mr-30">BTSG</p>
                                    <Progress :height="6" :value="unbonding.value" :max="unbonding.max"></Progress>
                                    <p class="fs-14 font-weight-medium q-ml-22 text-no-wrap">
                                        18 epochs left
                                    </p>
                                </div>
                                <div class="flex justify-between items-center">
                                    <p class="fs-10 text-primary text-uppercase font-weight-medium">
                                        Incentive <span class="text-white">{{balancedCurrency(100000)}}</span> {{coin.symbol}}
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