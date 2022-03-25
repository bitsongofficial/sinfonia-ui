import { Token, OsmosisPoolAsset } from '@/types'
import { coin } from '@cosmjs/proto-signing'
import { BigNumber } from 'bignumber.js'

export const currency = (number: number | string): string => {
	const amount = new BigNumber(number)

	if (amount.isEqualTo(0)) {
		return '0'
	}

	if (amount.gt(0.01)) {
		return new Intl.NumberFormat('en-US', {
			maximumFractionDigits: 2
		}).format(amount.toNumber())
	}

	return '< 0.01'
}

export const balancedCurrency = (number: number | string): string => {
	const value = new BigNumber(number)

	if(value.abs().gt(1000))
	{
		number = Math.floor(value.toNumber())
	}

	return currency(value.toString())
}

export const smallNumber = (number: number | string): string => {
	return new BigNumber(number).toFixed(2)
}

export const percentage = (number: number | string): string => {
	return new BigNumber(number).multipliedBy(100).toFixed(2)
}

export const toFiatValue = (value: string | number, fiat: string | number) => {
	return new BigNumber(value).multipliedBy(fiat)
}

export const toDecimalGamm = (value: string) => {
	return new BigNumber(value).multipliedBy(1e-18).toString() 
}

export const toViewDenom = (value: string | number, chainToViewConversionFactor: string | number) => {
	return new BigNumber(value).multipliedBy(chainToViewConversionFactor).toString()
}

export const fromViewDenom = (value: string | number, chainToViewConversionFactor: string | number) => {
	return new BigNumber(value).div(chainToViewConversionFactor).toString()
}

export const amountToCoin = (value: string, network: Token) => {
	const coinLookup = network.coinLookup.find(
		(coin) => coin.viewDenom === network.symbol
	)

	if (coinLookup) {
		return {
			amount: toViewDenom(value, coinLookup.chainToViewConversionFactor),
			denom: coinLookup.chainDenom
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
			network.ibc.osmosis.destDenom
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

export const calculateSpotPrice = (assetIn: OsmosisPoolAsset, assetOut: OsmosisPoolAsset, swapFee = '0') => {
	const tokenBalanceIn = new BigNumber(assetIn.token.amount)
	const tokenWeightIn = new BigNumber(assetIn.weight)
	const tokenBalanceOut = new BigNumber(assetOut.token.amount)
	const tokenWeightOut = new BigNumber(assetOut.weight)

	const number = tokenBalanceIn.div(tokenWeightIn);
	const denom = tokenBalanceOut.div(tokenWeightOut);
	const scale = new BigNumber(1).div(new BigNumber(1).minus(swapFee));

	return number.div(denom).multipliedBy(scale);
}