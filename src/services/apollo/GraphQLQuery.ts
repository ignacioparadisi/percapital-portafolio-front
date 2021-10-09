import { DocumentNode } from "graphql";

export abstract class GraphQLQuery<Params> {
    readonly name: string;
    readonly query: DocumentNode;
    constructor(readonly params: Params) { }
}