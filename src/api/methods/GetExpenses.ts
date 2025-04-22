import axios, { AxiosResponse } from 'axios';
import { WalterAPIResponseBase } from '../common/Response';
import { GET_EXPENSES_METHOD } from '../common/Methods';

export enum ExpenseCategory {
  bills = 'Bills',
  entertainment = 'Entertainment',
  groceries = 'Groceries',
  health_and_wellness = 'Health And Wellness',
  hobbies = 'Hobbies',
  housing = 'Housing',
  insurance = 'Insurance',
  merchandise = 'Merchandise',
  restaurants = 'Restaurants',
  subscriptions = 'Subscriptions',
  transportation = 'Transportation',
  travel = 'Travel',
}

/**
 * Get the ExpenseCategory enum from the given string.
 *
 * @param category The ExpenseCategory given as a string.
 */
export function getExpenseCategory(category: string): string {
  for (const [key, value] of Object.entries(ExpenseCategory)) {
    if (key.toLowerCase() === category.toLowerCase()) {
      return value;
    }
  }
  throw Error(`Invalid ExpenseCategory: ${category}`);
}

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
        category: getExpenseCategory(expense.category),
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
