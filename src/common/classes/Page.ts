export class Page<T> {
    limit?: number;
    skip?: number;
    data?: T[];
    where?: T;
    total?: number;

    constructor(limit?: number, skip?: number, where?: T) {
        this.limit = limit;
        this.skip = skip;
        this.where = where;
    }
}