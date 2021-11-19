
import { TypeValue } from "src/common/classes/ConstantType";
import { InsertData } from "src/common/classes/InsertData";
import { GraphQLMutation } from "../GraphQLMutation";

export class CreateTypeValueMutation extends GraphQLMutation<InsertData<TypeValue>, TypeValue> {
    mutation = `
    mutation createTypeValue($insertData: TypeValueInput!) {
        createTypeValue(insertData: $insertData) {
            id
            value
            constantTypeId
            createdAt
        }
    }
    `
}
