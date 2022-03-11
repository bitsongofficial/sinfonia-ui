<script setup lang="ts">
import { resolveIcon } from '@/common/resolvers';
import { RouterLink } from "vue-router"
import IconButton from '../buttons/IconButton.vue';

    const props = defineProps(['icon', 'width', 'height', 'url'])
    const icon = props.icon
    const width = props.width ? props.width : 20
    const height = props.height ? props.height : 20
    const url = props.url ? props.url : "/"
</script>
<template>
    <div class="menu-item">
        <RouterLink :to="url" class="relative-position row items-center">
            <IconButton :icon="icon" :width="width" :height="height" class="fs-20 min-s-36"></IconButton>
            <div class="absolute text-white">
                <slot></slot>
            </div>
        </RouterLink>
    </div>
</template>