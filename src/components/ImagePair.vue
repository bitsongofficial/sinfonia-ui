<script setup lang="ts">
    const props = defineProps<{
        image1: string,
        image2: string,
    }>()
</script>

<template>
    <div class="relative-position w-fit">
        <q-img
            :src="image1"
            class="s-60 rounded cover"
            fit="cover"
        />
        <div class="absolute right-0 bottom-0">
            <q-img
                :src="image2"
                class="s-22 rounded cover"
                fit="cover"
            />
        </div>
    </div>
</template>