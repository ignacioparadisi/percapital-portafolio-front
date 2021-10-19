import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { ExchangeRate } from "src/common/classes/ExchangeRate";
import { InsertData } from "src/common/classes/InsertData";
import { PriceRV } from "src/common/classes/PriceRV";
import { StockTitle } from "src/common/classes/StockTitle";
import { GraphQLMutation } from "../GraphQLMutation";
import { CreateExchangeRateMutation } from "./CreateExchangeRateMutation";
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
        let insertData = new InsertData<PriceRV>(priceRV);
        return new CreatePriceRVMutation(this.apollo, insertData);
    }
}