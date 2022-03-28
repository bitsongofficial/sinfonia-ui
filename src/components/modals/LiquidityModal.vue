<script setup lang="ts">
import { Pool } from "@/types"
import { watch, ref, onUnmounted, computed } from "vue"
import ModalWithClose from "./ModalWithClose.vue"
import Amount from "../inputs/Amount.vue"
import PercentageWithImage from "../infographics/PercentageWithImage.vue"
import { percentage, amountBalancer, amountIBCFromCoin } from "@/common"
import { resolveIcon } from "@/common/resolvers"
import LargeButton from "../buttons/LargeButton.vue"
import Progress from "../Progress.vue"
import useBank from "@/store/bank"
import useConfig from "@/store/config"
import useTransactionManager from "@/store/transaction-manager"
import { Coin } from "@cosmjs/proto-signing"
import { BigNumber } from "bignumber.js"
import { coinsConfig } from "@/configs/config"

const bankStore = useBank()
const configStore = useConfig()
const transactionManagerStore = useTransactionManager()

const props = defineProps<{
	pool: Pool
}>()

const add = ref(true)
const coinsAmounts = ref({})
const shareOutAmount = ref("0")
const single = ref(false)
const currentSingle = ref(0)

const poolWatcher = watch(
	() => props.pool,
	() => {
		const coinsAmountsMap = {}

		props.pool.coins.forEach((coin) => {
			coinsAmountsMap[coin.token.symbol] = "0"
		})

		coinsAmounts.value = coinsAmountsMap
	},
	{ immediate: true }
)

// Balances denoms on osmosis
const balanceDenoms = computed(() =>
	props.pool.coins.map((el) => el.token.denom)
)

const balances = computed(() => {
	const balancesMap = {}

	const tokenBalances = bankStore.osmosisAvailableBalances(balanceDenoms.value)

	if (configStore.osmosisToken) {
		tokenBalances.forEach((balance) => {
			if (balance.chains) {
				const chain = balance.chains.find(
					(el) => el.symbol === configStore.osmosisToken?.symbol
				)

				if (chain) {
					balancesMap[balance.symbol] = chain.available
				} else {
					balancesMap[balance.symbol] = "0"
				}
			}
		})
	}

	return balancesMap
})

const removeValues = [0.25, 0.5, 0.75, 1]
const removePercent = ref(removeValues[2])

onUnmounted(() => {
	poolWatcher()
})

const onSubmit = () => {
	if (single.value) {
	} else {
		const tokenInMaxs: Coin[] = []
		const joinSlippage = new BigNumber(coinsConfig.joinPoolSlippage).plus(1)

		for (const symbol in coinsAmounts.value) {
			const token = configStore.findTokenBySymbol(symbol)

			if (token) {
				const tokenInMax = amountIBCFromCoin(coinsAmounts.value[symbol], token)

				if (tokenInMax) {
					tokenInMaxs.push({
						...tokenInMax,
						amount: new BigNumber(tokenInMax.amount)
							.multipliedBy(joinSlippage)
							.toFixed(0),
					})
				}
			}
		}

		transactionManagerStore.joinPool(
			props.pool.id,
			new BigNumber(shareOutAmount.value).toFixed(0),
			tokenInMaxs
		)
	}
}

const changeToken = () => {
	let nextIndex = currentSingle.value + 1

	if (nextIndex > props.pool.coins.length - 1) {
		nextIndex = 0
	}

	currentSingle.value = nextIndex
}

const onAmountChange = (symbol: string, rawAmount: string) => {
	const balancer = amountBalancer(props.pool, symbol, rawAmount)
	const tempCoinsAmounts = { ...coinsAmounts.value }

	for (const symbol in balancer.assetsAmounts) {
		tempCoinsAmounts[symbol] = balancer.assetsAmounts[symbol]
	}

	coinsAmounts.value = tempCoinsAmounts
	shareOutAmount.value = balancer.shareOutAmount
}
</script>

<template>
	<ModalWithClose title="Manage Liquidity">
		<q-form @submit="onSubmit">
			<div class="flex fs-15 q-mb-22">
				<p
					:class="(add ? '' : 'text-dark') + ' cursor-pointer q-mr-27'"
					@click="add = true"
				>
					Add Liquidity
				</p>
				<p
					:class="(add ? 'text-dark' : '') + ' cursor-pointer'"
					@click="add = false"
				>
					Remove Liquidity
				</p>
			</div>
			<div v-if="add">
				<template v-for="(coin, index) of pool.coins">
					<div class="q-mb-21" v-if="!single || (single && index === currentSingle)">
						<div class="flex items-center no-wrap q-mb-9">
							<Amount
								v-model="coinsAmounts[coin.token.symbol]"
								:max="balances[coin.token.symbol]"
								class="q-mr-24"
								@update:model-value="
									(value) => onAmountChange(coin.token.symbol, value)
								"
							/>
							<div class="flex items-center no-wrap">
								<div class="text-weight-medium text-right q-mr-16">
									<p class="fs-12 text-dark q-mb-6">{{ coin.token.symbol }}</p>
									<p class="fs-21 text-no-wrap">
										{{ percentage(coin.weightPercentage) }} %
									</p>
								</div>
								<PercentageWithImage
									:value="coin.weightPercentage * 100"
									:image="coin.token.logos.default"
									negative
								/>
							</div>
						</div>
						<p class="fs-12 text-dark q-ml-20">
							Available
							<span class="text-white">{{ balances[coin.token.symbol] }}</span>
							{{ coin.token.symbol }}
						</p>
					</div>
				</template>
				<div
					v-if="single"
					class="q-mb-46 relative-position group cursor-pointer"
					@click="changeToken"
				>
					<div
						class="absolute-full rounded-20 bg-dark opacity-20 group-hover:opacity-40"
					></div>
					<p class="text-center fs-12 q-pa-12 text-weight-medium">Change token</p>
				</div>
				<div class="flex justify-between no-wrap">
					<div class="q-mr-20 flex no-wrap items-center">
						<q-toggle v-model="single" color="white" class="q-mr-8" />
						<p class="fs-12 text-weight-medium q-mr-12">Single Asset LP</p>
						<q-icon
							:name="resolveIcon('info', 15, 15)"
							class="text-dark cursor-pointer"
						>
						</q-icon>
					</div>
					<div>
						<LargeButton type="submit" fit :padding-y="14">
							<span class="text-uppercase"> Add liquidity </span>
						</LargeButton>
					</div>
				</div>
			</div>
			<div v-else>
				<div class="flex justify-center q-mb-28">
					<div class="rounded-100 border-gradient-primary w-fit q-px-42 q-py-20">
						<p class="fs-44">{{ removePercent * 100 }} %</p>
					</div>
				</div>
				<Progress :progress="removePercent" class="q-mb-16"></Progress>
				<div
					class="rounded-20 overflow-hidden relative-position text-weight-medium row q-mb-20"
				>
					<div
						:class="
							'absolute-full bg-primary-dark rounded-20 opacity-30 w-' +
							(removeValues.indexOf(removePercent) + 1) +
							'/4'
						"
					></div>
					<div
						v-for="rm in removeValues"
						class="col-2 rounded-20 q-px-32 q-py-18 relative-position cursor-pointer"
						@click="removePercent = rm"
					>
						<template v-if="rm == removePercent">
							<div
								class="absolute-full bg-primary-dark opacity-50 rounded-20 -z-1"
							></div>
							<p>{{ rm * 100 }}%</p>
						</template>
						<p v-else="rm == removePercent" class="text-dark opacity-50">
							{{ rm * 100 }}%
						</p>
					</div>
				</div>
				<div class="flex justify-center">
					<LargeButton fit :padding-y="14" class="q-px-52">
						<span class="text-uppercase"> Remove liquidity </span>
					</LargeButton>
				</div>
			</div>
		</q-form>
	</ModalWithClose>
</template>
