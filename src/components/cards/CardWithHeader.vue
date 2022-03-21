<script setup lang="ts">
    import Card from './Card.vue'

    const props = defineProps<{
        header?: string,
        padding?: number,
    }>()
</script>

<template>
    <Card :padding="padding">
        <p class="fs-10 opacity-50 q-mb-30 text-uppercase">
            {{header}}
        </p>
        <div>
            <slot></slot>
        </div>
    </Card>
</template>