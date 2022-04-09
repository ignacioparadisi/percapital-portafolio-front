import {GraphQLQuery} from "../GraphQLQuery";
import {Prediction} from "../../../common/classes/Prediction";

export class GetPredictionQuery extends GraphQLQuery<Prediction, Prediction> {
  query = `
  query getPrediction($symbol: String!, $lookUpDays: Int!) {
    getPrediction(symbol: $symbol, lookUpDays: $lookUpDays) {
      symbol
      futurePrice
      lookUpDays
      trueData {
        x
        y
      }
      data {
        x
        y
      }
    }
  }
  `
}
