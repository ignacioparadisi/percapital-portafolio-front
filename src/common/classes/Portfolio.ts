import { Page } from "./Page"

export class Portfolio {
    id: number
    titleSymbol: string
    titleDesc: string
    stockPrice: number
    stockInFolio?: number
    avgBuyPrice?: number
    buyTotalCost?: number
    dollarBuyTotalCost?: number
    marketNetValue?: number
    dollarMarketNetValue?: number
    rawValue?: number
    dollarRawValue?: number
    rawSells?: number
    dollarRawSells?: number
    netGp?: number
    dollarNetGp?: number
    variation?: number
    dollarVariation?: number
    percentageInFolio?: number
}

export class PortfolioPage extends Page<Portfolio> {
    totalStocksAmount?: number
    totalBuyTotalCost?: number
    totalDollarBuyTotalCost?: number
    totalNetMarketValue?: number
    totalDollarNetMarketValue?: number
    totalRawValue?: number
    totalDollarRawValue?: number
    totalNetGp?: number
    totalDollarNetGp?: number
}