export class StockTitle {
    id: number;
    name: string;
    symbol: string;
    isinCode: string;
    stockAmount?: number;
    createdAt: Date;

    constructor(name: string, symbol: string, isinCode: string) {
        this.name = name
        this.symbol = symbol
        this.isinCode = isinCode
    }
}