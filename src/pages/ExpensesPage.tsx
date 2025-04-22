import React, { useEffect, useState } from 'react';
import SideBar from '../components/sidebar/SideBar';
import HomePage from './common/HomePage';
import { WalterAPI } from '../api/WalterAPI';
import { Expense, GetExpensesResponse } from '../api/methods/GetExpenses';
import Grid from '@mui/material/Grid2';
import { Colors } from '../constants/Constants';
import LoadingCircularProgress from '../components/progress/LoadingCircularProgress';
import ExpensesPieChart from '../components/expenses/ExpensesPieChart';
import ExpensesChartWidget from '../components/expenses/ExpensesChartWidget';
import ExpensesExplorer from '../components/expenses/ExpensesExplorer';

interface ExpensesProps {
  authenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;
}

const ExpensesPage: React.FC<ExpensesProps> = (
  props: ExpensesProps,
): React.ReactElement => {
  const [loading, setLoading] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect((): void => {
    getExpenses();
  }, []);

  const getExpenses: () => void = (): void => {
    const today = new Date();
    const startDate: string = new Date(today.getFullYear(), today.getMonth(), 1)
      .toISOString()
      .split('T')[0];
    const endDate: string = new Date().toISOString().split('T')[0];
    setLoading(true);
    WalterAPI.getExpenses(startDate, endDate)
      .then((response: GetExpensesResponse): void => {
        setExpenses(response.getExpenses());
      })
      .finally((): void => setLoading(false));
  };

  const getSideBar: () => React.ReactElement = (): React.ReactElement => {
    return (
      <SideBar
        setAuthenticated={props.setAuthenticated}
        currentTab="expenses"
      />
    );
  };

  const getContent: () => React.ReactElement = (): React.ReactElement => {
    return (
      <Grid container size={11} spacing={2}>
        <Grid
          size={6}
          sx={{
            padding: 2,
            borderRadius: '40px',
            backgroundColor: Colors.LIGHT_GRAY,
            outline: `1px solid ${Colors.GRAY}`,
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.15)',
          }}
        >
          {loading ? (
            <LoadingCircularProgress />
          ) : (
            <ExpensesChartWidget expenses={expenses} />
          )}
        </Grid>
        <Grid
          size={6}
          sx={{
            padding: 2,
            borderRadius: '40px',
            backgroundColor: Colors.LIGHT_GRAY,
            outline: `1px solid ${Colors.GRAY}`,
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.15)',
          }}
        >
          {loading ? (
            <LoadingCircularProgress />
          ) : (
            <ExpensesPieChart expenses={expenses} />
          )}
        </Grid>
        <Grid size={12}>
          {loading ? (
            <LoadingCircularProgress />
          ) : (
            <ExpensesExplorer expenses={expenses} pageSize={10} />
          )}
        </Grid>
      </Grid>
    );
  };

  return (
    <HomePage
      authenticated={props.authenticated}
      sideBar={getSideBar()}
      content={getContent()}
    />
  );
};

export default ExpensesPage;
