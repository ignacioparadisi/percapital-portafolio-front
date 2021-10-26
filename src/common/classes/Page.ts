export class Page<T> {
    limit?: number;
    skip?: number;
    latest?: boolean;
    data?: T[];
    where?: T;
    total?: number;

    constructor(limit?: number, skip?: number, where?: T, latest?: boolean) {
        this.limit = limit;
        this.skip = skip;
        this.where = where;
        this.latest = latest
    }
}