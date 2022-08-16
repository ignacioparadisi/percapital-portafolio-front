import { InsertData } from "src/common/classes/InsertData";
import { StockHistoric } from "src/common/classes/StockHistoric";
import { StockTitle } from "src/common/classes/StockTitle";
import { GraphQLMutation } from "../GraphQLMutation";

export class CreateStockHistoricMutation extends GraphQLMutation<InsertData<StockHistoric[]>, StockHistoric> {
    mutation = `
    mutation createStockHistoric($input: [StockHistoricInput]!) {
        createStockHistoric(input: $input) {
            id
            symbol
            symbolDescription
            date
            closePrice
            openPrice
            highPrice
            lowPrice
            volume
            change
        }
    }
    `
}