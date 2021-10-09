import { DocumentNode } from "graphql";

export abstract class GraphQLQuery<Params, Result> {
    readonly name: string;
    readonly value: DocumentNode;
    constructor(readonly params?: Params) { }
}