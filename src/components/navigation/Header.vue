<script setup lang="ts">
    import { ref } from 'vue'
    import Logo from '@/components/Logo.vue'
    import IconButton from '../buttons/IconButton.vue'
    import { RouterLink } from "vue-router"
    const first = ref(false);
</script>
<template>
    <div class="row justify-between items-center">
        <RouterLink to="/fantokens">
            <Logo></Logo>
        </RouterLink>
        <div class="row items-center">
            <IconButton class="q-mr-20" icon="setting" width="20" height="20" size="sm"></IconButton>
            <div class="settings">
                <q-toggle
                    v-model="first"
                    color="white"
                    class="dark-mode-toggle"
                />
            </div>
        </div>
    </div>
</template>