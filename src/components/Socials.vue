<script setup lang="ts">
    import { resolveIcon } from '@/common/resolvers'
    const props = defineProps<{
        socials?: object,
    }>()
</script>

<template>
    <div class="flex">
        <div v-for="(url, social) in socials" class="q-mr-24">
            <a :href="url" target="_BLANK" class="fs-24 opacity-30 hover:opacity-100 text-white">
                <q-icon :name="resolveIcon(social, 30, 30)"></q-icon>
            </a>
        </div>
    </div>
</template>