export class ExchangeRate {
    id?: number;
    value: number;
    createdAt: Date;

    constructor(value: number, date: Date) {
        this.value = value;
        this.createdAt = date;
    }
}
