<script setup lang="ts">
    const props = defineProps(['label'])
</script>
<template>
    <q-btn
        rounded
        color="primary"
        size="sm"
        :label="props.label"
    />
</template>