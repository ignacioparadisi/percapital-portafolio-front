export class Prediction {
  symbol: string;
  futurePrice: number;
  lookUpDays: number;
  trueData: PredictionData;
  data: PredictionData;

  constructor(symbol: string, lookUpDays: number) {
    this.symbol = symbol;
    this.lookUpDays = lookUpDays;
  }
}

export class PredictionData {
  x: string[];
  y: number[];
}
