const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: 'USD',
    style: 'currency',
    minimumFractionDigits: 0
})

export const formatCurrency = (number: number) => {
    return CURRENCY_FORMATTER.format(number)
}