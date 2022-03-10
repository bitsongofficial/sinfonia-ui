<script setup lang="ts">
    import {resolveIcon} from "@/common/resolvers"
</script>
<template>
    <div class="row items-center bg-rounded-translucent q-px-lg q-py-sm no-wrap w-fit">
        <q-icon :name="resolveIcon('arrow-right')" size="sm" class="q-mr-lg rotate-180"></q-icon>
        <div class="q-mr-md">
            <p class="q-ml-sm text-uppercase q-mb-none text-caption">Address</p>
            <p class="text-weight-bold text-subtitle1 q-mb-none">bitsong1...u085</p>
        </div>
        <q-icon name="svguse:icons.svg#copy" size="sm"></q-icon>
    </div>
</template>