import { ExchangeRate } from "./ExchangeRate";
import { OperationType } from "./OperationType";
import { PriceRV } from "./PriceRV";

export class Operation {
    id: number;
    userId: number;
    typeId: number;
    createdAt: Date;
    stockAmount?: number;
    stockPrice?: number;
    operationType: OperationType;
    exchangeRate: number;
    priceRV?: PriceRV;
    value: number;
    comission: number;
    iva: number;
    register: number;

    // Variables for sell ops
    sellNetValue?: number;
    sellRawDollarValue?: number;
    sellDollarNetValue?: number;

    // Variables for buy ops
    buyTotalCost?: number;
    buyUnitTotalPrice?: number;
    buyDollarTotalCost?: number;
    buyDollarUnitTotalPrice?: number;
    buyMarketPrice?: number;
    buyVariation?: number;
    buyMarketValue?: number;
    buyComissionPercentage?: number;
    buyIvaPercentage?: number;
    buyRegisterPercentage?: number;
    buyTotalIncome?: number;
    buyGpValue?: number;
    buyPerformanceValue?: number;
    buyWeightInWallet?: number;
    buyWeightedPerformance?: number;
    buyDollarGp?: number;
    buyDollarPerformanceValue?: number;
    buyDollarWeightedPerformance?: number;

    constructor(typeId: number) {
        this.typeId = typeId;
    }
}