import axios, { AxiosResponse } from 'axios';
import { WalterAPIResponseBase } from '../common/Response';
import { ADD_STOCK_METHOD } from '../common/Methods';

/**
 * AddStockResponse
 *
 * The response object for the AddStock API.
 */
export class AddStockResponse extends WalterAPIResponseBase {}

/**
 * Add a stock and quantity to the user portfolio via the AddStock API.
 *
 * @param endpoint
 * @param token
 * @param stock
 * @param quantity
 */
export async function addStock(
  endpoint: string,
  token: string,
  stock: string,
  quantity: number,
): Promise<AddStockResponse> {
  const response: AxiosResponse = await axios({
    method: 'POST',
    url: `${endpoint}/stocks`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    data: {
      stock: stock,
      quantity: quantity,
    },
  });
  return new AddStockResponse(
    ADD_STOCK_METHOD,
    response.data['Status'],
    response.data['Message'],
  );
}
