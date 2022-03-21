<script setup lang="ts">
    import { computed } from 'vue'

    const props = defineProps<{
        image: string,
        value: number,
        color?: string,
        negative?: boolean,
    }>()
    const actualColor = props.color ? props.color : (props.negative ? "white" : "primary")
    const angle = props.negative ? (360 *(1 - props.value/100)) : 0
</script>

<template>
    <q-circular-progress
        :angle="angle"
        show-value
        :value="value"
        size="32px"
        :thickness="0.15"
        :color="actualColor"
    >
        <q-avatar size="22px">
            <img :src="image">
        </q-avatar>
    </q-circular-progress>
</template>