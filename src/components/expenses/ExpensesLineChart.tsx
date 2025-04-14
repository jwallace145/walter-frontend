import React from 'react';
import { Expense } from '../../api/methods/GetExpenses';
import { LineChart } from '@mui/x-charts/LineChart';
import dayjs from 'dayjs';
import { Colors, Fonts, US_DOLLAR } from '../../constants/Constants';
import { Container } from '@mui/material';
import { Price } from '../../api/methods/GetPrices';

interface ExpensesLineChartProps {
  expenses: Expense[];
}

const ExpensesLineChart: React.FC<ExpensesLineChartProps> = (
  props: ExpensesLineChartProps,
): React.ReactElement => {
  const getTimestamps: () => number[] = (): number[] => {
    return props.expenses.map((expense: Expense): number => {
      return dayjs(expense.date, 'YYYY-MM-DD').valueOf();
    });
  };

  const getExpenses: () => number[] = (): number[] => {
    let expensesSum: number = 0;
    const expensesRunningSum: number[] = [];
    props.expenses.forEach((expense: Expense): void => {
      expensesSum += expense.amount;
      expensesRunningSum.push(expensesSum);
    });
    return expensesRunningSum;
  };

  return (
    <Container>
      <LineChart
        xAxis={[
          {
            data: getTimestamps(),
            valueFormatter: (v) => dayjs(v).format('MMM D, YYYY'),
            tickLabelStyle: {
              fontSize: 12,
              fontFamily: Fonts.RALEWAY,
              fontWeight: 'bold',
            },
          },
        ]}
        yAxis={[
          {
            valueFormatter: (value: any): string =>
              `${US_DOLLAR.format(value)}`,
            tickLabelStyle: {
              fontSize: 12,
              fontFamily: Fonts.RALEWAY,
              fontWeight: 'bold',
            },
          },
        ]}
        series={[
          {
            data: getExpenses(),
            valueFormatter: (v: number | null): string =>
              `${US_DOLLAR.format(v as number)}`,
            color: Colors.ATLANTIC_BLUE,
            showMark: false,
            area: true,
            baseline: 'min',
          },
        ]}
        height={400}
        margin={{ left: 60 }}
        grid={{ vertical: true, horizontal: true }}
      />
    </Container>
  );
};

export default ExpensesLineChart;
