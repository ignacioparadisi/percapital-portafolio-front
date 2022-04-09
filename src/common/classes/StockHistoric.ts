export class StockHistoric {
  id: number;
  symbol: string;
  symbolDescription?: string;
  closePrice: number;
  openPrice?: number;
  highPrice?: number;
  lowPrice?: number;
  volume?: string;
  change?: string;
  date: Date;
  interval?: string;

  constructor(symbol: string, interval?: string) {
    this.symbol = symbol;
    this.interval = interval;
    this.id = 0;
    this.closePrice = 0;
    this.date = new Date();
  }
}
