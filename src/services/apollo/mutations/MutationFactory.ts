import { Injectable, Type } from "@angular/core";
import { Apollo } from "apollo-angular";
import { TypeValue } from "src/common/classes/ConstantType";
import { ExchangeRate } from "src/common/classes/ExchangeRate";
import { InsertData } from "src/common/classes/InsertData";
import { Operation } from "src/common/classes/Operation";
import { PriceRV } from "src/common/classes/PriceRV";
import { StockHistoric } from "src/common/classes/StockHistoric";
import { StockTitle } from "src/common/classes/StockTitle";
import { User } from "src/common/classes/User";
import { CreateExchangeRateMutation } from "./CreateExchangeRateMutation";
import { CreateOperationMutation } from "./CreateOperationMutation";
import { CreatePriceRVMutation } from "./CreatePriceRVMutation";
import { CreateStockHistoricMutation } from "./CreateStockHistoricMutation";
import { CreateStockTitleMutation } from "./CreateStockTitleMutation";
import { CreateTypeValueMutation } from "./CreateTypeValueMutation";
import { CreateUserMutation } from "./CreateUserMutation";

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

    getCreateConstantValue(constantValue: TypeValue) {
        return new CreateTypeValueMutation(this.apollo, new InsertData(constantValue));
    }

    getCreateUserMutation(user: User) {
        return new CreateUserMutation(this.apollo, new InsertData(user));
    }

    getCreateStockHistoriMutation(stocks: StockHistoric[]) {
        return new CreateStockHistoricMutation(this.apollo, new InsertData(stocks));
    }
}