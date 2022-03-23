<script setup lang="ts">
    import { PoolUser, UserPoolView } from '@/types/pool';
import { UserCoinInfo } from '@/types/user';
    import { computed, ref } from 'vue'
    import ModalWithClose from './ModalWithClose.vue'
    import Amount from '../inputs/Amount.vue';
import PercentageWithImage from '../infographics/PercentageWithImage.vue';
import { balancedCurrency, percentage } from '@/common/numbers';
import { resolveIcon } from '@/common/resolvers';
import LargeButton from '../buttons/LargeButton.vue';
import Progress from '../Progress.vue';

    const props = defineProps<{
        pool: UserPoolView,
    }>()

    const add = ref(true)
    const amountInternal = ref(0)
    const single = ref(false)
    const amount1 = computed({
        get():any {
            return (amountInternal.value).toFixed(0)
        },
        set(value: any) {
            amountInternal.value = value
        }
    })
    const amount2 = computed({
        get():any {
            return (props.pool.pool.liquidity - amountInternal.value).toFixed(0)
        },
        set(value: any) {
            amountInternal.value = props.pool.pool.liquidity - value
        }
    })
    const removeValues = [0.25, 0.5, 0.75, 1]
    const removePercent = ref(removeValues[2])
</script>

<template>
    <ModalWithClose title="Manage Liquidity">
        <div class="flex fs-15 q-mb-22">
            <p :class="(add ? '' : 'text-dark') + ' cursor-pointer q-mr-27'" @click="add = true">Add Liquidity</p>
            <p :class="(add ? 'text-dark' : '') + ' cursor-pointer'" @click="add = false">Remove Liquidity</p>
        </div>
        <div v-if="add">
            <div class="q-mb-21">
                <div class="flex items-center no-wrap q-mb-9">
                    <Amount v-model="amount1" class="q-mr-24 "></Amount>
                    <div class="flex items-center no-wrap">
                        <div class="font-weight-medium text-right q-mr-16">
                            <p class="fs-12 text-dark q-mb-6">{{pool.pool.coin1.symbol}}</p>
                            <p class="fs-21 text-no-wrap">{{percentage(pool.pool.coin1Percentage * 100)}} %</p>
                        </div>
                        <PercentageWithImage :value="pool.pool.coin1Percentage * 100" :image="pool.pool.coin1.iconUrl" negative></PercentageWithImage>
                    </div>
                </div>
                <p class="fs-12 text-dark q-ml-20">Available <span class="text-white">{{balancedCurrency(pool.user.liquidity - pool.user.bonded)}}</span> {{pool.pool.coin1.symbol}}</p>
            </div>
            <div v-if="!single" class="q-mb-21">
                <div class="flex items-center no-wrap q-mb-9">
                    <Amount v-model="amount2" class="q-mr-24 "></Amount>
                    <div class="flex items-center no-wrap">
                        <div class="font-weight-medium text-right q-mr-16">
                            <p class="fs-12 text-dark q-mb-6">{{pool.pool.coin2.symbol}}</p>
                            <p class="fs-21 text-no-wrap">{{percentage((1 - pool.pool.coin1Percentage) * 100)}} %</p>
                        </div>
                        <PercentageWithImage :value="(1 - pool.pool.coin1Percentage) * 100" :image="pool.pool.coin2.iconUrl"></PercentageWithImage>
                    </div>
                </div>
                <p class="fs-12 text-dark q-ml-20">Available <span class="text-white">{{balancedCurrency(pool.user.liquidity - pool.user.bonded)}}</span> {{pool.pool.coin2.symbol}}</p>
            </div>
            <div v-else class="q-mb-46 relative-position group cursor-pointer">
                <div class="absolute-full rounded-20 bg-dark opacity-20 group-hover:opacity-40">

                </div>
                <p class="text-center fs-12 q-pa-12 font-weight-medium">Change token</p>
            </div>
            <div class="flex justify-between no-wrap">
                <div class="q-mr-20 flex no-wrap items-center">
                    <q-toggle
                        v-model="single"
                        color="white"
                        class="q-mr-8"
                    />
                    <p class="fs-12 font-weight-medium q-mr-12">
                        Single Asset LP
                    </p>
                    <q-icon :name="resolveIcon('info', 15, 15)" class="text-dark cursor-pointer">

                    </q-icon>
                </div>
                <div>
                    <LargeButton fit :padding-y="14">
                        <span class="text-uppercase">
                            Add liquidity
                        </span>
                    </LargeButton>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="flex justify-center q-mb-28">
                <div class="rounded-100 border-gradient-primary w-fit q-px-42 q-py-20">
                    <p class="fs-44">
                        {{removePercent * 100}} %
                    </p>
                </div>
            </div>
            <Progress :progress="removePercent" class="q-mb-16"></Progress>
            <div class="rounded-20 overflow-hidden relative-position font-weight-medium row q-mb-20">
                <div :class="'absolute-full bg-primary-dark rounded-20 opacity-30 w-' + (removeValues.indexOf(removePercent) + 1) + '/4'">

                </div>
                <div v-for="rm in removeValues" class="col-2 rounded-20 q-px-32 q-py-18 relative-position cursor-pointer" @click="removePercent = rm">
                    <template v-if="rm == removePercent">
                        <div class="absolute-full bg-primary-dark opacity-50 rounded-20 -z-1">

                        </div>
                        <p>{{rm * 100}}%</p>
                    </template>
                    <p v-else="rm == removePercent" class="text-dark opacity-50">{{rm * 100}}%</p>
                </div>
            </div>
            <div class="flex justify-center">
                <LargeButton fit :padding-y="14" class="q-px-52">
                    <span class="text-uppercase">
                        Remove liquidity
                    </span>
                </LargeButton>
            </div>
        </div>
    </ModalWithClose>
</template>