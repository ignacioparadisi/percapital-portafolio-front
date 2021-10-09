import { DocumentNode } from "graphql";

export abstract class GraphQLMutation<Params, Result> {
    readonly name: string
    readonly value: DocumentNode
    constructor(readonly params?: Params) { }
}