import { Report } from "src/common/classes/Report";
import { GraphQLQuery } from "../GraphQLQuery";

export class GetReportsQuery extends GraphQLQuery<Report | undefined, Report[]> {
    query = `
    query getReports {
        getReports {
            id
            symbol
            name
            changePercentage
            createdAt
            latestPrice
            buyChangePercentage
            sellChangePercentage
        }
    }
    `
  }
  