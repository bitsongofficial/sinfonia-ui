<script setup lang="ts">
	import { Token, TokenWithAddress } from '@/types'
	import { computed, ref, watch } from 'vue'
	import { resolveIcon } from '@/common/resolvers'
	import { balancedCurrency, amountToCoin } from '@/common/numbers'
	import ModalWithClose from '@/components/modals/ModalWithClose.vue'
	import AddressesSelect from '@/components/inputs/AddressesSelect.vue'
	import LargeButton from '@/components/buttons/LargeButton.vue'
	import Amount from '@/components/inputs/Amount.vue'
	import useConfig from '@/store/config'
	import useKeplr from '@/store/keplr'
	import { isValidAddress } from '@/common'
	import useTransactionManager from '@/store/transaction-manager'
	import useBank from '@/store/bank'
	import { Coin } from '@cosmjs/proto-signing'

	const configStore = useConfig()
	const keplrStore = useKeplr()
	const transactionManagerStore = useTransactionManager()
	const bankStore = useBank()

	const props = defineProps<{
		modelValue: boolean,
		coin: Token
	}>()

	const fromToken = ref<TokenWithAddress | undefined>(props.coin)
	const toToken = ref<TokenWithAddress | undefined>(configStore.osmosisToken)
	const tempAddress = ref()
	const addresses = computed<string[]>(() => [...keplrStore.addresses, tempAddress.value])
	const optionsAddresses = computed<TokenWithAddress[]>(() => {
		return configStore.allTokens.map(token => {
			const address = addresses.value.find(addr => isValidAddress(addr, token.addressPrefix))

			return {
				...token,
				address
			}
		})
	})

	const fromAddresses = computed<TokenWithAddress[]>(() => {
		if (fromToken.value && !fromToken.value.ibcEnabled) {
			return []
		}

		return optionsAddresses.value
	})

	const toAddresses = computed<TokenWithAddress[]>(() => {
		if (toToken.value && !toToken.value.ibcEnabled) {
			return []
		}

		return optionsAddresses.value
	})

	const setDefaultValues = (coin: Token) => {
		fromToken.value = optionsAddresses.value.find(opt => opt.symbol === coin.symbol)
		const osmosisToken = configStore.osmosisToken
		
		if (osmosisToken) {
			toToken.value = optionsAddresses.value.find(opt => opt.symbol === osmosisToken.symbol)
		}
	}

	const addressLookup = async (coin?: Token) => {
		if (coin) {
			const account = await keplrStore.getAddress(coin.chainID)
			
			if (account) {
				tempAddress.value = account.address

				if (fromToken.value && !fromToken.value.address) {
					bankStore.loadBalance(account.address, fromToken.value.chainID)
				}
			}
		}
	}

	watch<TokenWithAddress | undefined>(() => toToken.value, async (coin, oldCoin) => {
		await addressLookup(coin)

		if (fromToken.value) {
			if (coin) {
				if (coin.symbol === fromToken.value.symbol && oldCoin) {
					fromToken.value = optionsAddresses.value.find(opt => opt.symbol === oldCoin.symbol)
				}
			}
		}

		if (toToken.value && !toToken.value.address) {
			toToken.value = {
				...toToken.value,
				address: tempAddress.value,
			}
		}
	})

	watch<TokenWithAddress | undefined>(() => fromToken.value, async (coin, oldCoin) => {
		await addressLookup(coin)

		if (toToken.value) {
			if (coin) {
				if (coin.symbol === toToken.value.symbol && oldCoin) {
					toToken.value = optionsAddresses.value.find(opt => opt.symbol === oldCoin.symbol)
				}
			}
		}

		if (fromToken.value && !fromToken.value.address) {
			fromToken.value = {
				...fromToken.value,
				address: tempAddress.value,
			}
		}
	})

	watch(() => props.coin, async (coin) => {
		await addressLookup(coin)
		setDefaultValues(coin)
	}, {
		immediate: true
	})

	const emit = defineEmits<{
		(e:'update:modelValue', value: boolean): void,
	}>()

	const model = computed({
		get() {
			return props.modelValue
		},
		set(value: boolean) {
			emit('update:modelValue', value)
		}
	})

	const title = computed(() => {
		if (!fromToken.value) {
			return 'Transfer'
		}

		if (fromToken.value.fantoken) {
			return 'Transfer $' + fromToken.value.symbol
		}

		return 'Transfer ' + fromToken.value.symbol
	})

	const available = computed(() => {
		const balances = [...bankStore.allBalances]
		let coin: Coin | undefined = undefined
		const from = fromToken.value
		const to = toToken.value

		if (from && from.ibcEnabled) {
			const coinLookup = from.coinLookup.find(
				(coin) => coin.viewDenom === from.symbol
			)

			if (coinLookup) {
				const balance = balances.find(
					el => (!from.fantoken && el.denom === coinLookup.chainDenom) || (from.fantoken && el.denom === coinLookup.fantokenDenom)
				)

				coin = amountToCoin(balance?.amount ?? '0', from)
			}
		} else if (to && to.ibc) {
			const balance = balances.find(el => el.denom === to.ibc.osmosis.destDenom)

			coin = amountToCoin(balance?.amount ?? '0', to)
		}

		if (coin) {
			return coin.amount
		}

		return '0'
	})

	const amount = ref('0')

	const onSubmit = () => {
		if (fromToken.value && toToken.value && fromToken.value.address && toToken.value.address) {
			transactionManagerStore.sendIbcTokens(
				fromToken.value.address,
				toToken.value.address,
				fromToken.value,
				toToken.value,
				amount.value
			)
		}
	}
</script>

<template>
	<ModalWithClose v-model="model" :title="title">
		<q-form @submit="onSubmit">
			<div class="flex items-center no-wrap q-mb-40">
				<AddressesSelect v-model="fromToken" :addresses="fromAddresses" title="From" class="flex-1" />

				<div class="q-pb-8 q-mx-12 opacity-15">
					<q-icon :name="resolveIcon('arrow-right', 14, 14)" size="12px" />
				</div>

				<AddressesSelect v-model="toToken" :addresses="toAddresses" title="To" class="flex-1" />
			</div>

			<div class="flex justify-between items-center q-mb-16 fs-12 text-dark">
				<p class="font-weight-medium text-uppercase">Amount to transfer</p>
				<p>Available <span class="q-ml-8 text-white">{{ balancedCurrency(available) }}</span></p>
			</div>

			<Amount v-model="amount" :max="available" class="q-mb-32" />

			<div class="flex justify-center">
				<LargeButton type="submit" fit class="q-px-80" :padding-y="14">
					<div class="text-uppercase">Transfer</div>
				</LargeButton>
			</div>
		</q-form>
	</ModalWithClose>
</template>