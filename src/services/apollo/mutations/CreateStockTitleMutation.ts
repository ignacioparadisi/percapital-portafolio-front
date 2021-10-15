import { StockTitle } from "src/common/classes/StockTitle";
import { GraphQLMutation } from "../GraphQLMutation";

export class CreateStockTitleMutation extends GraphQLMutation<StockTitle, StockTitle> {
    mutation = `
    mutation createStockTitle($name: String!, $symbol: String!) {
        createStockTitle(insertData: {
            name: $name,
            symbol: $symbol
        }) {
            id
            name
            symbol
            createdAt
        }
    }
    `
}