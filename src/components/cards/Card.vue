<script setup lang="ts">
    import { computed } from 'vue'

    const props = defineProps<{
        transparency: number,
    }>()

    const classes = computed(() =>
    {
        return "bg-white-" + (props.transparency ? props.transparency : 10) + " q-pa-22 rounded-20 inline-block full-width"
    })
</script>
<template>
    <div :class="classes">
        <slot></slot>
    </div>
</template>