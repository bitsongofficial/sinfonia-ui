<script setup lang="ts">
import { resolveIcon } from '@/common/resolvers';
import IconButton from '../buttons/IconButton.vue';

    const props = defineProps(['icon', 'width', 'height'])
    const icon = props.icon
    const width = props.width ? props.width : 20
    const height = props.height ? props.height : 20
</script>
<template>
    <div class="relative-position menu-item">
        <IconButton :icon="icon" :width="width" :height="height"></IconButton>
        <div class="absolute">
            <slot></slot>
        </div>
    </div>
</template>