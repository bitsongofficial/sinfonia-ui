<script setup lang="ts">
    import { ref } from 'vue';
    import Logo from '@/components/Logo.vue';
    import IconButton from '../buttons/IconButton.vue';
    const first = ref(true);
</script>
<template>
    <div class="row justify-between items-center">
        <Logo></Logo>
        <div class="row items-center">
            <IconButton icon="setting" width="20" height="20" size="sm"></IconButton>
            <div class="settings">
                <q-toggle
                    v-model="first"
                    color="white"
                />
            </div>
        </div>
    </div>
</template>