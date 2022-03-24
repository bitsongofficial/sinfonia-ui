<script setup lang="ts">
    import { UserCoinInfo } from '@/types/user'
    import { computed, ref } from 'vue'
    import ModalWithClose from './ModalWithClose.vue'
    import AddressesSelect from '../inputs/AddressesSelect.vue'
    import { resolveIcon } from '@/common/resolvers'
    import LargeButton from '../buttons/LargeButton.vue'
    import Amount from '../inputs/Amount.vue'

    const props = defineProps<
    {
        modelValue?: any,
        coin: UserCoinInfo,
    }>()
    const emit = defineEmits<{
        (e:'update:modelValue', value:any): void,
    }>()
    const model = computed({
        get():any {
            return props.modelValue
        },
        set(value: any) {
            emit('update:modelValue', value)
        }
    })
    const title = computed(() =>
    {
        return "Transfer " + props.coin.coin.symbol
    })
    const available = computed(() =>
    {
        return props.coin.total - props.coin.bonded
    })
    const addresses = [
        {name: "Cosmos", address: "cosmos19sdfdahdfhdfahdfh83679"},
        {name: "Osmosis", address: "osmo193jadfhadfhadfhadfd83679"},
    ]
    const address1 = ref(addresses[0])
    const address2 = ref(addresses[1])
    const amount = ref(0)
</script>

<template>
    <ModalWithClose v-model="model" :title="title">
        <div class="flex items-center no-wrap q-mb-40">
            <AddressesSelect v-model="address1" :addresses="addresses" title="From" class="flex-1"></AddressesSelect>
            <div class="q-pb-8 q-mx-12 opacity-15">
                <q-icon :name="resolveIcon('arrow-right', 14, 14)" size="12px"></q-icon>
            </div>
            <AddressesSelect v-model="address2" :addresses="addresses" title="To" class="flex-1"></AddressesSelect>
        </div>
        <div class="flex justify-between items-center q-mb-16 fs-12 text-dark">
            <p class="text-weight-medium text-uppercase">
                Amount to transfer
            </p>
            <p>Available <span class="q-ml-8 text-white">{{available}}</span></p>
        </div>
        <Amount v-model="amount" :max="1200" class="q-mb-32"></Amount>
        <div class="flex justify-center">
            <LargeButton fit class="q-px-80" :padding-y="14">
                <div class="text-uppercase">Transfer</div>
            </LargeButton>
        </div>
    </ModalWithClose>
</template>