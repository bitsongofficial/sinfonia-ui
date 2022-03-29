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

	if (amount.gt(0.01)) {
		return new Intl.NumberFormat("en-US", {
			maximumFractionDigits: fraction,
		}).format(amount.toNumber())
	}

	return "< 0.01"
}

export const balancedCurrency = (number: number | string): string => {
	let value = new BigNumber(number)

	if (value.abs().gt(1000)) {
		value = new BigNumber(Math.floor(value.toNumber()))
	}

	return currency(value.toString())
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
		return new BigNumber(amount.toString()).toFixed(decimals, 3)
	}

	return "< 0.001"
}

export const percentage = (number: number | string, decimals = 2): string => {
	return new BigNumber(number).multipliedBy(100).toFixed(decimals)
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

export const gtnZero = (amount: string): boolean => {
	const number = new BigNumber(amount)

	return number.gt(0)
}

export const gteCompare = (amount: string, compare: string): boolean => {
	const number = new BigNumber(amount)

	return number.gte(new BigNumber(compare))
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

		for (const poolAsset of swapRoute.pool.poolAssets) {
			if (poolAsset.token.denom === from) {
				poolAssetIn = poolAsset
			} else if (poolAsset.token.denom === to) {
				poolAssetOut = poolAsset
			}
		}

		if (poolAssetIn && poolAssetOut) {
			spotPrice = spotPrice.multipliedBy(
				calculateSpotPrice(poolAssetIn, poolAssetOut).toString()
			)
		}

		from = to
	}

	return spotPrice.toNumber()
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
