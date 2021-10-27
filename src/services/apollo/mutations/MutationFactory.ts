import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { ExchangeRate } from "src/common/classes/ExchangeRate";
import { InsertData } from "src/common/classes/InsertData";
import { Operation } from "src/common/classes/Operation";
import { PriceRV } from "src/common/classes/PriceRV";
import { StockTitle } from "src/common/classes/StockTitle";
import { CreateExchangeRateMutation } from "./CreateExchangeRateMutation";
import { CreateOperationMutation } from "./CreateOperationMutation";
import { CreatePriceRVMutation } from "./CreatePriceRVMutation";
import { CreateStockTitleMutation } from "./CreateStockTitleMutation";

@Injectable({
    providedIn: 'root'
})
export class MutationFactory {
    constructor(private apollo: Apollo) { }
    getCreateStockTitleMutation(stockTitle: StockTitle) {
        return new CreateStockTitleMutation(this.apollo, stockTitle);
    }
    getCreateExchangeRateMutation(exchangeRate: ExchangeRate) {
        return new CreateExchangeRateMutation(this.apollo, exchangeRate);
    }
    getCreatePriceRVMutation(priceRV: PriceRV) {
        let insertData = new InsertData(priceRV);
        return new CreatePriceRVMutation(this.apollo, insertData);
    }
    getCreateOperationMutation(operation: Operation) {
        return new CreateOperationMutation(this.apollo, new InsertData(operation));
    }
}