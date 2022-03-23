<script setup lang="ts">
    import { computed } from "vue";
import StandardButton from "./StandardButton.vue"

    const props = defineProps<{
        fit?: boolean,
        paddingY? : number,
    }>()
    const paddingClass = "q-py-" + (props.paddingY ? props.paddingY : 20)
</script>

<template>
    <StandardButton :class="'fs-16 text-center ' + paddingClass + ' ' + (fit ? 'w-fit q-px-40' : 'full-width')">
        <slot></slot>
    </StandardButton>
</template>