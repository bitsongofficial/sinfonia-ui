<script setup lang="ts">
    import { newUserCoin } from '@/common/mockups'
    import { balancedCurrency } from '@/common/numbers'
    import { resolveIcon } from '@/common/resolvers';
    import { UserCoinInfo } from '@/types/user'
    import { computed } from 'vue'
    import CoinSelectItem from './CoinSelectItem.vue';

    const props = defineProps<{
        modelValue: UserCoinInfo | null,
    }>()
    const emit = defineEmits<{
        (e:'update:modelValue', value:UserCoinInfo | null): void,
    }>()
    const options = [
        newUserCoin("BTSG", "Bitsong"),
        newUserCoin("ADAM", "Adam"),
    ]
    const value = computed({
        get():(UserCoinInfo | null) {
            return props.modelValue
        },
        set(value: UserCoinInfo | null) {
            emit('update:modelValue', value)
        }
    })
</script>

<template>
    <q-select
        v-model="value"
        :options="options"
        :dropdown-icon="resolveIcon('dropdown', 11, 7)"
        borderless
        class="text-white"
    >
        <template v-slot:option="{itemProps, opt}">
            <CoinSelectItem v-bind="itemProps" :coin="opt" class="cursor-pointer"></CoinSelectItem>
        </template>
        <template v-slot:selected-item="{ opt }">
            <CoinSelectItem :coin="opt"></CoinSelectItem>
        </template>
    </q-select>
</template>