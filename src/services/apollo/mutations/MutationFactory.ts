import { StockTitle } from "src/common/classes/StockTitle";
import { CreateStockTitleMutation } from "./CreateStockTitleMutation";

export class MutationFactory {
    static getCreateStockTitleMutation(stockTitle: StockTitle): CreateStockTitleMutation {
        return new CreateStockTitleMutation(stockTitle);
    }
}