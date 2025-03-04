import { WalterAPIResponseBase } from '../common/Response';
import { GET_STOCK_STATISTICS } from '../common/Methods';
import axios, { AxiosResponse } from 'axios';

export interface StockStatistics {
  marketCapitalization: number;
  ebitda: number;
  peRatio: number;
  dividendYield: number;
  eps: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
}

export class GetStatisticsResponse extends WalterAPIResponseBase {
  private readonly statistics: StockStatistics | null;

  constructor(status: string, message: string, data?: any) {
    super(GET_STOCK_STATISTICS, status, message);
    this.statistics = this.parseData(data);
  }

  public getStatistics(): StockStatistics | null {
    return this.statistics;
  }

  private parseData(data?: any): StockStatistics | null {
    if (data === null || data === undefined) {
      return null;
    }
    return {
      marketCapitalization: data['statistics']['market_cap'],
      ebitda: data['statistics']['ebitda'],
      peRatio: data['statistics']['pe_ratio'],
      dividendYield: data['statistics']['dividend_yield'],
      eps: data['statistics']['eps'],
      fiftyTwoWeekHigh: data['statistics']['fifty_two_week_high'],
      fiftyTwoWeekLow: data['statistics']['fifty_two_week_low'],
    };
  }
}

export async function getStatistics(
  endpoint: string,
  symbol: string,
): Promise<GetStatisticsResponse> {
  const response: AxiosResponse = await axios({
    method: 'GET',
    url: `${endpoint}/stocks/statistics?symbol=${symbol}`,
  });
  return new GetStatisticsResponse(
    response.data['Status'],
    response.data['Message'],
    response.data['Data'],
  );
}
