import { coinsConfig } from "@/configs/config"
import { Token, OsmosisPoolAsset, PoolAsset, SwapPool } from "@/types"
import { Coin, coin } from "@cosmjs/proto-signing"
import { BigNumber } from "bignumber.js"
import { Decimal } from "decimal.js"

export const currency = (number: number | string, fraction = 2): string => {
	const amount = new BigNumber(number)

	if (amount.isEqualTo(0)) {
		return "0"
	}

	if (amount.gt(0.00001)) {
		return new Intl.NumberFormat("en-US", {
			maximumFractionDigits: fraction,
			minimumFractionDigits: fraction,
		}).format(amount.toNumber())
	}

	return "< 0.00001"
}

export const balancedCurrency = (
	number: number | string,
	fraction = 4
): string => {
	let value = new BigNumber(number)

	if (value.abs().gt(1000)) {
		value = new BigNumber(Math.floor(value.toNumber()))
	}

	return currency(value.toString(), Math.min(value.dp(), fraction))
}

export const balancedCurrencyFixed = (
	number: number | string,
	fraction = 2
): string => {
	const value = new BigNumber(number)

	return currency(value.toString(), fraction)
}

export const toDynamicDp = (number: number | string, fraction = 6) => {
	const value = new BigNumber(number)
	const decimalPlaces = Math.min(value.dp(), fraction)

	return value.toFixed(decimalPlaces, BigNumber.ROUND_DOWN)
}

export const balancedGamm = (number: number | string): string => {
	let value = new BigNumber(number)

	if (value.abs().gt(1000)) {
		value = new BigNumber(Math.floor(value.toNumber()))
	}

	return new Intl.NumberFormat("en-US", {
		maximumFractionDigits: 5,
	}).format(value.toNumber())
}

export const smallNumber = (number: number | string): string => {
	return new BigNumber(number).toFixed(2)
}

export const smallNumberRate = (number: number | string): string => {
	return new BigNumber(number).toFixed(3)
}

export const percentageRange = (
	number: number | string,
	decimals = 3
): string => {
	const amount = new BigNumber(number)

	if (amount.isNaN() || amount.isEqualTo(0)) {
		return "0.00"
	}

	if (amount.gt(0.001)) {
		return new Intl.NumberFormat("en-US", {
			maximumFractionDigits: decimals,
			minimumFractionDigits: decimals,
		}).format(amount.multipliedBy(100).toNumber())
	}

	return "< 0.001"
}

export const percentage = (number: number | string, decimals = 2): string => {
	return new Intl.NumberFormat("en-US", {
		maximumFractionDigits: decimals,
		minimumFractionDigits: decimals,
	}).format(new BigNumber(number).multipliedBy(100).toNumber())
}

export const toFiatValue = (value: string | number, fiat: string | number) => {
	return new BigNumber(value).multipliedBy(fiat)
}

export const toDecimalGamm = (value: string) => {
	return new BigNumber(value)
		.multipliedBy(coinsConfig.shareCoinPoolDecimals)
		.toString()
}

export const fromDecimalGamm = (value: string) => {
	return new BigNumber(value).div(coinsConfig.shareCoinPoolDecimals).toString()
}

export const toViewDenom = (
	value: string | number,
	chainToViewConversionFactor: string | number
) => {
	return new BigNumber(value)
		.multipliedBy(chainToViewConversionFactor)
		.toString()
}

export const fromViewDenom = (
	value: string | number,
	chainToViewConversionFactor: string | number
) => {
	return new BigNumber(value).div(chainToViewConversionFactor).toString()
}

export const amountToCoin = (value: string, network: Token) => {
	const coinLookup = network.coinLookup.find(
		(coin) => coin.viewDenom === network.symbol
	)

	if (coinLookup) {
		return {
			amount: toViewDenom(value, coinLookup.chainToViewConversionFactor),
			denom: coinLookup.chainDenom,
		}
	}
}

export const amountFromCoin = (value: string, network: Token) => {
	const coinLookup = network.coinLookup.find(
		(coin) => coin.viewDenom === network.symbol
	)

	if (coinLookup) {
		return coin(
			fromViewDenom(value, coinLookup.chainToViewConversionFactor),
			coinLookup.fantokenDenom ? coinLookup.fantokenDenom : coinLookup.chainDenom
		)
	}
}

export const amountIBCFromCoin = (value: string, network: Token) => {
	const coinLookup = network.coinLookup.find(
		(coin) => coin.viewDenom === network.symbol
	)

	if (coinLookup) {
		return coin(
			fromViewDenom(value, coinLookup.chainToViewConversionFactor),
			network.ibcEnabled ? network.ibc.osmosis.destDenom : coinLookup.chainDenom
		)
	}
}

export const compareBalance = (amount: string, compare: string): boolean => {
	const number = new BigNumber(amount)
	const compareNumber = new BigNumber(compare)

	return number.lte(compareNumber)
}

export const isNegative = (amount: string): boolean => {
	const number = new BigNumber(amount)

	return number.isNegative()
}

export const isNaN = (amount: string): boolean => {
	const number = new BigNumber(amount)

	return number.isNaN()
}

export const equalZero = (amount: string): boolean => {
	const number = new BigNumber(amount)

	return number.eq(0)
}

export const gtnZero = (amount: string): boolean => {
	const number = new BigNumber(amount)

	return number.gt(0)
}

export const gteCompare = (amount: string, compare: string): boolean => {
	const number = new BigNumber(amount)

	return number.gte(new BigNumber(compare))
}

export const gtCompare = (amount: string, compare: string): boolean => {
	const number = new BigNumber(amount)

	return number.gt(new BigNumber(compare))
}

export const gteComparePercentage = (
	amount: string,
	compare: string,
	percentage = 0.2
): boolean => {
	const number = new BigNumber(amount)

	return number.gte(new BigNumber(compare).multipliedBy(percentage))
}

export const calculateSpotPrice = (
	assetIn: OsmosisPoolAsset,
	assetOut: OsmosisPoolAsset,
	swapFee = "0"
) => {
	const tokenBalanceIn = new BigNumber(assetIn.token.amount)
	const tokenWeightIn = new BigNumber(assetIn.weight)
	const tokenBalanceOut = new BigNumber(assetOut.token.amount)
	const tokenWeightOut = new BigNumber(assetOut.weight)

	const number = tokenBalanceIn.div(tokenWeightIn)
	const denom = tokenBalanceOut.div(tokenWeightOut)
	const scale = new BigNumber(1).div(new BigNumber(1).minus(swapFee))

	return number.div(denom).multipliedBy(scale)
}

export const calculateRouteSpotPrice = (
	fromCoin: Token,
	swapRoutes: SwapPool[]
) => {
	const coinLookup = fromCoin.coinLookup.find(
		(coin) => coin.viewDenom === fromCoin.symbol
	)

	let from: string | undefined = fromCoin.ibcEnabled
		? fromCoin.ibc.osmosis.destDenom
		: coinLookup?.chainDenom
	let to: string | undefined = undefined
	let spotPrice = new BigNumber("1")

	for (const swapRoute of swapRoutes) {
		to = swapRoute.out
		let poolAssetIn: OsmosisPoolAsset | undefined = undefined
		let poolAssetOut: OsmosisPoolAsset | undefined = undefined

		for (const poolAsset of swapRoute.pool.pool_assets) {
			if (poolAsset.token.denom === from) {
				poolAssetIn = poolAsset
			} else if (poolAsset.token.denom === to) {
				poolAssetOut = poolAsset
			}
		}

		if (poolAssetIn && poolAssetOut) {
			spotPrice = spotPrice.multipliedBy(
				calculateSpotPrice(
					poolAssetIn,
					poolAssetOut,
					swapRoute.pool.pool_params.swap_fee
				).toString()
			)
		}

		from = to
	}

	return spotPrice.toNumber()
}

export const solveConstantFunctionInvariant = (
	tokenBalanceFixedBefore: Decimal,
	tokenBalanceFixedAfter: Decimal,
	tokenWeightFixed: Decimal,
	tokenBalanceUnknownBefore: Decimal,
	tokenWeightUnknown: Decimal
) => {
	const oneDec = new Decimal(1)
	// weightRatio = (weightX/weightY)
	const weightRatio = tokenWeightFixed.div(tokenWeightUnknown)

	// y = balanceXBefore/balanceXAfter
	const y = tokenBalanceFixedBefore.div(tokenBalanceFixedAfter)

	// amountY = balanceY * (1 - (y ^ weightRatio))
	const yToWeightRatio = Decimal.pow(y, weightRatio)
	const paranthetical = oneDec.sub(yToWeightRatio)
	const amountY = tokenBalanceUnknownBefore.mul(paranthetical)

	return amountY.toString()
}

export const calcOutAmtGivenIn = (
	tokenInAmount: string,
	tokenIn: Token,
	swapRoutes: SwapPool[]
) => {
	const oneDec = new Decimal(1)
	const coinLookup = tokenIn.coinLookup.find(
		(coin) => coin.viewDenom === tokenIn.symbol
	)

	if (!coinLookup) {
		return "0"
	}

	let tokenAmountOut = tokenInAmount

	let from: string | undefined = tokenIn.ibcEnabled
		? tokenIn.ibc.osmosis.destDenom
		: coinLookup?.chainDenom
	let to: string | undefined = undefined

	for (const swapRoute of swapRoutes) {
		to = swapRoute.out
		let poolAssetIn: OsmosisPoolAsset | undefined = undefined
		let poolAssetOut: OsmosisPoolAsset | undefined = undefined

		for (const poolAsset of swapRoute.pool.pool_assets) {
			if (poolAsset.token.denom === from) {
				poolAssetIn = poolAsset
			} else if (poolAsset.token.denom === to) {
				poolAssetOut = poolAsset
			}
		}

		if (poolAssetIn && poolAssetOut) {
			const tokenAmountInAfterFee = new Decimal(tokenAmountOut).mul(
				oneDec.sub(swapRoute.pool.pool_params.swap_fee)
			)
			const poolTokenInBalance = new Decimal(poolAssetIn.token.amount)
			const poolPostSwapInBalance = poolTokenInBalance.plus(tokenAmountInAfterFee)

			tokenAmountOut = solveConstantFunctionInvariant(
				poolTokenInBalance,
				poolPostSwapInBalance,
				new Decimal(poolAssetIn.weight),
				new Decimal(poolAssetOut.token.amount),
				new Decimal(poolAssetOut.weight)
			)
		}

		from = to
	}

	return new Decimal(tokenAmountOut).toString()
}

export const calcPoolOutGivenSingleIn = (
	tokenBalanceIn: string,
	tokenWeightIn: string,
	poolSupply: string,
	totalWeight: string,
	tokenAmountIn: string,
	swapFee: string
) => {
	const normalizedWeight = new Decimal(tokenWeightIn).div(totalWeight)
	const zaz = new Decimal(1).minus(normalizedWeight).mul(swapFee)
	const tokenAmountInAfterFee = new Decimal(tokenAmountIn).mul(
		new Decimal(1).minus(zaz)
	)

	const newTokenBalanceIn = new Decimal(tokenBalanceIn).plus(
		tokenAmountInAfterFee
	)
	const tokenInRatio = newTokenBalanceIn.div(tokenBalanceIn)

	const poolRatio = Decimal.pow(tokenInRatio, normalizedWeight)
	const newPoolSupply = poolRatio.mul(poolSupply)

	return newPoolSupply.minus(poolSupply).toString()
}

export const singleAmountInPriceImpact = (
	token: Token,
	poolAsset: PoolAsset,
	coin: Coin
) => {
	const coinLookup = token.coinLookup.find(
		(coin) => coin.viewDenom === token.symbol
	)

	if (coinLookup) {
		const poolAssetAmount = new BigNumber(poolAsset.token.amount).div(
			coinLookup.chainToViewConversionFactor
		)

		return new BigNumber(1)
			.minus(poolAssetAmount.div(poolAssetAmount.plus(coin.amount)))
			.multipliedBy(100)
			.toString()
	}

	return "0"
}

export function calcOutGivenIn(
	tokenIn: Coin,
	poolAssetIn: OsmosisPoolAsset,
	poolAssetOut: OsmosisPoolAsset,
	swapFee: string
) {
	const poolAssetBalanceIn = new Decimal(poolAssetIn.token.amount)
	const weightRatio = new Decimal(poolAssetIn.weight).div(poolAssetOut.weight)
	let adjustedIn = new Decimal(1).sub(swapFee)
	adjustedIn = new Decimal(tokenIn.amount).mul(adjustedIn)
	const midResult = poolAssetBalanceIn.div(poolAssetBalanceIn.plus(adjustedIn))

	const power = Decimal.pow(midResult, weightRatio)
	const difference = new Decimal(1).sub(power)

	return new Decimal(poolAssetOut.token.amount).mul(difference)
}

export function calcOutGivenOut(
	tokenOut: Coin, // n
	poolAssetIn: OsmosisPoolAsset,
	poolAssetOut: OsmosisPoolAsset,
	swapFee: string
) {
	// Reverse function of calcOutGivenIn
	// (l*(-(n - f)/f)^(-b/a)*((-(n - f)/f)^(b/a) - 1))/(d - 1)
	const tokenOutAmount = new Decimal(tokenOut.amount) // n
	const poolAssetBalanceIn = new Decimal(poolAssetIn.token.amount) // l
	const poolAssetBalanceOut = new Decimal(poolAssetOut.token.amount) // f
	const poolAssetWeightIn = new Decimal(poolAssetIn.weight) // a
	const poolAssetWeightOut = new Decimal(poolAssetOut.weight) // b
	const weightRatio = poolAssetWeightOut.div(poolAssetWeightIn)
	const swapFeeAmount = new Decimal(swapFee)
	const minusOne = new Decimal(-1)
	const one = new Decimal(1)
	const poolOutBase = one.minus(tokenOutAmount.div(poolAssetBalanceOut))

	const poolOut = Decimal.pow(poolOutBase, minusOne.mul(weightRatio))

	return poolAssetBalanceIn
		.mul(one.minus(poolOut))
		.div(swapFeeAmount.plus(minusOne))
}

export const estimateSwapExactAmountIn = (
	tokenIn: Coin,
	tokenOut: Coin,
	poolAssetIn: OsmosisPoolAsset,
	poolAssetOut: OsmosisPoolAsset,
	swapFee: string
) => {
	const spotPriceBefore = calculateSpotPrice(poolAssetIn, poolAssetOut, swapFee)

	const tokenOutAmount = calcOutGivenIn(
		tokenIn,
		poolAssetIn,
		poolAssetOut,
		swapFee
	)

	const tokenInAmount = calcOutGivenOut(
		tokenOut,
		poolAssetIn,
		poolAssetOut,
		swapFee
	)

	const afterPoolAssetIn = {
		...poolAssetIn,
		token: {
			...poolAssetIn.token,
			amount: new Decimal(poolAssetIn.token.amount)
				.plus(tokenIn.amount)
				.toString(),
		},
	}

	const afterPoolAssetOut = {
		...poolAssetOut,
		token: {
			...poolAssetOut.token,
			amount: new Decimal(poolAssetOut.token.amount)
				.sub(tokenOutAmount)
				.toString(),
		},
	}

	const spotPriceAfter = calculateSpotPrice(
		afterPoolAssetIn,
		afterPoolAssetOut,
		swapFee
	)

	if (spotPriceAfter.lt(spotPriceBefore)) {
		return null
	}

	const effectivePrice = new Decimal(tokenIn.amount).div(tokenOutAmount)
	const slippage = effectivePrice
		.div(spotPriceBefore.toString())
		.sub(new Decimal("1"))

	return {
		tokenOutAmount,
		tokenInAmount,
		spotPriceBefore,
		spotPriceAfter,
		slippage,
	}
}

export const estimateHopSwapExactAmountIn = (
	tokenIn: Coin,
	tokenOut: Coin,
	fromCoin: Token,
	swapRoutes: SwapPool[]
) => {
	const coinLookup = fromCoin.coinLookup.find(
		(coin) => coin.viewDenom === fromCoin.symbol
	)

	let from: string | undefined = fromCoin.ibcEnabled
		? fromCoin.ibc.osmosis.destDenom
		: coinLookup?.chainDenom
	let to: string | undefined = undefined

	let spotPriceBefore = new Decimal(1)
	let spotPriceAfter = new Decimal(1)

	let tokenOutput = { ...tokenIn }
	let tokenInput = { ...tokenOut }

	for (const swapRoute of swapRoutes) {
		to = swapRoute.out
		let poolAssetIn: OsmosisPoolAsset | undefined = undefined
		let poolAssetOut: OsmosisPoolAsset | undefined = undefined

		for (const poolAsset of swapRoute.pool.pool_assets) {
			if (poolAsset.token.denom === from) {
				poolAssetIn = poolAsset
			} else if (poolAsset.token.denom === to) {
				poolAssetOut = poolAsset
			}
		}

		if (poolAssetIn && poolAssetOut) {
			const estimated = estimateSwapExactAmountIn(
				// It is the Token In you should swap, in multihop swap,
				// you have to update it, because you need the out of the previous iteration
				tokenOutput,
				tokenInput,
				poolAssetIn,
				poolAssetOut,
				swapRoute.pool.pool_params.swap_fee
			)

			if (estimated && from) {
				spotPriceBefore = spotPriceBefore.mul(estimated.spotPriceBefore.toString())
				spotPriceAfter = spotPriceAfter.mul(estimated.spotPriceAfter.toString())

				tokenOutput = {
					denom: to,
					amount: estimated.tokenOutAmount.toString(),
				}

				tokenInput = {
					denom: from,
					amount: estimated.tokenInAmount.toString(),
				}
			}
		}

		from = to
	}

	const effectivePrice = new Decimal(tokenIn.amount).div(
		new Decimal(tokenOut.amount)
	)
	const slippage = effectivePrice.div(spotPriceBefore).sub(new Decimal("1"))

	return {
		spotPriceBefore,
		spotPriceAfter,
		tokenOutput,
		tokenInput,
		slippage,
	}
}

export const calculateSlippageTokenIn = (
	spotPriceBefore: Decimal,
	tokenIn: string,
	slippage: Decimal
) => {
	const effectivePrice = spotPriceBefore.mul(slippage.add(new Decimal(1)))

	return new Decimal(tokenIn).div(effectivePrice)
}
