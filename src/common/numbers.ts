export const currency = (number: number): string =>
{
    return (new Intl.NumberFormat(undefined, {maximumFractionDigits: 2}).format(number))
}

export const balancedCurrency = (number: number): string =>
{
    if(number > 1000)
    {
        return currency(Math.floor(number))
    }
    return (new Intl.NumberFormat().format(number))
}

export const percentage = (number: number): string =>
{
    return number.toFixed(2)
}