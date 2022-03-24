<script setup lang="ts">
    import { ref } from "vue";
    import IconButton from "./buttons/IconButton.vue"
    import LargeButton from "./buttons/LargeButton.vue"
    import useAuth from "@/store/auth";

    const authStore = useAuth()
</script>
<template>
    <div v-if="authStore.session" class="row items-center bg-rounded-translucent q-px-32 q-py-16-5 no-wrap w-fit">
        <!-- <IconButton icon="arrow-right" width="14" height="14" class="rotate-180 s-12 fs-12" @click="connected = false"></IconButton> -->
        <div class="q-mx-15">
            <p class="text-uppercase text-caption fs-8 opacity-40 q-mb-3">Address</p>
            <p class="text-weight-bold text-subtitle1 fs-12">bitsong1...u085</p>
        </div>
        <IconButton icon="copy" width="20" height="20" class="opacity-40 fs-15"></IconButton>
    </div>
    <div v-else>
        <LargeButton fit @click="authStore.signIn">Connect to Keplr</LargeButton>
    </div>
</template>