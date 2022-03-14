export const currency = (number: number): string =>
{
    return (new Intl.NumberFormat('en-US', {maximumFractionDigits: 2}).format(number))
}

export const balancedCurrency = (number: number): string =>
{
    if(Math.abs(number) > 1000)
    {
        number = Math.floor(number)
    }
    return currency(number)
}

export const percentage = (number: number): string =>
{
    return number.toFixed(2)
}