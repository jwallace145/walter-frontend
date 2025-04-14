import React, { useState } from 'react';
import { Container, Pagination } from '@mui/material';
import Box from '@mui/material/Box';
import { Expense } from '../../api/methods/GetExpenses';
import ExpensesLineChart from './ExpensesLineChart';
import ExpensesBarChart from './ExpensesBarChart';

interface ExpensesChartWidgetProps {
  expenses: Expense[];
}

const ExpensesChartWidget: React.FC<ExpensesChartWidgetProps> = (
  props: ExpensesChartWidgetProps,
): React.ReactElement => {
  const [page, setPage] = useState<number>(1); // pagination component starts pages list at 1 (not zero-indexed)

  const getChart = () => {
    if (page === 1) {
      return <ExpensesLineChart expenses={props.expenses} />;
    } else if (page === 2) {
      return <ExpensesBarChart expenses={props.expenses} />;
    }
  };

  return (
    <Container>
      {getChart()}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Pagination
          count={2}
          size={'small'}
          page={page}
          onChange={(event, value) => setPage(value)}
          style={{ marginTop: '5px' }}
          sx={{
            '& .MuiPaginationItem-root': {
              fontFamily: 'Raleway, sans-serif',
              fontSize: '16px',
            },
          }}
        />
      </Box>
    </Container>
  );
};

export default ExpensesChartWidget;
