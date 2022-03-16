<script setup lang="ts">
    import {Pool} from "@/types/pool"
    import IconButton from "../buttons/IconButton.vue"
    import {balancedCurrency, percentage} from "@/common/numbers"

    const props = defineProps<
        {
            pool: Pool
        }>()
</script>

<template>
    <div class="row q-mb-34">
        <div class="col-4">
            <div class="q-pr-24">
                <div class="relative-position w-fit">
                    <q-img
                        :src="props.pool.coin1.iconUrl"
                        class="s-60 rounded cover"
                        fit="cover"
                    />
                    <div class="absolute right-0 bottom-0">
                        <q-img
                            :src="props.pool.coin2.iconUrl"
                            class="s-22 rounded cover"
                            fit="cover"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="col-4">
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
        <div class="col-4">
            <p class="fs-10 font-weight-medium opacity-40 q-pb-10">APR</p>
            <p class="fs-16 font-weight-medium">{{percentage(props.pool.APR)}} %</p>
        </div>
        <div class="col-4">
            <p class="fs-10 font-weight-medium opacity-40 q-pb-10">Liquidity</p>
            <p class="fs-16 font-weight-medium text-no-wrap">{{balancedCurrency(props.pool.liquidity)}} $</p>
        </div>
    </div>
</template>