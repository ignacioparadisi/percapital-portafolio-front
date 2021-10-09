export class Page<T> {
    limit?: number;
    skip?: number;
    where?: T[];

    constructor(limit?: number, skip?: number) {
        this.limit = limit;
        this.skip = skip;
    }
}