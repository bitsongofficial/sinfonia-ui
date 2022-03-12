<script setup lang="ts">
    import {Pool} from "@/types/pool"
    import IconButton from "../buttons/IconButton.vue";

    const props = defineProps<
        {
            pool: Pool
        }>()
</script>

<template>
    <div class="row q-mb-34">
        <div class="col-6">
            <div class="q-pr-24">
                <q-img
                    :src="props.pool.coin1.iconUrl"
                    class="s-60 q-mr-20 rounded cover"
                    fit="cover"
                />
            </div>
        </div>
        <div class="col-6">
            <div class="row justify-between no-wrap">
                <div>
                    <p class="fs-10 opacity-40 font-weight-medium q-mb-8">
                        {{props.pool.name}}
                    </p>
                    <p class="fs-16 font-weight-bold w-fit">
                        {{props.pool.coin1.symbol}}
                    </p>
                    <div class="separator q-my-4"></div>
                    <p class="fs-16 font-weight-bold w-fit">
                        {{props.pool.coin2.symbol}}
                    </p>
                </div>
                <div>
                    <IconButton icon="vertical-dots" width="4" height="16" class="fs-14 s-0"></IconButton>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-6">
            <p class="fs-10 font-weight-medium opacity-40 q-pb-10">APR</p>
            <p class="fs-16 font-weight-medium">{{props.pool.APR}} %</p>
        </div>
        <div class="col-6">
            <p class="fs-10 font-weight-medium opacity-40 q-pb-10">Liquidity</p>
            <p class="fs-16 font-weight-medium">{{props.pool.liquidity}}</p>
        </div>
    </div>
</template>