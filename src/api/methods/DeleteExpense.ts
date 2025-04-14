import axios, { AxiosResponse } from 'axios';
import { WalterAPIResponseBase } from '../common/Response';
import { DELETE_EXPENSE_METHOD } from '../common/Methods';

export class DeleteExpenseResponse extends WalterAPIResponseBase {}

export async function deleteExpense(
  endpoint: string,
  token: string,
  date: string,
  expenseId: string,
): Promise<DeleteExpenseResponse> {
  const response: AxiosResponse = await axios({
    method: 'DELETE',
    url: `${endpoint}/expenses`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    data: {
      date: date,
      expense_id: expenseId,
    },
  });
  return new DeleteExpenseResponse(
    DELETE_EXPENSE_METHOD,
    response.data['Status'],
    response.data['Message'],
  );
}
