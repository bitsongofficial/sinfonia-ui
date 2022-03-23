import { BigNumber } from 'bignumber.js'

export const currency = (number: number | string): string =>
{
	return (new Intl.NumberFormat('en-US', {maximumFractionDigits: 2}).format(new BigNumber(number).toNumber()))
}

export const balancedCurrency = (number: number | string): string =>
{
	const value = new BigNumber(number)

	if(value.abs().gt(1000))
	{
		number = Math.floor(value.toNumber())
	}

	return currency(value.toString())
}

export const smallNumber = (number: number | string): string =>
{
	return new BigNumber(number).toFixed(2)
}

export const percentage = (number: number | string): string =>
{
	return new BigNumber(number).toFixed(2)
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