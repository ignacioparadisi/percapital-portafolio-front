
import { TypeValue } from "src/common/classes/ConstantType";
import { InsertData } from "src/common/classes/InsertData";
import { User } from "src/common/classes/User";
import { GraphQLMutation } from "../GraphQLMutation";

export class CreateUserMutation extends GraphQLMutation<InsertData<User>, User> {
    mutation = `
    mutation createUser($insertData: UserInput!) {
        createUser(insertData: $insertData) {
            id
            name
            email
            roles {
                id
                name
            }
        }
    }
    `
}