<script setup lang="ts">
    import ModalWithClose from './ModalWithClose.vue'
    import Swapper from '../inputs/Swapper.vue'
    import { UserCoinInfo } from '@/types/user'
    import { computed } from 'vue'

    const props = defineProps<{
        coin1: UserCoinInfo | null,
        coin2: UserCoinInfo | null,
    }>()
    const emit = defineEmits<{
        (e:'update:coin1', value:UserCoinInfo | null): void,
        (e:'update:coin2', value:UserCoinInfo | null): void,
    }>()
    const coin1Wrapper = computed({
        get():(UserCoinInfo | null) {
            return props.coin1
        },
        set(value: UserCoinInfo | null) {
            emit('update:coin1', value)
        }
    })
    const coin2Wrapper = computed({
        get():(UserCoinInfo | null) {
            return props.coin2
        },
        set(value: UserCoinInfo | null) {
            emit('update:coin2', value)
        }
    })
</script>

<template>
    <ModalWithClose title="Swap Tokens" class="bigger-modal">
        <Swapper v-model:coin1="coin1Wrapper" v-model:coin2="coin2Wrapper"></Swapper>
    </ModalWithClose>
</template>