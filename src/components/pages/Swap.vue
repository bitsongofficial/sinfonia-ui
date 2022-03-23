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
	import useConfig from '@/store/config'
  import Swapper from '../inputs/Swapper.vue'

	const configStore = useConfig()

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
                    <CryptoTable :rows="configStore.fantokens" :columns="columns" class="bg-transparent hide-header small-rows">
                    </CryptoTable>
                </Card>
                <div class="flex justify-between items-center q-mb-30">
                    <p class="fs-18">DEX</p>
                    <q-btn outline rounded color="white" label="View all" class="q-px-22" />
                </div>
                <Card class="q-py-10 q-px-none overflow-auto" :padding="0" :transparency="5" :style="boxesStyle">
                    <CryptoTable :rows="configStore.fantokens" :columns="columns" class="bg-transparent hide-header small-rows">
                    </CryptoTable>
                </Card>
            </div>
        </div>
    </div>
</template>