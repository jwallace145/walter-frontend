import React, { useEffect } from 'react';
import { Expense } from '../../api/methods/GetExpenses';
import {
  Avatar,
  Button,
  Container,
  Modal,
  Pagination,
  TextField,
} from '@mui/material';
import { Colors, US_DOLLAR } from '../../constants/Constants';
import Box from '@mui/material/Box';
import styles from './ExpensesExplorer.module.scss';
import Grid from '@mui/material/Grid2';
import LoadingButton from '../button/LoadingButton';
import { WalterAPI } from '../../api/WalterAPI';
import { AddExpenseResponse } from '../../api/methods/AddExpense';
import PaidIcon from '@mui/icons-material/Paid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DeleteExpenseResponse } from '../../api/methods/DeleteExpense';

interface ExpensesExplorerProps {
  expenses: Expense[];
  pageSize: number;
}

const ExpensesExplorer: React.FC<ExpensesExplorerProps> = (
  props: ExpensesExplorerProps,
): React.ReactElement => {
  const [page, setPage] = React.useState<number>(1);
  const [lastPage, setLastPage] = React.useState<number>(-1);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [date, setDate] = React.useState<string>('');
  const [vendor, setVendor] = React.useState<string>('');
  const [amount, setAmount] = React.useState<string>('');
  const [expenseToDelete, setExpenseToDelete] = React.useState<Expense | null>(
    null,
  );
  const [openAddExpenseModal, setOpenAddExpenseModal] =
    React.useState<boolean>(false);
  const [openEditExpenseModal, setOpenEditExpenseModal] =
    React.useState<boolean>(false);
  const [openDeleteExpenseModal, setOpenDeleteExpenseModal] =
    React.useState<boolean>(false);

  useEffect((): void => {
    setLastPage(getLastPage());
  }, []);

  const getLastPage: () => number = (): number => {
    return Math.ceil(props.expenses.length / props.pageSize);
  };

  const handleAddExpense = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    WalterAPI.addExpense(date, vendor, parseFloat(amount))
      .then((response: AddExpenseResponse): void => {
        if (response.isSuccess()) {
          setOpenAddExpenseModal(false);
        } else {
          console.log(response.getMessage());
        }
      })
      .finally((): void => setLoading(false));
  };

  const handleDeleteExpense = async (event: React.FormEvent) => {
    event.preventDefault();

    if (expenseToDelete === null) {
      return;
    }

    const expense: Expense = expenseToDelete as Expense;

    setLoading(true);
    WalterAPI.deleteExpense(expense.date, expense.expenseId)
      .then((response: DeleteExpenseResponse): void => {
        if (response.isSuccess()) {
          setOpenDeleteExpenseModal(false);
        } else {
          console.log(response.getMessage());
        }
      })
      .finally((): void => setLoading(false));
  };

  const getToolBar: () => React.ReactElement = (): React.ReactElement => {
    return (
      <Grid container className={styles.ExpensesExplorer__container}>
        <LoadingButton
          loading={false}
          onClick={(): void => setOpenAddExpenseModal(true)}
          text={'Add'}
          sx={{
            backgroundColor: Colors.YELLOW,
            borderRadius: '40px',
            padding: '4px',
            '&:hover': {
              transform: 'scale(1.03)',
              backgroundColor: Colors.YELLOW_HOVER,
              boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.2)',
            },
            transition: 'all 0.3s ease',
            width: '10%',
            marginRight: '10px',
          }}
        />
      </Grid>
    );
  };

  const getHeaderRow: () => React.ReactElement = (): React.ReactElement => {
    return (
      <Box className={styles.ExpensesExplorer__header}>
        <Box className={styles.ExpensesExplorer__column}>Date</Box>
        <Box className={styles.ExpensesExplorer__column}>Vendor</Box>
        <Box className={styles.ExpensesExplorer__column}>Amount</Box>
        <Box className={styles.ExpensesExplorer__column}>Category</Box>
        <Box className={styles.ExpensesExplorer__column}>Actions</Box>
      </Box>
    );
  };

  const getExpensesRow: (expense: Expense) => React.ReactElement = (
    expense: Expense,
  ): React.ReactElement => {
    return (
      <Box className={styles.ExpensesExplorer__row}>
        <Box className={styles.ExpensesExplorer__column}>{expense.date}</Box>
        <Box className={styles.ExpensesExplorer__column}>{expense.vendor}</Box>
        <Box className={styles.ExpensesExplorer__column}>
          {US_DOLLAR.format(expense.amount)}
        </Box>
        <Box className={styles.ExpensesExplorer__column}>
          {expense.category}
        </Box>
        <Box className={styles.ExpensesExplorer__column}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              startIcon={<EditIcon />}
              onClick={(): void => setOpenAddExpenseModal(true)}
              sx={{
                color: 'black',
                '&:hover': {
                  color: 'green',
                  transform: 'scale(1.1)',
                  cursor: 'pointer',
                },
              }}
            />
            <Button
              startIcon={<DeleteIcon />}
              onClick={(): void => {
                setExpenseToDelete(expense);
                setOpenDeleteExpenseModal(true);
              }}
              sx={{
                color: 'black',
                '&:hover': {
                  color: 'red',
                  transform: 'scale(1.1)',
                  cursor: 'pointer',
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    );
  };

  const getPaginationContainer: () => React.ReactElement =
    (): React.ReactElement => {
      return (
        <Container className={styles.ExpensesExplorer__pagination}>
          <Pagination
            page={page}
            count={lastPage}
            onChange={(event, value) => setPage(value)}
            sx={{
              '& .MuiPaginationItem-root': {
                fontFamily: 'Raleway',
                fontSize: '1.2rem',
              },
            }}
          />
        </Container>
      );
    };

  const getAddExpenseModal: () => React.ReactElement =
    (): React.ReactElement => {
      return (
        <Modal
          open={openAddExpenseModal}
          onClose={(): void => setOpenAddExpenseModal(false)}
        >
          <Container maxWidth="xs">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                borderRadius: 4,
                boxShadow: 24,
                p: 4,
              }}
            >
              <Avatar sx={{ m: 2 }}>
                <PaidIcon />
              </Avatar>
              <Box sx={{ mt: 2 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="date"
                  label="Date"
                  name="date"
                  autoFocus
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="vendor"
                  label="Vendor"
                  name="vendor"
                  value={vendor}
                  onChange={(e) => {
                    setVendor(e.target.value);
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="amount"
                  label="Amount"
                  name="amount"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                />
                <LoadingButton
                  loading={loading}
                  onClick={handleAddExpense}
                  text={'Add Expense'}
                />
              </Box>
            </Box>
          </Container>
        </Modal>
      );
    };

  const getEditExpenseModal: () => React.ReactElement =
    (): React.ReactElement => {
      return <p>hello, world!</p>;
    };

  const getDeleteExpenseModal: () => React.ReactElement =
    (): React.ReactElement => {
      return (
        <Modal
          open={openDeleteExpenseModal}
          onClose={(): void => setOpenDeleteExpenseModal(false)}
        >
          <Container maxWidth="xs">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                borderRadius: 4,
                boxShadow: 24,
                p: 4,
              }}
            >
              <Avatar sx={{ m: 2 }}>
                <DeleteIcon />
              </Avatar>
              <Box sx={{ mt: 2 }}>
                <LoadingButton
                  loading={loading}
                  onClick={handleDeleteExpense}
                  text={'Delete Expense'}
                />
              </Box>
            </Box>
          </Container>
        </Modal>
      );
    };

  return (
    <>
      {getToolBar()}
      {getHeaderRow()}
      {props.expenses
        .slice((page - 1) * props.pageSize, page * props.pageSize)
        .map((expense: Expense): React.ReactElement => {
          return getExpensesRow(expense);
        })}
      {getPaginationContainer()}
      {openAddExpenseModal && getAddExpenseModal()}
      {openEditExpenseModal && getEditExpenseModal()}
      {openDeleteExpenseModal && getDeleteExpenseModal()}
    </>
  );
};

export default ExpensesExplorer;
