<script setup lang="ts">
    import { computed } from 'vue'

    const props = defineProps<{
        percentage?: number,
        progress?: number,
        value?: number,
        max?: number,
        height?: number,
    }>()

    const actualProgress = computed(() =>
    {
        if(props.progress) return props.progress
        if(props.percentage) return props.percentage / 100
        if(props.value && props.max) return props.value / props.max
        return 0
    })
    const heightValue = (props.height ? props.height : 8) + "px"
</script>

<template>
    <q-linear-progress :size="heightValue" :value="actualProgress" class="gradient-progress rounded" />
</template>