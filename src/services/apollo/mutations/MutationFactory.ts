import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { ExchangeRate } from "src/common/classes/ExchangeRate";
import { StockTitle } from "src/common/classes/StockTitle";
import { GraphQLMutation } from "../GraphQLMutation";
import { CreateExchangeRateMutation } from "./CreateExchangeRateMutation";
import { CreateStockTitleMutation } from "./CreateStockTitleMutation";

@Injectable({
    providedIn: 'root'
})
export class MutationFactory {
    constructor(private apollo: Apollo) { }
    getCreateStockTitleMutation(stockTitle: StockTitle): GraphQLMutation<StockTitle, StockTitle> {
        return new CreateStockTitleMutation(this.apollo, stockTitle);
    }
    getCreateExchangeRateMutation(exchangeRate: ExchangeRate): GraphQLMutation<ExchangeRate, ExchangeRate> {
        return new CreateExchangeRateMutation(this.apollo, exchangeRate);
    }
}