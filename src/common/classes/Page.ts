export class Page<T> {
    limit?: number;
    skip?: number;
    data?: T[];
    total?: number;

    constructor(limit?: number, skip?: number) {
        this.limit = limit;
        this.skip = skip;
    }
}