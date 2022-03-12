<script setup lang="ts">
    import { Pool, UserPoolView } from '@/types/pool'
    import Title from '@/components/typography/Title.vue'
    import PoolHeader from '@/components/pools/PoolHeader.vue'
    import Card from '@/components/Card.vue'
    import {balancedCurrency} from "@/common/numbers"
    const newCoin = (symbol: string) =>
    {
        return {
            name: "",
            symbol,
            iconUrl: "https://i.scdn.co/image/ab6761610000e5eb608e188abbae6409698b8f5a",
            price: Math.random() * 1.5,
            marketCap: Math.random() * 15000000000,
            volumeLastDay: Math.random() * 60000000,
            lastDayGain: (Math.random() - 0.5) * 20,
        }
    }

    const newPool = ():Pool =>
    {
        return {
            name: "Pool 2",
            coin1: newCoin("$CLAY"),
            coin2: newCoin("BTSG"),
            APR: Math.random() * 110,
            liquidity: Math.random() * 20000000,
            swapFee: 0,
        }
    }

    const newMyPool = (): UserPoolView =>
    {
        return {
            pool: newPool(),
            user: {liquidity: 0, bonded: Math.random()*1500}
        }
    }

    const myPools = [newMyPool()]
    const pools = [newPool(), newPool(), newPool()]
</script>

<template>
    <Title class="q-mb-50">Your Pools</Title>
    <div class="row q-mb-72 q-gutter-lg">
        <div v-for="userPool in myPools" class="col-3">
            <Card class="full-width cursor-pointer">
                <PoolHeader :pool="userPool.pool">

                </PoolHeader>
                <div class="separator-light q-my-20"></div>
                <div class="row">
                    <div class="col-6">
                        <p class="fs-10 font-weight-medium opacity-40 q-pb-10">My Liquidity</p>
                        <p class="fs-16 font-weight-medium text-no-wrap">{{balancedCurrency(userPool.user.liquidity)}} $</p>
                    </div>
                    <div class="col-6">
                        <p class="fs-10 font-weight-medium opacity-40 q-pb-10">My Bonded Tokens</p>
                        <p class="fs-16 font-weight-medium text-no-wrap">{{balancedCurrency(userPool.user.bonded)}} $</p>
                    </div>
                </div>
            </Card>
        </div>
    </div>
    <Title class="q-mb-50">All Pools</Title>
    <div class="row q-gutter-lg">
        <div v-for="pool in pools" class="col-3">
            <Card class="full-width cursor-pointer">
                <PoolHeader :pool="pool">

                </PoolHeader>
            </Card>
        </div>
    </div>
</template>