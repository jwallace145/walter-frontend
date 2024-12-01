import { WalterAPIResponseBase } from '../common/Response';
import axios, { AxiosResponse } from 'axios';
import { GET_STOCK_METHOD } from '../common/Methods';

/**
 * Stock
 *
 * The stock model object of the information contained in WalterDB for each
 * included stock.
 */
export interface Stock {
  symbol: string;
  company: string;
}

/**
 * GetStockResponse
 *
 * The response object for the GetStock API which returns the stock details
 * stored in WalterDB for a given stock symbol.
 */
export class GetStockResponse extends WalterAPIResponseBase {
  private readonly stock: Stock | null;

  constructor(status: string, message: string, data?: any) {
    super(GET_STOCK_METHOD, status, message);
    this.stock = this.parseData(data)!;
  }

  public getStock(): Stock | null {
    return this.stock;
  }

  private parseData(data: any): Stock | null {
    if (data === undefined) {
      return null;
    }
    return data.stock;
  }
}

/**
 * Invoke the GetStock API and get the stock details from WalterDB.
 *
 * The response object accessor to the stock object is nullable if
 * the API throws an error or can't find the stock queried.
 *
 * @param endpoint The GetStock API endpoint.
 * @param symbol   The symbol of the stock to query.
 */
export async function getStock(
  endpoint: string,
  symbol: string,
): Promise<GetStockResponse> {
  const response: AxiosResponse = await axios({
    method: 'GET',
    url: `${endpoint}/stocks?symbol=${symbol}`,
  });
  return new GetStockResponse(
    response.data['Status'],
    response.data['Message'],
    response.data['Data'],
  );
}
