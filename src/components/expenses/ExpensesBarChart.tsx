import React from 'react';
import { Expense } from '../../api/methods/GetExpenses';
import { BarChart } from '@mui/x-charts';
import { Colors } from '../../constants/Constants';

const colors = [
  Colors.LIGHT_BLUE,
  Colors.YELLOW,
  Colors.TEAL,
  Colors.GRAY,
  Colors.LAVENDER,
];

interface ExpensesBarChartProps {
  expenses: Expense[];
}

const ExpensesBarChart: React.FC<ExpensesBarChartProps> = (
  props: ExpensesBarChartProps,
): React.ReactElement => {
  const getDataset = () => {
    const expensesByDate: { [key: string]: number } = {};
    props.expenses.forEach((expense: Expense): void => {
      if (expensesByDate[expense.date]) {
        expensesByDate[expense.date] += expense.amount;
      } else {
        expensesByDate[expense.date] = expense.amount;
      }
    });
    const dataset: any[] = [];
    for (const [date, amount] of Object.entries(expensesByDate)) {
      dataset.push({
        date: date,
        amount: amount,
      });
    }
    return dataset;
  };

  return (
    <BarChart
      dataset={getDataset()}
      xAxis={[{ scaleType: 'band', dataKey: 'date' }]}
      series={[{ dataKey: 'amount' }]}
      width={500}
      height={400}
      colors={colors}
    />
  );
};

export default ExpensesBarChart;
