import { gql } from "apollo-angular";
import { StockTitle } from "src/common/classes/StockTitle";
import { GraphQLMutation } from "../GraphQLMutation";

export class CreateStockTitleMutation extends GraphQLMutation<StockTitle, StockTitle> {
    name = 'createStockTitle';
    value = gql`
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