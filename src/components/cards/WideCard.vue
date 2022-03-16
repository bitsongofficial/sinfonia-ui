<script setup lang="ts">
import Card from './Card.vue';
</script>

<template>
    <Card class="full-width q-px-30" :padding="20">
        <slot></slot>
    </Card>
</template>