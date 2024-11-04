import * as React from 'react';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridSlots,
  GridToolbarContainer,
} from '@mui/x-data-grid';
import { Box, Button, CircularProgress } from '@mui/material';
import { PortfolioStock } from '../../api/GetPortfolio';
import { US_DOLLAR } from '../../constants/Constants';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = (event: any) => {
    const id = 'TEST';
    setRows((oldRows) => [
      ...oldRows,
      { id, name: '', age: '', role: '', isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

interface PortfolioDataGridProps {
  loading: boolean;
  stocks: PortfolioStock[];
}

interface PortfolioDataGridRow {
  id: string;
  symbol: string;
  company: string;
  quantity: string;
  price: string;
  equity: string;
}

const PortfolioDataGrid: React.FC<PortfolioDataGridProps> = (props) => {
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {},
  );

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    // TODO: Implement delete stock from portfolio
    return;
  };

  const handleCancelClick = (id: GridRowId) => () => {
    // TODO: Implement cancel stock edit
    return;
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    // TODO: Implement process row update
    return;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  function getColumns(): GridColDef<PortfolioDataGridRow>[] {
    return [
      {
        field: 'id',
        headerName: 'Stock',
        width: 300,
        renderHeader: () => (
          <strong
            style={{ fontFamily: 'Raleway, sans-serif', fontSize: '16px' }}
          >
            Stock
          </strong>
        ),
      },
      {
        field: 'company',
        headerName: 'Company',
        width: 300,
        renderHeader: () => (
          <strong
            style={{ fontFamily: 'Raleway, sans-serif', fontSize: '16px' }}
          >
            Company
          </strong>
        ),
      },
      {
        field: 'quantity',
        headerName: 'Number of Shares',
        type: 'number',
        width: 300,
        renderHeader: () => (
          <strong
            style={{ fontFamily: 'Raleway, sans-serif', fontSize: '16px' }}
          >
            Shares
          </strong>
        ),
      },
      {
        field: 'price',
        headerName: 'Price',
        type: 'string',
        width: 300,
        renderHeader: () => (
          <strong
            style={{ fontFamily: 'Raleway, sans-serif', fontSize: '16px' }}
          >
            Price
          </strong>
        ),
      },
      {
        field: 'equity',
        headerName: 'Equity',
        type: 'string',
        width: 300,
        renderHeader: () => (
          <strong
            style={{ fontFamily: 'Raleway, sans-serif', fontSize: '16px' }}
          >
            Equity
          </strong>
        ),
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        cellClassName: 'actions',
        renderHeader: () => (
          <strong
            style={{ fontFamily: 'Raleway, sans-serif', fontSize: '16px' }}
          >
            Actions
          </strong>
        ),
        getActions: ({ id }) => {
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

          if (isInEditMode) {
            return [
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                sx={{
                  color: 'primary.main',
                }}
                onClick={handleSaveClick(id)}
              />,
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(id)}
                color="inherit"
              />,
            ];
          }

          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            />,
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
  }

  function getRows(): PortfolioDataGridRow[] {
    const rows: PortfolioDataGridRow[] = [];
    for (const stock of props.stocks) {
      rows.push({
        id: stock.symbol,
        symbol: stock.symbol,
        company: stock.company,
        quantity: `${stock.quantity.toLocaleString('en-US', { maximumFractionDigits: 2 })}`,
        price: `${US_DOLLAR.format(stock.price)}`,
        equity: `${US_DOLLAR.format(stock.equity)}`,
      });
    }
    return rows;
  }

  return (
    <>
      {props.loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 400,
            width: '100%',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={getRows()}
            columns={getColumns()}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            slots={{
              toolbar: EditToolbar as GridSlots['toolbar'],
            }}
            slotProps={{
              toolbar: { setRows, setRowModesModel },
            }}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            sx={{
              '& .MuiDataGrid-row': {
                fontFamily: 'Raleway, sans-serif',
                fontSize: '14px',
              },
            }}
          />
        </Box>
      )}
    </>
  );
};

export default PortfolioDataGrid;
