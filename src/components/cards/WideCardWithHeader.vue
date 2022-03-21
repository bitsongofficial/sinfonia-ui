<script setup lang="ts">
    import CardWithHeader from './CardWithHeader.vue'

    const props = defineProps<{
        header?: string
    }>()
</script>

<template>
    <CardWithHeader class="full-width q-px-30" :header="header" :padding="20">
        <slot></slot>
    </CardWithHeader>
</template>