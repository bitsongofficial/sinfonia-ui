<script setup lang="ts">import { computed } from 'vue';

    const props = defineProps<{
        image1: string,
        image2: string,
        size?: number,
        smallerSize? : number,
        offset?: number[],
    }>()

    const sizeClass = computed(() => ('s-' + (props.size ? props.size : 60)))
    const smallerSizeClass = computed(() => {
        return 's-' + (props.smallerSize ? props.smallerSize : Math.round((props.size ? props.size : 60)/2.9))
    })
    const style = props.offset ? {
        right: props.offset[0] + "px",
        bottom: props.offset[1] + "px",
    } : {}
</script>

<template>
    <div class="relative-position w-fit">
        <q-img
            :src="image1"
            :class="'rounded cover ' + sizeClass"
            fit="cover"
        />
        <div class="absolute right-0 bottom-0" :style="style">
            <q-img
                :src="image2"
                :class="'rounded cover ' + smallerSizeClass"
                fit="cover"
            />
        </div>
    </div>
</template>