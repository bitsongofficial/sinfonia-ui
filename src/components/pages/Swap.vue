<script setup lang="ts">
    import Card from '../cards/Card.vue'
    import Title from '../typography/Title.vue'
    import { newCoin, newUser, newUserCoin } from '@/common/mockups'
    import { onMounted, onUnmounted, ref } from 'vue'
    import { smallNumber } from '@/common/numbers'
    import CryptoTable from '../CryptoTable.vue'
    import { TableColumn } from '@/types/table'
    import Swapper from '../inputs/Swapper.vue'

    let coin1 = ref(newUserCoin("BTSG", "Bitsong"))
    let coin2 = ref(newUserCoin("CLAY", "Adam"))
    
    const dex = [
        newCoin("CLAY", "Adam Clay"),
        newCoin("FNTY", "Fonti"),
        newCoin("VBRN", "Vibranium"),
        newCoin("MCX", "Mace"),
    ]
    
    const columns:TableColumn[] = [
        { 
            name: 'token',
            align: 'left',
            label: '',
            field: 'name',
            sortable: false
        },
        {
            name: 'symbol',
            align: 'left',
            label: '',
            field: 'symbol',
            sortable: false,
            format: (val:any) => `$${val}`,
        },
        { name: 'price', label: '', field: 'price', sortable: false, format: (val:any) => `${smallNumber(val)} $`},
    ]

    const boxesStyle = ref({maxHeight: "0"})
    const heightRef = ref<{element:HTMLElement} | null>(null)

    const setSize = () =>
    {
        if(heightRef.value && heightRef.value.element)
        {
            boxesStyle.value.maxHeight = ((heightRef.value.element.clientHeight - 157) / 2) + "px"
        }
    }

    onMounted(() => {
        window.addEventListener("resize", setSize)
        setSize()
    })

    onUnmounted(() =>
    {
        window.removeEventListener("resize", setSize);
    })
</script>
<template>
    <div class="font-weight-medium">
        <div class="row q-col-gutter-x-xl">
            <div class="col-8 col-md-5 q-mb-40 q-mb-md-none flex justify-center">
                <div class="max-w-582">
                    <Title class="q-mb-36">Swap Tokens</Title>
                    <Card ref="heightRef" class="q-pa-36" transparency="5">
                        <Swapper v-model:coin1="coin1" v-model:coin2="coin2"></Swapper>
                    </Card>
                </div>
            </div>
            <div class="col-8 col-md-3">
                <div class="flex justify-between items-center q-mb-30">
                    <p class="fs-18">DEX</p>
                    <q-btn outline rounded color="white" label="View all" class="q-px-22" />
                </div>
                <Card class="q-py-10 q-px-none q-mb-51 scroll-container" :padding="0" :transparency="5" :style="boxesStyle">
                    <CryptoTable :rows="dex" :columns="columns" class="bg-transparent hide-header small-rows">

                    </CryptoTable>
                </Card>
                <div class="flex justify-between items-center q-mb-30">
                    <p class="fs-18">DEX</p>
                    <q-btn outline rounded color="white" label="View all" class="q-px-22" />
                </div>
                <Card class="q-py-10 q-px-none overflow-auto" :padding="0" :transparency="5" :style="boxesStyle">
                    <CryptoTable :rows="dex" :columns="columns" class="bg-transparent hide-header small-rows">

                    </CryptoTable>
                </Card>
            </div>
        </div>
    </div>
</template>