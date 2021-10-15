import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { StockTitle } from "src/common/classes/StockTitle";
import { GraphQLMutation } from "../GraphQLMutation";
import { CreateStockTitleMutation } from "./CreateStockTitleMutation";

@Injectable({
    providedIn: 'root'
})
export class MutationFactory {
    constructor(private apollo: Apollo) { }
    getCreateStockTitleMutation(stockTitle: StockTitle): GraphQLMutation<StockTitle, StockTitle> {
        return new CreateStockTitleMutation(this.apollo, stockTitle);
    }
}