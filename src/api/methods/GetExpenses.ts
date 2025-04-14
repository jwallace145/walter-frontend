import axios, { AxiosResponse } from 'axios';
import { WalterAPIResponseBase } from '../common/Response';
import { GET_EXPENSES_METHOD } from '../common/Methods';

export interface Expense {
  expenseId: string;
  date: string;
  vendor: string;
  amount: number;
  category: string;
}

export class GetExpensesResponse extends WalterAPIResponseBase {
  private readonly expenses: Expense[];

  constructor(status: string, message: string, data?: any) {
    super(GET_EXPENSES_METHOD, status, message);
    this.expenses = this.setExpenses(data);
  }

  public getExpenses(): Expense[] {
    return this.expenses;
  }

  private setExpenses(data: any): Expense[] {
    if (data === null || data === undefined) {
      return [];
    }
    return data.expenses.map((expense: any): Expense => {
      return {
        expenseId: expense.expense_id,
        date: expense.date,
        vendor: expense.vendor,
        amount: expense.amount,
        category: expense.category,
      };
    });
  }
}

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
  return new GetExpensesResponse(
    response.data['Status'],
    response.data['Message'],
    response.data['Data'],
  );
}
