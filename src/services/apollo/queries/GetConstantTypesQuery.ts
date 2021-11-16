import { ConstantType } from "src/common/classes/ConstantType";
import { GraphQLQuery } from "../GraphQLQuery";

export class GetConstantTypesQuery extends GraphQLQuery<ConstantType, ConstantType[]> {
    query = `
    query getConstantTypes {
        getConstantTypes {
          id
          name
          values {
            id
            value
            createdAt
          }
        }
    }
    `;
}