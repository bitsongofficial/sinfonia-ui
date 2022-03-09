<script setup lang="ts">
    import MenuItem from '@/components/navigation/MenuItem.vue';
</script>
<template>
    <div class="column min-width justify-around items-center bg-rounded-translucent q-px-lg q-py-xl">
        <MenuItem icon="list" class="active q-mb-lg">
            DEX
        </MenuItem>
        <MenuItem icon="refresh" class="q-mb-lg">
            Swap
        </MenuItem>
        <MenuItem icon="stack" class="q-mb-lg">
            Pool
        </MenuItem>
        <MenuItem icon="suitcase" class="q-mb-lg">
            history
        </MenuItem>
        <MenuItem icon="swap">
            DEX
        </MenuItem>
    </div>
</template>