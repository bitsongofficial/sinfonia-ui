<script setup lang="ts">
    import { resolveIcon } from '@/common/resolvers'
    const props = defineProps<{
        socials?: object,
    }>()
</script>

<template>
    <div class="flex justify-between">
        <div v-for="(url, social) in socials">
            <a :href="url" class="fs-24 opacity-30 hover:opacity-100 text-white">
                <q-icon :name="resolveIcon(social, 25, 25, 'socials')"></q-icon>
            </a>
        </div>
    </div>
</template>