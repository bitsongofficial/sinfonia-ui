<script setup lang="ts">
    import MenuItem from '@/components/navigation/MenuItem.vue';
</script>
<template>
    <div class="column min-width justify-around items-center bg-rounded-translucent q-px-md q-py-xl">
        <MenuItem icon="list" width="19" height="13" class="q-mb-lg">
            DEX
        </MenuItem>
        <MenuItem icon="refresh" class="q-mb-lg" url="/2">
            Swap
        </MenuItem>
        <MenuItem icon="stack" class="q-mb-lg" url="/pools">
            Pool
        </MenuItem>
        <MenuItem icon="suitcase" class="q-mb-lg" url="/assets">
            Assets
        </MenuItem>
        <MenuItem icon="swap" url="/5">
            History
        </MenuItem>
    </div>
</template>