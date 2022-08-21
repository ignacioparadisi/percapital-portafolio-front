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

  constructor(symbol: string, 
    interval?: string, 
    symbolDescription?: string, 
    closePrice?: number, 
    openPrice?: number, 
    highPrice?: number, 
    lowPrice?: number, 
    volume?: string,
    change?: string) {
    this.symbol = symbol;
    this.interval = interval;
    this.id = 0;
    this.symbolDescription = symbolDescription;
    this.closePrice = closePrice ?? 0;
    this.openPrice = openPrice;
    this.highPrice = highPrice;
    this.lowPrice = lowPrice;
    this.volume = volume;
    this.change = change;
    this.date = new Date();
  }

}

export class StockHistoricInput {
  symbol: string;
  symbolDescription?: string;
  closePrice: number;
  openPrice?: number | null;
  highPrice?: number | null;
  lowPrice?: number | null;
  volume?: string;
  change?: string;
  date: Date;

  constructor(symbol: string, 
    date: Date,
    symbolDescription?: string, 
    closePrice?: number, 
    openPrice?: number, 
    highPrice?: number, 
    lowPrice?: number, 
    volume?: string,
    change?: string) {
    this.symbol = symbol;
    this.symbolDescription = symbolDescription;
    this.closePrice = closePrice ?? 0;
    this.openPrice = openPrice ? (isNaN(openPrice) ? null : openPrice) : null;
    this.highPrice = highPrice ? (isNaN(highPrice) ? null : highPrice) : null;
    this.lowPrice = lowPrice ? (isNaN(lowPrice) ? null : lowPrice) : null;
    this.volume = volume;
    this.change = change;
    this.date = date;
  }

}

