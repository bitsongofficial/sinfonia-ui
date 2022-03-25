<script setup lang="ts">
    import {Pool} from "@/types/pool"
    import {balancedCurrency, percentage} from "@/common/numbers"
    import ImagePair from "../ImagePair.vue"
    import { resolveIcon } from "@/common/resolvers"
    import { ref } from "vue";
    import PoolContextMenu from "../navigation/PoolContextMenu.vue";

    const props = defineProps<{
		pool: Pool
	}>()
    const show = ref(false)
</script>

<template>
    <div class="row q-mb-34">
        <div class="col-4">
            <div class="q-pr-24">
                <ImagePair
                   :image1="props.pool.coin1?.token.logos.default"
                   :image2="props.pool.coin2?.token.logos.default">
                </ImagePair>
            </div>
        </div>
        <div class="col-4 q-ml--12">
            <div class="row justify-between no-wrap">
                <div>
                    <p class="fs-12 opacity-40 text-weight-medium q-mb-8">
                        Pool {{ props.pool.id }}
                    </p>
                    <p v-if="props.pool.coin1" class="fs-16 font-weight-bold w-fit">
                        {{ props.pool.coin1.token.symbol }}
                    </p>
                    <div class="separator q-my-4"></div>
                    <p v-if="props.pool.coin2" class="fs-16 font-weight-bold w-fit">
                        {{ props.pool.coin2.token.symbol }}
                    </p>
                </div>
                <div class="q-mr--12" @click.native.prevent="show = true">
                    <q-icon :name="resolveIcon('vertical-dots', 4, 16)" class="fs-14 s-28 q-mr--12 opacity-30 hover:opacity-100"></q-icon>
                    <PoolContextMenu v-model="show"></PoolContextMenu>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-4">
            <p class="fs-12 text-weight-medium opacity-40 q-pb-10">APR</p>
            <p class="fs-16 text-weight-medium">{{percentage(props.pool.APR)}} %</p>
        </div>
        <div class="col-4 q-ml--12">
            <p class="fs-12 text-weight-medium opacity-40 q-pb-10">Liquidity</p>
            <p class="fs-16 text-weight-medium text-no-wrap">{{balancedCurrency(props.pool.liquidity)}} $</p>
        </div>
    </div>
</template>