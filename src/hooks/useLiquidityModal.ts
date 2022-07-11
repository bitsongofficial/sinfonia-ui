import { compact, Dictionary, reduce } from "lodash"
import { Pool } from "@/types"
import {
	Ref,
	ref,
	computed,
	watch,
	onUnmounted,
	WritableComputedRef,
} from "vue"
import useBank from "@/store/bank"
import useConfig from "@/store/config"
import useTransactionManager from "@/store/transaction-manager"
import {
	amountBalancer,
	amountIBCFromCoin,
	calcPoolOutGivenSingleIn,
	fromViewDenom,
	percentageRange,
	singleAmountInPriceImpact,
} from "@/common"
import { BigNumber } from "bignumber.js"
import { coinsConfig } from "@/configs/config"
import { Coin } from "@cosmjs/proto-signing"
import { useForm } from "vee-validate"

const useLiquidityModal = (
	pool: Ref<Pool>,
	model: WritableComputedRef<boolean>
) => {
	const bankStore = useBank()
	const configStore = useConfig()
	const transactionManagerStore = useTransactionManager()

	const add = ref(true)
	const shareOutAmount = ref("0")
	const single = ref(false)
	const currentSingle = ref(0)
	const removeValues = [0.25, 0.5, 0.75, 1]
	const removePercent = ref(removeValues[2])
	const initialValues: Dictionary<string> = {}

	// Balances denoms on osmosis
	const balanceDenoms = computed(() =>
		pool.value.coins.map((el) => el.token.denom)
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

	for (const coin of pool.value.coins) {
		initialValues[coin.token.symbol] = ""
	}

	const currentSymbol = computed(() => {
		const keys = Object.keys(initialValues)

		if (keys.length) {
			return keys[currentSingle.value]
		}
	})

	const validationSchema = computed(() => {
		const validationMap = {}

		if (!single.value) {
			for (const coin of pool.value.coins) {
				validationMap[coin.token.symbol] = {
					required: true,
					isNaN: true,
					gtnZero: true,
					compareBalance: { compare: balances.value[coin.token.symbol] },
				}
			}
		} else if (currentSymbol.value) {
			validationMap[currentSymbol.value] = {
				required: true,
				isNaN: true,
				gtnZero: true,
				compareBalance: { compare: balances.value[currentSymbol.value] },
			}
		}

		return validationMap
	})

	const { handleSubmit, values, meta, setValues, resetForm } = useForm({
		initialValues,
		validationSchema,
	})

	const singleAssetAmount = computed(() => {
		if (currentSymbol.value) {
			return values[currentSymbol.value]
		}
	})

	const singlePoolAsset = computed(() =>
		pool.value.coins.find((coin) => coin.token.symbol === currentSymbol.value)
	)

	const singleToken = computed(() => {
		if (currentSymbol.value) {
			return configStore.findTokenBySymbol(currentSymbol.value)
		}
	})

	const singleTokenIn = computed(() => {
		if (singleAssetAmount.value && singleToken.value) {
			return amountIBCFromCoin(singleAssetAmount.value, singleToken.value)
		}
	})

	const priceImpact = computed(() => {
		if (singleToken.value && singlePoolAsset.value && singleTokenIn.value) {
			return percentageRange(
				singleAmountInPriceImpact(
					singleToken.value,
					singlePoolAsset.value,
					singleTokenIn.value
				).toString()
			)
		}

		return "-"
	})

	const onInputUpdate = () => {
		resetForm(initialValues)
	}

	const poolWatcher = watch(
		() => pool.value || model.value,
		() => {
			onInputUpdate()
		}
	)

	const modelWatcher = watch(
		() => model.value,
		() => {
			onInputUpdate()
		},
		{ immediate: true }
	)

	const joinSwapExternAmountIn = () => {
		if (currentSymbol.value) {
			if (singleAssetAmount.value) {
				if (singlePoolAsset.value && singleTokenIn.value) {
					const shareOutAmount = calcPoolOutGivenSingleIn(
						singlePoolAsset.value.token.amount,
						singlePoolAsset.value.weight,
						pool.value.totalShares.amount,
						pool.value.totalWeight,
						singleAssetAmount.value,
						pool.value.poolParams.swapFee
					)

					const outRatio = new BigNumber(1).minus(
						new BigNumber(coinsConfig.joinPoolSlippage).div(new BigNumber(100))
					)

					const shareOutMinAmount = new BigNumber(shareOutAmount.toString())
						.multipliedBy(outRatio)
						.toFixed(0)

					transactionManagerStore.joinSwapExternAmountIn(
						pool.value.id,
						singleTokenIn.value,
						shareOutMinAmount
					)
				}
			}
		}
	}

	const joinPool = () => {
		const tokenInMaxs: Coin[] = []
		const joinSlippage = new BigNumber(coinsConfig.joinPoolSlippage).plus(1)

		for (const symbol in values) {
			const token = configStore.findTokenBySymbol(symbol)

			if (token) {
				const tokenInMax = amountIBCFromCoin(values[symbol], token)

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

		const tokenInMaxsSort: Coin[] = []

		for (const assetPool of pool.value.poolAssets) {
			const tokenInMax = tokenInMaxs.find(
				(token) => token.denom === assetPool.token.denom
			)

			if (tokenInMax) {
				tokenInMaxsSort.push(tokenInMax)
			}
		}

		transactionManagerStore.joinPool(
			pool.value.id,
			new BigNumber(shareOutAmount.value).toFixed(0),
			tokenInMaxsSort
		)
	}

	const onExitPool = () => {
		const bondendLP = reduce<Coin, BigNumber>(
			pool.value.availableLPBalances,
			(all, coin) => {
				return all.plus(coin.amount)
			},
			new BigNumber("0")
		).toString()

		const poolShareWithPercentage = new BigNumber(bondendLP).multipliedBy(
			new BigNumber(removePercent.value)
		)

		const shareInAmount = poolShareWithPercentage.toFixed(0)
		const shareRatio = new BigNumber(poolShareWithPercentage).div(
			new BigNumber(pool.value.totalShares.amount)
		)

		const tokenOutMins = pool.value.coins.map((coin) => {
			if (coin.token.coinLookup) {
				const amountIn = fromViewDenom(
					coin.token.amount,
					coin.token.coinLookup.chainToViewConversionFactor
				)

				const tokenOutAmount = shareRatio.multipliedBy(amountIn)

				return {
					amount: tokenOutAmount
						.multipliedBy(new BigNumber(1).minus(coinsConfig.exitPoolSlippage))
						.toFixed(0),
					denom: coin.token.coinDenom,
				}
			}
		})

		const tokenOutMinsSort: Coin[] = []

		for (const assetPool of pool.value.poolAssets) {
			const tokenOut = compact(tokenOutMins).find(
				(token) => token.denom === assetPool.token.denom
			)

			if (tokenOut) {
				tokenOutMinsSort.push(tokenOut)
			}
		}

		transactionManagerStore.exitPool(
			pool.value.id,
			shareInAmount,
			tokenOutMinsSort
		)
	}

	const onSubmit = handleSubmit(() => {
		if (single.value) {
			joinSwapExternAmountIn()
		} else {
			joinPool()
		}
	})

	const changeToken = () => {
		let nextIndex = currentSingle.value + 1

		if (nextIndex > pool.value.coins.length - 1) {
			nextIndex = 0
		}

		currentSingle.value = nextIndex

		resetForm()
	}

	const onAmountChange = (symbol: string, rawAmount: string) => {
		try {
			const tempCoinsAmounts = { ...values }
			const balancer = amountBalancer(pool.value, symbol, rawAmount)

			for (const symbol in balancer.assetsAmounts) {
				tempCoinsAmounts[symbol] = balancer.assetsAmounts[symbol]
			}

			shareOutAmount.value = balancer.shareOutAmount

			const amount = new BigNumber(rawAmount)

			if (!amount.isNaN()) {
				setValues(tempCoinsAmounts)
			} else {
				resetForm()
			}
		} catch (error) {
			resetForm()
		}
	}

	onUnmounted(() => {
		poolWatcher()
		modelWatcher()
	})

	return {
		add,
		shareOutAmount,
		single,
		currentSingle,
		currentSymbol,
		balances,
		balanceDenoms,
		removeValues,
		removePercent,
		priceImpact,
		meta,
		onSubmit,
		onExitPool,
		changeToken,
		onAmountChange,
	}
}

export default useLiquidityModal
