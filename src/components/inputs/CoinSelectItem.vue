<script setup lang="ts">
    import { balancedCurrency } from '@/common/numbers';
    import { UserCoinInfo } from '@/types/user'

    defineProps<{
        coin: UserCoinInfo,
    }>()
</script>

<template>
    <q-item class="full-width q-pa-0">
        <div class="flex-1 flex justify-between items-center q-py-12 no-wrap">
            <div>
                <p class="fs-15 q-mb-4 text-white">{{coin.coin.name}}</p>
                <p class="fs-12 text-dark">{{balancedCurrency(coin.total)}} {{coin.coin.symbol}}</p>
            </div>
            <div>
                <q-avatar
                    size="40px"
                    class="q-mr-22">
                    <img :src="coin.coin.iconUrl" alt="">
                </q-avatar>
            </div>
        </div>
    </q-item>
</template>