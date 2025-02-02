import { WalterAPIResponseBase } from '../common/Response';
import axios, { AxiosResponse } from 'axios';
import { SEARCH_STOCKS_METHOD } from '../common/Methods';

export interface StockSearch {
  symbol: string;
  name: string;
  type: string;
  region: string;
  currency: string;
  match_score: string;
}

export class SearchStocksResponse extends WalterAPIResponseBase {
  private readonly stockSearchList: StockSearch[];

  constructor(status: string, message: string, data?: any) {
    super(SEARCH_STOCKS_METHOD, status, message);
    this.stockSearchList = this.parseData(data)!;
  }

  public getStocks(): StockSearch[] {
    return this.stockSearchList;
  }

  private parseData(data: any): StockSearch[] {
    if (data === undefined) {
      return [];
    }
    return data.stocks;
  }
}

export async function searchStocks(
  endpoint: string,
  symbol: string,
): Promise<SearchStocksResponse> {
  const response: AxiosResponse = await axios({
    method: 'GET',
    url: `${endpoint}/stocks/search?symbol=${symbol}`,
  });
  return new SearchStocksResponse(
    response.data['Status'],
    response.data['Message'],
    response.data['Data'],
  );
}
