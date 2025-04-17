import React from 'react';
import { Expense } from '../../api/methods/GetExpenses';
import { Container } from '@mui/material';
import { Colors, US_DOLLAR } from '../../constants/Constants';
import LoadingCircularProgress from '../progress/LoadingCircularProgress';
import ExpensesDataGrid from './ExpensesDataGrid';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';

interface ExpensesExplorerProps {
  expenses: Expense[];
}

const columnStyles = {
  flex: 1,
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

const ExpensesExplorer: React.FC<ExpensesExplorerProps> = (
  props: ExpensesExplorerProps,
): React.ReactElement => {
  const getExpensesRow: (expense: Expense) => React.ReactElement = (
    expense: Expense,
  ): React.ReactElement => {
    return (
      <Box
        sx={{
          padding: 2,
          borderRadius: '40px',
          backgroundColor: Colors.LIGHT_GRAY,
          outline: `1px solid ${Colors.GRAY}`,
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.15)',
          fontFamily: 'Raleway, sans-serif',
          marginBottom: 2,
          display: 'flex',
          gap: 2,
        }}
      >
        <Box sx={{ ...columnStyles, flexBasis: '20%' }}>{expense.date}</Box>
        <Box sx={{ ...columnStyles, flexBasis: '30%' }}>{expense.vendor}</Box>
        <Box sx={{ ...columnStyles, flexBasis: '20%' }}>
          {US_DOLLAR.format(expense.amount)}
        </Box>
        <Box sx={{ ...columnStyles, flexBasis: '30%' }}>{expense.category}</Box>
      </Box>
    );
  };

  return (
    <Container>
      {/* Optional: Header row */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          marginBottom: 1,
          fontWeight: 'bold',
          fontFamily: 'Raleway, sans-serif',
        }}
      >
        <Box sx={{ ...columnStyles, flexBasis: '20%' }}>Date</Box>
        <Box sx={{ ...columnStyles, flexBasis: '30%' }}>Vendor</Box>
        <Box sx={{ ...columnStyles, flexBasis: '20%' }}>Amount</Box>
        <Box sx={{ ...columnStyles, flexBasis: '30%' }}>Category</Box>
      </Box>

      {/* Expense rows */}
      {props.expenses.map((expense: Expense): React.ReactElement => {
        return getExpensesRow(expense);
      })}
    </Container>
  );
};

export default ExpensesExplorer;
