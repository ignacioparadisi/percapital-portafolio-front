import { OperationType } from "./OperationType";
import { PriceRV } from "./PriceRV";

export class Operation {
    id: number;
    typeId?: number;
    titleId?: number;
    priceRvId?: number
    stockAmount?: number;
    stockPrice?: number;
    ivaCvId?: number;
    comissionCvId?: number;
    registerCvId?: number;
    createdAt?: Date;
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

    constructor(typeId: number, titleId?: number, stockAmount?: number, stockPrice?: number, exchangeRate?: number, ivaId?: number, comissionId?: number, registerId?: number, createdAt?: Date) {
        this.typeId = typeId;
        this.titleId = titleId;
        this.stockAmount = stockAmount;
        this.stockPrice = stockPrice;
        this.ivaCvId = ivaId;
        this.comissionCvId = comissionId;
        this.registerCvId = registerId;
        this.createdAt = createdAt;
        if (exchangeRate) {
            this.exchangeRate = exchangeRate;
        }
    }
}