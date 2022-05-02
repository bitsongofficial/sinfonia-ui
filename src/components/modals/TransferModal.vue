<script setup lang="ts">
import { Token, TokenWithAddress } from "@/types"
import { computed, ref, watch } from "vue"
import { resolveIcon } from "@/common/resolvers"
import { balancedCurrency, amountToCoin } from "@/common/numbers"
import {
	isValidAddress,
	amountFromCoin,
	amountIBCFromCoin,
	gteComparePercentage,
} from "@/common"
import { compact } from "lodash"
import { Coin } from "@cosmjs/proto-signing"
import useConfig from "@/store/config"
import useKeplr from "@/store/keplr"
import useTransactionManager from "@/store/transaction-manager"
import useBank from "@/store/bank"
import ModalWithClose from "@/components/modals/ModalWithClose.vue"
import AddressesSelect from "@/components/inputs/AddressesSelect.vue"
import LargeButton from "@/components/buttons/LargeButton.vue"
import Amount from "@/components/inputs/Amount.vue"
import DangerTooltip from "@/components/tooltips/DangerTooltip.vue"

const configStore = useConfig()
const keplrStore = useKeplr()
const transactionManagerStore = useTransactionManager()
const bankStore = useBank()

const props = defineProps<{
	modelValue: boolean
	coin: Token
}>()

const emit = defineEmits<{
	(e: "update:modelValue", value: boolean): void
}>()

const model = computed({
	get() {
		return props.modelValue
	},
	set(value: boolean) {
		emit("update:modelValue", value)
	},
})

watch(
	() => props.coin,
	(coin) => {
		fromChain.value = configStore.allMainTokens.find(
			(token) => token.chainID === coin.chainID
		)
	}
)

const fromChain = ref<TokenWithAddress | undefined>(
	configStore.allMainTokens.find((token) => token.chainID === props.coin.chainID)
)

const toChain = ref<TokenWithAddress | undefined>(configStore.osmosisToken)

watch(
	() => fromChain.value,
	(newChain, oldChain) => {
		if (oldChain?.chainID !== toChain.value?.chainID) {
			toChain.value = oldChain
		}
	}
)

watch(
	() => toChain.value,
	(newChain, oldChain) => {
		if (oldChain?.chainID !== fromChain.value?.chainID) {
			fromChain.value = oldChain
		}
	}
)

const addresses = computed<string[]>(() => [...keplrStore.addresses])

const optionsAddresses = computed<TokenWithAddress[]>(() => {
	return compact(
		configStore.allMainTokens.map((token) => {
			const address = addresses.value.find((addr) =>
				isValidAddress(addr, token.addressPrefix)
			)

			if (
				token.chainID === props.coin.chainID ||
				(configStore.osmosisToken &&
					configStore.osmosisToken.chainID === token.chainID)
			) {
				return {
					...token,
					address,
				}
			}
		})
	)
})

const fromAddress = computed(() => {
	if (props.modelValue) {
		return optionsAddresses.value.find(
			(el) => el.chainID === fromChain.value?.chainID
		)?.address
	}
})

const toAddress = computed(() => {
	if (props.modelValue) {
		return optionsAddresses.value.find(
			(el) => el.chainID === toChain.value?.chainID
		)?.address
	}
})

const title = computed(() => {
	return "Transfer " + props.coin.symbol
})

const amount = ref("0")

const showBigTransferTooltip = ref(false)
const bigTransferInternal = ref(false)
const hasAmountError = ref<boolean>(false)

const balance = computed(() => {
	const balances = [...bankStore.allBalances]
	const from = fromChain.value

	if (from) {
		let denom = props.coin.ibc.osmosis.destDenom

		if (from.ibcEnabled) {
			const coinLookup = props.coin.coinLookup.find(
				(coin) => coin.viewDenom === props.coin.symbol
			)

			if (coinLookup) {
				denom = coinLookup.fantokenDenom ?? coinLookup.chainDenom
			}
		}

		const balance = balances.find((el) => el.denom === denom)

		return balance
	}
})

const available = computed(() => {
	if (balance.value) {
		const coin = amountToCoin(balance.value.amount, props.coin)

		if (coin) {
			return coin.amount
		}
	}

	return "0"
})

const onSubmit = () => {
	if (fromChain.value && toChain.value && fromAddress.value && toAddress.value) {
		let transferAmount: Coin | undefined = undefined

		if (fromChain.value.ibcEnabled) {
			transferAmount = amountFromCoin(amount.value, props.coin)
		} else {
			transferAmount = amountIBCFromCoin(amount.value, props.coin)
		}

		transactionManagerStore.sendIbcTokens(
			fromAddress.value,
			toAddress.value,
			fromChain.value,
			toChain.value,
			transferAmount
		)
	}
}

const bigTransfer = computed({
	get(): boolean {
		return gteComparePercentage(amount.value, available.value)
	},
	set(value: boolean) {
		bigTransferInternal.value = value
		if (value) {
			showBigTransferTooltip.value = value
			hasAmountError.value = true
		}
	},
})
</script>

<template>
	<ModalWithClose
		v-model="model"
		:title="title"
		@click="showBigTransferTooltip = false"
	>
		<q-form @submit="onSubmit">
			<div class="flex items-center no-wrap q-mb-40">
				<AddressesSelect
					v-model="fromChain"
					:addresses="optionsAddresses"
					title="From"
					class="flex-1"
				/>

				<div class="q-pb-8 q-mx-12 opacity-15">
					<q-icon :name="resolveIcon('arrow-right', 14, 14)" size="12px" />
				</div>

				<AddressesSelect
					v-model="toChain"
					:addresses="optionsAddresses"
					title="To"
					class="flex-1"
				/>
			</div>

			<div
				:class="
					'flex justify-between items-center q-mb-16 fs-12 text-dark' +
					(bigTransfer ? ' q-field--error' : '')
				"
			>
				<div class="flex title-with-error">
					<p
						:class="
							'text-weight-medium text-uppercase q-mr-12' +
							(hasAmountError ? ' text-primary' : '')
						"
					>
						Amount to transfer
					</p>
					<q-icon :name="resolveIcon('info', 15, 15)" size="12px" color="primary">
						<DangerTooltip
							anchor="center right"
							self="center start"
							v-model="showBigTransferTooltip"
						>
							You are about to transfer more than 20% of your total amount. We suggest
							that you do not transfer more than the amount you want to trade. Proceed
							at your own risk.
						</DangerTooltip>
					</q-icon>
				</div>
				<p>
					Available
					<span class="q-ml-8 text-white">{{ balancedCurrency(available) }}</span>
				</p>
			</div>

			<Amount
				v-model="amount"
				:max="available"
				:token="fromChain"
				class="q-mb-32"
				@error-change="(val) => (hasAmountError = val)"
			/>

			<div class="flex justify-center">
				<LargeButton type="submit" fit class="q-px-80" :padding-y="14">
					<div class="text-uppercase">Transfer</div>
				</LargeButton>
			</div>
		</q-form>
	</ModalWithClose>
</template>
