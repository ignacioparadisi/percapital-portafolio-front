export class StockTitle {
    id: number
    name: string
    symbol: string
    createdAt: Date

    constructor(name: string, symbol: string) {
        this.name = name
        this.symbol = symbol
    }
}