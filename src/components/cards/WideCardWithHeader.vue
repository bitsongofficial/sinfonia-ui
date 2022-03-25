<script setup lang="ts">
    import CardWithHeader from './CardWithHeader.vue'

    const props = defineProps<{
        header?: string,
        padding?: number,
    }>()
</script>

<template>
    <CardWithHeader class="full-width q-px-30" :header="header" :padding="padding ? padding : 20">
        <slot></slot>
    </CardWithHeader>
</template>