<script setup lang="ts">
    const props = defineProps<{
        fontSize?: number
    }>()
    const fontSizeClass = 'fs-' + (props.fontSize ? props.fontSize : '27')
</script>

<template>
    <p :class="fontSizeClass + ' text-weight-medium'">
        <slot></slot>
    </p>
</template>