import axios, { AxiosResponse } from 'axios';
import { WalterAPIResponseBase } from '../common/Response';
import { ADD_EXPENSE_METHOD } from '../common/Methods';

export class AddExpenseResponse extends WalterAPIResponseBase {}

export async function addExpense(
  endpoint: string,
  token: string,
  date: string,
  vendor: string,
  amount: number,
): Promise<AddExpenseResponse> {
  const response: AxiosResponse = await axios({
    method: 'POST',
    url: `${endpoint}/expenses`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    data: {
      date: date,
      vendor: vendor,
      amount: amount,
    },
  });
  return new AddExpenseResponse(
    ADD_EXPENSE_METHOD,
    response.data['Status'],
    response.data['Message'],
  );
}
