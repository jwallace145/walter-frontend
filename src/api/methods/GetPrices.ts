import axios, { AxiosResponse } from 'axios';
import { WalterAPIResponseBase } from '../common/Response';
import { GET_PRICES_METHOD } from '../common/Methods';

/**
 * Price
 *
 * The model object for the price of a stock at a given point in time.
 */
export interface Price {
  symbol: string;
  price: number;
  timestamp: string;
}

/**
 * GetPricesResponse
 *
 * The response object for the GetPrices API which vends the latest market pricing
 * data for a given stock symbol.
 */
export class GetPricesResponse extends WalterAPIResponseBase {
  private readonly prices: Price[];

  constructor(status: string, message: string, data?: any) {
    super(GET_PRICES_METHOD, status, message);
    this.prices = this.parseData(data);
  }

  public getPrices(): Price[] {
    return this.prices;
  }

  private parseData(data: any): Price[] {
    if (data === undefined) {
      return [];
    }
    return data.prices;
  }
}

/**
 * Get the latest prices for a stock from the GetPrices API.
 *
 * @param endpoint
 * @param stock
 * @param startDate
 * @param endDate
 */
export async function getPrices(
  endpoint: string,
  stock: string,
  startDate: string,
  endDate: string,
): Promise<GetPricesResponse> {
  const response: AxiosResponse = await axios({
    method: 'GET',
    url: `${endpoint}/prices`,
    params: {
      stock: stock,
      start_date: startDate,
      end_date: endDate,
    },
  });
  return new GetPricesResponse(
    response.data['Status'],
    response.data['Message'],
    response.data['Data'],
  );
}
