<script setup lang="ts">
    import { newCoin } from '@/common/mockups';
    import { Coin } from '@/types/coin';
    import Title from '../typography/Title.vue';
    import WideCard from '../cards/WideCard.vue';
    const btsg:Coin = newCoin("BTSG");
</script>

<template>
    <Title class="q-mb-36">Assets</Title>
    <div class="row font-weight-medium">
        <div class="col-3">
            <WideCard>
                <p class="fs-10 opacity-50 q-mb-12 uppercase">
                    Total assets
                </p>
                <p class="fs-24">
                    {{}}
                </p>
            </WideCard>
        </div>
    </div>
</template>