export abstract class CommonUtils {
    private static readonly currencyFormatter = new Intl.NumberFormat(undefined, {
        currency: 'USD',
        style: 'currency',
        minimumFractionDigits: 0
    });

    public static formatCurrency(value : number) : string {
        return this.currencyFormatter.format(value)
    }
}