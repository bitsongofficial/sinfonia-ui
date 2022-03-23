<script setup lang="ts">
	import {resolveIcon} from "@/common/resolvers"
import useAuth from "@/store/auth";
	import IconButton from "./buttons/IconButton.vue";

	const authStore = useAuth()
</script>
<template>
    <div class="row items-center bg-rounded-translucent q-px-21 q-py-14 no-wrap w-fit">
        <IconButton icon="arrow-right" width="14" height="14" class="rotate-180 s-12 fs-12"></IconButton>
        <div class="q-mx-15">
            <p class="text-uppercase text-caption fs-8 opacity-40 q-mb-3">Address</p>
            <p class="text-weight-bold text-subtitle1 fs-12">bitsong1...u085</p>
        </div>
        <IconButton @click="authStore.signIn" icon="copy" width="20" height="20" class="opacity-40 fs-15"></IconButton>
    </div>
</template>