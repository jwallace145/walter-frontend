import React from 'react';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridSlots,
} from '@mui/x-data-grid';
import { Expense } from '../../api/methods/GetExpenses';
import { US_DOLLAR } from '../../constants/Constants';
import DeleteIcon from '@mui/icons-material/Delete';
import { WalterAPI } from '../../api/WalterAPI';
import { DeleteExpenseResponse } from '../../api/methods/DeleteExpense';
import ExpensesDataGridToolBar from './ExpensesDataGridToolBar';

interface ExpensesDataGridProps {
  expenses: Expense[];
}

const EXPENSES_TABLE_COLUMNS: GridColDef[] = [
  {
    field: 'date',
    headerName: 'Date',
    width: 150,
    editable: false,
  },
  {
    field: 'vendor',
    headerName: 'Vendor',
    width: 150,
    editable: false,
  },
  {
    field: 'amount',
    headerName: 'Amount',
    type: 'number',
    width: 110,
    editable: false,
  },
  {
    field: 'category',
    headerName: 'Category',
    width: 160,
    editable: false,
  },
];

interface ExpenseRow {
  id: string;
  date: string;
  vendor: string;
  amount: string;
  category: string;
}

const ExpensesDataGrid: React.FC<ExpensesDataGridProps> = (
  props: ExpensesDataGridProps,
): React.ReactElement => {
  const [rows, setRows] = React.useState<ExpenseRow[]>([]);

  const getColumns: () => GridColDef[] = (): GridColDef[] => {
    return [
      {
        field: 'date',
        headerName: 'Date',
        editable: false,
        flex: 1,
        renderHeader: () => (
          <strong
            style={{ fontFamily: 'Raleway, sans-serif', fontSize: '16px' }}
          >
            Date
          </strong>
        ),
      },
      {
        field: 'vendor',
        headerName: 'Vendor',
        editable: false,
        flex: 1,
        renderHeader: () => (
          <strong
            style={{ fontFamily: 'Raleway, sans-serif', fontSize: '16px' }}
          >
            Vendor
          </strong>
        ),
      },
      {
        field: 'amount',
        headerName: 'Amount',
        type: 'number',
        editable: false,
        flex: 1,
        renderHeader: () => (
          <strong
            style={{ fontFamily: 'Raleway, sans-serif', fontSize: '16px' }}
          >
            Amount
          </strong>
        ),
      },
      {
        field: 'category',
        headerName: 'Category',
        editable: false,
        flex: 1,
        renderHeader: () => (
          <strong
            style={{ fontFamily: 'Raleway, sans-serif', fontSize: '16px' }}
          >
            Category
          </strong>
        ),
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        flex: 1,
        renderHeader: () => (
          <strong
            style={{ fontFamily: 'Raleway, sans-serif', fontSize: '16px' }}
          >
            Actions
          </strong>
        ),
        cellClassName: 'actions',
        getActions: ({ id }) => {
          return [
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id)}
              color="inherit"
            />,
          ];
        },
      },
    ];
  };

  const getRows: () => ExpenseRow[] = (): ExpenseRow[] => {
    return props.expenses.map((expense: Expense): ExpenseRow => {
      return {
        id: expense.expenseId,
        date: expense.date,
        vendor: expense.vendor,
        amount: `${US_DOLLAR.format(expense.amount)}`,
        category: expense.category,
      };
    });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    console.log(id);
    rows.forEach((expenseRow: ExpenseRow) => {
      console.log(expenseRow);
    });
    const expenseToDelete: ExpenseRow = getRows().find(
      (expenseRow: ExpenseRow): boolean => expenseRow.id === id,
    ) as ExpenseRow;
    try {
      WalterAPI.deleteExpense(expenseToDelete.date, expenseToDelete.id).then(
        (response: DeleteExpenseResponse): void => {
          if (response.isSuccess()) {
            setRows(
              getRows().filter(
                (expenseRow: ExpenseRow): boolean => expenseRow.id !== id,
              ),
            );
          }
        },
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <DataGrid
      rows={getRows()}
      columns={getColumns()}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      pageSizeOptions={[5]}
      slots={{
        toolbar: ExpensesDataGridToolBar as GridSlots['toolbar'],
      }}
      disableRowSelectionOnClick
    />
  );
};

export default ExpensesDataGrid;
