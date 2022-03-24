<script setup lang="ts">
    import { resolveIcon } from '@/common/resolvers'
</script>

<template>
    <q-tooltip>
        <div class="q-mb-10 text-primary">
            <q-icon size="12px" :name="resolveIcon('info', 15, 15)"></q-icon>
        </div>
        <p>
            <slot></slot>
        </p>
    </q-tooltip>
</template>