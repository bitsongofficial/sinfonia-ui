<script setup lang="ts">
    import MenuItem from '@/components/navigation/MenuItem.vue';
</script>
<template>
    <div class="column min-width justify-around items-center bg-rounded-translucent q-px-18 q-pt-32 q-pb-24">
        <MenuItem icon="list" width="19" height="13" class="q-mb-lg">
            DEX
        </MenuItem>
        <MenuItem icon="refresh" class="q-mb-lg" url="/swap">
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