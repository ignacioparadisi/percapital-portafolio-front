import { InsertData } from "src/common/classes/InsertData";
import { StockHistoric, StockHistoricInput } from "src/common/classes/StockHistoric";
import { GraphQLMutation } from "../GraphQLMutation";

export class CreateStockHistoricMutation extends GraphQLMutation<InsertData<StockHistoricInput[]>, StockHistoric> {
    mutation = `
    mutation createStockHistoric($insertData: [StockHistoricInput]!) {
        createStockHistoric(insertData: $insertData) {
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