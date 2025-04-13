import axios, { AxiosResponse } from 'axios';
import { WalterAPIResponseBase } from '../common/Response';
import { GET_EXPENSES_METHOD } from '../common/Methods';
import { DeleteExpenseResponse } from './DeleteExpense';

export class GetExpensesResponse extends WalterAPIResponseBase {}

export async function getExpenses(
  endpoint: string,
  token: string,
  startDate: string,
  endDate: string,
): Promise<GetExpensesResponse> {
  const response: AxiosResponse = await axios({
    method: 'GET',
    url: `${endpoint}/expenses`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      start_date: startDate,
      end_date: endDate,
    },
  });
  return new DeleteExpenseResponse(
    GET_EXPENSES_METHOD,
    response.data['Status'],
    response.data['Message'],
  );
}
