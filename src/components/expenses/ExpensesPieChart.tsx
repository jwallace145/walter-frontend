import React from 'react';
import { Expense } from '../../api/methods/GetExpenses';
import { Container, Typography } from '@mui/material';
import { Colors, Fonts, US_DOLLAR } from '../../constants/Constants';
import { pieArcLabelClasses, PieChart } from '@mui/x-charts/PieChart';

const colors = [
  Colors.LIGHT_BLUE,
  Colors.YELLOW,
  Colors.TEAL,
  Colors.GRAY,
  Colors.LAVENDER,
];

interface ExpensesPieChartProps {
  expenses: Expense[];
}

const ExpensesPieChart: React.FC<ExpensesPieChartProps> = (
  props: ExpensesPieChartProps,
): React.ReactElement => {
  const getDataPoints = () => {
    let dataPoints: any[] = [];
    const categories: { [key: string]: number } = {};
    props.expenses.forEach((expense: Expense): void => {
      if (categories[expense.category]) {
        categories[expense.category] += expense.amount;
      } else {
        categories[expense.category] = expense.amount;
      }
    });
    for (const [category, amount] of Object.entries(categories)) {
      dataPoints.push({
        id: category,
        value: amount,
        label: category,
      });
    }
    return dataPoints;
  };

  return (
    <Container>
      <PieChart
        series={[
          {
            data: getDataPoints(),
            innerRadius: 10,
            paddingAngle: 2,
            arcLabel: (value) => `${US_DOLLAR.format(value.value)}`,
            arcLabelMinAngle: 35,
            valueFormatter: (value) => `${US_DOLLAR.format(value.value)}`,
            highlightScope: { fade: 'global', highlight: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fontFamily: Fonts.RALEWAY,
          },
        }}
        slotProps={{ legend: { hidden: true } }}
        height={400}
        colors={colors}
      />
    </Container>
  );
};

export default ExpensesPieChart;
