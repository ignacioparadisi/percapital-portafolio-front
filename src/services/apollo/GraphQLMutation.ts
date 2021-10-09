import { DocumentNode } from "graphql";

export abstract class GraphQLMutation<Params> {
    readonly name: string
    readonly mutation: DocumentNode
    constructor(readonly params: Params) { }
}