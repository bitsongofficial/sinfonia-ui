<script setup lang="ts">
    import CardDark from '../cards/CardDark.vue'
    import SmallButton from '../buttons/SmallButton.vue'
    import Card from '../cards/Card.vue'
    import Title from '../typography/Title.vue'
    import { newCoin, newUser, newUserCoin } from '@/common/mockups'
    import { computed, onMounted, onUnmounted, ref } from 'vue'
    import { balancedCurrency, currency, smallNumber } from '@/common/numbers'
    import CoinSelect from '../inputs/CoinSelect.vue'
    import InlineButton from '../buttons/InlineButton.vue'
    import { resolveIcon } from '@/common/resolvers'
    import LargeButton from '../buttons/LargeButton.vue'
    import CryptoTable from '../CryptoTable.vue'
    import ExpandableCard from '../cards/ExpandableCard.vue'
    import { TableColumn } from '@/types/table'

    let user = newUser()

    let coin1 = ref(newUserCoin("BTSG", "Bitsong"))
    let coin2 = ref(newUserCoin("CLAY", "Adam"))
    const slippage = -0.210

    const swapAmount = ref("0")

    const swapAmountWrapper = computed<string>({
        get() {
            return swapAmount.value
        },
        set(value) {
            swapAmount.value = ((value != "" && parseInt(value) > 0 ) ? value : "0")
        }
    })

    const swapRatio = computed<number>(() =>
    {
        return coin1.value.coin.price / coin2.value.coin.price
    })

    const swapAmountNumber = computed<number>(() =>
    {
        return parseInt(swapAmountWrapper.value)
    })

    const invert = () =>
    {
        const tmp = coin1.value
        coin1.value = coin2.value
        coin2.value = tmp
    }
    
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
            console.log(heightRef.value.element.clientHeight)
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
                    <p class="fs-14 q-mb-20 opacity-30">Swap from</p>
                    <CardDark>
                        <div class="flex justify-between no-wrap">
                            <div class="flex-1 flex justify-between items-center q-py-6 no-wrap">
                                <div class="q-mr-24">
                                    <q-input borderless v-model="swapAmountWrapper" class="fs-24 q-mb-0 text-white" />
                                    <p v-if="coin1" class="fs-12 text-dark">{{balancedCurrency(swapAmountNumber * coin1.coin.price)}} $</p>
                                </div>
                                <div>
                                    <SmallButton label="MAX"></SmallButton>
                                </div>
                            </div>
                            <div class="vertical-separator q-mx-28"></div>
                            <div class="flex-1">
                                <CoinSelect v-model="coin1"></CoinSelect>
                            </div>
                        </div>
                    </CardDark>
                    <div class="flex justify-between q-my-20 items-center">
                        <p class="fs-14 opacity-30">Swap to</p>
                        <InlineButton @click="invert">
                            <p class="fs-12 q-mr-12">Invert tokens</p>
                            <span class="fs-10 text-primary">
                                <q-icon :name="resolveIcon('swap', 21, 16)" />
                            </span>
                        </InlineButton>
                    </div>
                    <CardDark class="q-mb-24">
                        <div class="flex justify-between no-wrap">
                            <div class="flex-1 flex justify-between items-center q-py-6 no-wrap">
                                <div class="q-mr-24">
                                    <p v-if="coin1 && coin2" class="fs-24">{{balancedCurrency(swapRatio * swapAmountNumber)}}</p>
                                </div>
                            </div>
                            <div class="vertical-separator q-mx-28"></div>
                            <div class="flex-1">
                                <CoinSelect v-model="coin2"></CoinSelect>
                            </div>
                        </div>
                    </CardDark>
                    <div class="q-py-15 q-px-30 bg-white-5 rounded flex justify-between items-center fs-14 q-mb-57">
                        <p>Estimated slippage</p>
                        <p>{{smallNumber(slippage)}} %</p>
                    </div>
                    <div class="flex items-center q-col-gutter-x-xl">
                        <div class="flex-1 flex justify-between">
                            <p class="fs-16">Rates</p>
                            <div class="fs-12">
                                <p class="q-mb-6"><span class="opacity-40">{{coin1.coin.symbol}} =</span> {{smallNumber(swapRatio)}} <span class="opacity-40">{{coin2.coin.symbol}}</span></p>
                                <p><span class="opacity-40">{{coin2.coin.symbol}} =</span> {{smallNumber(1/swapRatio)}} <span class="opacity-40">{{coin1.coin.symbol}}</span></p>
                            </div>
                        </div>
                        <div class="flex-1">
                            <LargeButton>Swap Tokens</LargeButton>
                        </div>
                    </div>
                </Card>
                </div>
            </div>
            <div class="col-8 col-md-3">
                <div class="flex justify-between items-center q-mb-30">
                    <p class="fs-18">DEX</p>
                    <q-btn outline rounded color="white" label="View all" class="q-px-22" />
                </div>
                <Card class="q-py-10 q-px-none q-mb-51" :padding="0" transparency="5">
                    <CryptoTable virtual-scroll :style="boxesStyle" :rows="dex" :columns="columns" class="bg-transparent hide-header small-rows">

                    </CryptoTable>
                </Card>
                <div class="flex justify-between items-center q-mb-30">
                    <p class="fs-18">DEX</p>
                    <q-btn outline rounded color="white" label="View all" class="q-px-22" />
                </div>
                <Card class="q-py-10 q-px-none" :padding="0" transparency="5">
                    <CryptoTable virtual-scroll :style="boxesStyle" :rows="dex" :columns="columns" class="bg-transparent hide-header small-rows">

                    </CryptoTable>
                </Card>
            </div>
        </div>
    </div>
</template>