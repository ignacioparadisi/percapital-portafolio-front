import { Portfolio, PortfolioPage } from "src/common/classes/Portfolio";
import { GraphQLQuery } from "../GraphQLQuery";

export class GetPortfolioQuery extends GraphQLQuery<Portfolio, PortfolioPage> {
    query = `
    query getPortfolio {
        getPortfolio {
            data {
                id
                titleSymbol
                titleDesc
                stockPrice
                stockInFolio
                avgBuyPrice
                buyTotalCost
                dollarBuyTotalCost
                marketNetValue
                dollarMarketNetValue
                rawValue
                dollarRawValue
                rawSells
                dollarRawSells
                netGp
                dollarNetGp
                variation
                dollarVariation
                percentageInFolio
            }
            total
            totalStocksAmount
            totalBuyTotalCost
            totalDollarBuyTotalCost
            totalNetMarketValue
            totalDollarNetMarketValue
            totalRawValue
            totalDollarRawValue
            totalNetGp
            totalDollarNetGp
        }
    }
    `
}