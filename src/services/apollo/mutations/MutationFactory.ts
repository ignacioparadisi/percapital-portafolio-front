import { StockTitle } from "src/common/classes/StockTitle";
import { GraphQLMutation } from "../GraphQLMutation";
import { CreateStockTitleMutation } from "./CreateStockTitleMutation";

export class MutationFactory {
    static getCreateStockTitleMutation(stockTitle: StockTitle): GraphQLMutation<StockTitle, StockTitle> {
        return new CreateStockTitleMutation(stockTitle);
    }
}