import { WalterAPIResponseBase } from '../common/Response';
import axios, { AxiosResponse } from 'axios';
import { EDIT_EXPENSE_METHOD } from '../common/Methods';

export class EditExpenseResponse extends WalterAPIResponseBase {}

export async function editExpense(
  endpoint: string,
  token: string,
  date: string,
  expenseId: string,
  vendor: string,
  amount: number,
  category: string,
): Promise<EditExpenseResponse> {
  const response: AxiosResponse = await axios({
    method: 'PUT',
    url: `${endpoint}/expenses`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      date: date,
      expense_id: expenseId,
      vendor: vendor,
      amount: amount,
      category: category,
    },
  });
  return new EditExpenseResponse(
    EDIT_EXPENSE_METHOD,
    response.data['Status'],
    response.data['Message'],
  );
}
