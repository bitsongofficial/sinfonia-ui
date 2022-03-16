<script setup lang="ts">
    import { computed } from 'vue'

    const props = defineProps<{
        transparency?: string | number | undefined,
        padding?: number | undefined,
    }>()

    const classes = computed(() =>
    {
        return "bg-white-" + (props.transparency ? props.transparency : 10) + " q-pa-" + (props.padding !== undefined ? props.padding : 22) + " shadow-20 rounded-20 inline-block full-width"
    })
</script>
<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>