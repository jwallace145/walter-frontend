import axios, { AxiosResponse } from 'axios';
import { WalterAPIResponseBase } from '../common/Response';
import { DELETE_STOCK_METHOD } from '../../constants/Constants';

/**
 * DeleteStockResponse
 *
 * The response object from the DeleteStock API.
 */
export class DeleteStockResponse extends WalterAPIResponseBase {}

/**
 * Delete a stock from a user portfolio via the DeleteStock API.
 *
 * @param endpoint
 * @param token
 * @param stock
 */
export async function deleteStock(
  endpoint: string,
  token: string,
  stock: string,
): Promise<DeleteStockResponse> {
  const response: AxiosResponse = await axios({
    method: 'DELETE',
    url: `${endpoint}/stocks`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    data: {
      stock: stock,
    },
  });
  return new DeleteStockResponse(
    DELETE_STOCK_METHOD,
    response.data['Status'],
    response.data['Message'],
  );
}
