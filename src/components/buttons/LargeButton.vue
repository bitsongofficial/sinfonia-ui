<script setup lang="ts">
    import StandardButton from "./StandardButton.vue"

    const props = defineProps<{
        fit?: boolean,
    }>()
</script>

<template>
    <StandardButton :class="'fs-16 q-py-20 text-center' + (fit ? 'w-fit q-px-40 q-py-16' : 'full-width')">
        <slot></slot>
    </StandardButton>
</template>