import { ExchangeRate } from "./ExchangeRate";
import { StockTitle } from "./StockTitle";

export class PriceRV {
    id: number;
    titleId: number;
    exchangeRateId: number;
    bolivaresPrice: number;
    closePrice: number;
    createdAt: Date;
    closeDate: Date;
    latestExchangeRate: number;
    exchangeRate?: ExchangeRate;
    stockTitle?: StockTitle;

   constructor(id: number, titleId: number, exchangeRateId: number, bolivaresPrice: number, 
    closePrice: number, createdAt: Date, closeDate: Date, latestExchangeRate: number, 
    exchangeRate?: ExchangeRate, stockTitle?: StockTitle) {
        this.id = id;
        this.titleId = titleId;
        this.exchangeRateId = exchangeRateId;
        this.bolivaresPrice = bolivaresPrice;
        this.closePrice = closePrice;
        this.createdAt = createdAt;
        this.closeDate = closeDate;
        this.latestExchangeRate = latestExchangeRate;
        this.exchangeRate = exchangeRate;
        this.stockTitle = stockTitle;
   }
}