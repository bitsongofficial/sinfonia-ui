<script setup lang="ts">
    import { newCoin } from '@/common/mockups';
import { percentage } from '@/common/numbers';
import { resolveIcon } from '@/common/resolvers';
import { ref } from 'vue'
    import ModalWithClose from './ModalWithClose.vue'
import Amount from '../inputs/Amount.vue';
import LargeButton from '../buttons/LargeButton.vue';

    const unbondingPeriods = [
        {
            label: "one day",
            apr: 0.456,
        },
        {
            label: "7 days",
            apr: 0.839,
        },
        {
            label: "14 days",
            apr: 1.066,
        },
    ]
    const chosenUnbonding = ref(unbondingPeriods[2])
    const coin = newCoin("BIT/2")
    const amount = ref(0)
</script>

<template>
    <ModalWithClose title="Bond LP Tokens">
        <div class="q-mb-20 flex items-center text-dark">
            <p class="fs-14 q-mr-10">
                Select Unbonding Period
            </p>
            <q-icon :name="resolveIcon('info', 15, 15)" size="10px"></q-icon>
        </div>
        <div class="row row-cols-3 q-col-gutter-md q-mb-27">
            <div v-for="up in unbondingPeriods" class="col">
                <div @click="chosenUnbonding = up" :class="'rounded-20 q-py-16 q-px-16 flex justify-center items-center full-height cursor-pointer ' + (up.apr == chosenUnbonding.apr ? 'bg-gradient' : 'border-primary-darker hover:bg-white-5')">
                    <div>
                        <p class="fs-18 q-mb-8 text-center">{{up.label}}</p>
                        <p :class="'fs-15 text-center ' + (up.apr == chosenUnbonding.apr ? 'text-primary-dark-700' : 'text-dark')">{{percentage(up.apr * 100)}} %</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-between items-center q-mb-16">
            <p class="fs-14 text-dark q-mr-20">Amount to bond</p>
            <div class="flex fs-12 text-dark">
                <p class="q-mr-8">
                    Available
                </p>
                <p>
                    <span class="text-white">20.45</span>
                    {{coin.symbol}}
                </p>
            </div>
        </div>
        <Amount v-model="amount" class="q-mb-22"></Amount>
        <div class="flex justify-center">
            <LargeButton fit :padding-y="16" class="q-px-66">
                <span class="text-uppercase">
                    Bond tokens
                </span>
            </LargeButton>
        </div>
    </ModalWithClose>
</template>