export class Report {
    id: number;
    symbol: string;
    name?: string;
    createdAt: Date;
    changePercentage: number;
    latestPrice: number;
    buyChangePercentage?: number;
    sellChangePercentage?: number;

    constructor(id: number,
        symbol: string,
        createdAt: Date,
        changePercentage: number,
        latestPrice: number,
        name?: string,
        buyChangePercentage?: number,
        sellChangePercentage?: number) {
        this.id = id;
        this.symbol = symbol;
        this.name = name;
        this.createdAt = createdAt;
        this.changePercentage = changePercentage;
        this.latestPrice = latestPrice;
        this.buyChangePercentage = buyChangePercentage;
        this.sellChangePercentage = sellChangePercentage;
    }
}