<script setup lang="ts">
    const props = defineProps(['label'])
</script>
<template>
    <q-btn
        rounded
        size="sm"
        :label="props.label"
        class="bg-gradient"
    />
</template>