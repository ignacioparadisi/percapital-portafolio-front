import { ExchangeRate } from "./ExchangeRate";
import { StockTitle } from "./StockTitle";

export class PriceRV {
    id: number;
    titleId?: number;
    exchangeRateId?: number;
    bolivaresPrice?: number;
    closePrice?: number;
    createdAt?: Date;
    closeDate?: Date;
    latestExchangeRate?: number;
    exchangeRate?: ExchangeRate;
    stockTitle?: StockTitle;

   constructor(titleId?: number, exchangeRateId?: number, bolivaresPrice?: number,
    closePrice?: number, closeDate?: Date, createdAt?: Date) {
        this.titleId = titleId;
        this.exchangeRateId = exchangeRateId;
        this.bolivaresPrice = bolivaresPrice;
        this.closePrice = closePrice;
        this.createdAt = createdAt;
        this.closeDate = closeDate;
   }
}
