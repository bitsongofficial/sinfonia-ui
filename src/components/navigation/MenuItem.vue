<script setup lang="ts">
    const props = defineProps(['icon'])
    const icon = "svguse:icons.svg#" + props.icon
</script>
<template>
    <div class="relative-position menu-item">
        <q-icon :name="icon" size="sm"></q-icon>
        <div class="absolute">
            <slot></slot>
        </div>
    </div>
</template>