<script setup lang="ts">
    import { computed } from 'vue'

    const props = defineProps<{
        percentage?: number,
        progress?: number,
        value?: number,
        max?: number,
    }>()

    const actualProgress = computed(() =>
    {
        if(props.progress) return props.progress
        if(props.percentage) return props.percentage / 100
        if(props.value && props.max) return props.value / props.max
        return 0
    })
</script>

<template>
    <q-linear-progress size="8px" :value="actualProgress" class="gradient-progress rounded" />
</template>