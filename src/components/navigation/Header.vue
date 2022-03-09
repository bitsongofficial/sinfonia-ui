<script setup lang="ts">
    import { ref } from 'vue';
    import Logo from '@/components/Logo.vue';

    const first = ref(true);
</script>
<template>
    <div class="row justify-between items-center">
        <Logo></Logo>
        <div class="row items-center">
            <q-icon name="svguse:icons.svg#setting" size="sm" class="q-mr-lg"></q-icon>
            <div class="settings">
                <q-toggle
                    v-model="first"
                    color="white"
                />
            </div>
        </div>
    </div>
</template>