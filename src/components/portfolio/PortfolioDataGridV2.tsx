import { PortfolioStock } from '../../api/GetPortfolio';
import React, { useEffect } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModes,
  GridRowModesModel,
  GridSlots,
  GridToolbarContainer,
} from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import { randomId } from '@mui/x-data-grid-generator';
import { US_DOLLAR } from '../../constants/Constants';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import { WalterAPI } from '../../api/WalterAPI';

interface ColumnHeaderProps {
  text: string;
}

const ColumnHeader: React.FC<ColumnHeaderProps> = (props) => {
  return (
    <strong style={{ fontFamily: 'Raleway, sans-serif', fontSize: '16px' }}>
      {props.text}
    </strong>
  );
};

interface PortfolioStockRow {
  id: string;
  symbol: string;
  company: string;
  quantity: string;
  price: string;
  equity: string;
  isNew: boolean;
}

interface EditToolbarProps {
  setRows: (
    newRows: (oldRows: PortfolioStockRow[]) => PortfolioStockRow[],
  ) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const handleClick = () => {
    const id = randomId();
    props.setRows((oldRows) => [
      ...oldRows,
      {
        id,
        symbol: '',
        company: '',
        quantity: '',
        price: '',
        equity: '',
        isNew: true,
      },
    ]);
    props.setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'symbol' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button startIcon={<AddIcon />} onClick={handleClick}>
        Add Stock
      </Button>
    </GridToolbarContainer>
  );
}

interface PortfolioDataGridProps {
  loading: boolean;
  stocks: PortfolioStock[];
  setRefresh: (refresh: boolean) => void;
}

const PortfolioDataGridV2: React.FC<PortfolioDataGridProps> = (props) => {
  const [rows, setRows] = React.useState<PortfolioStockRow[]>([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {},
  );

  useEffect(() => {
    setRows(getPortfolioRows(props.stocks));
  }, [props.stocks]);

  const getPortfolioColumns: () => GridColDef[] = () => {
    return [
      {
        field: 'symbol',
        headerName: 'Stock',
        type: 'string',
        width: 300,
        editable: true,
        renderHeader: () => <ColumnHeader text={'Stock'} />,
      },
      {
        field: 'company',
        headerName: 'Company',
        type: 'string',
        width: 300,
        editable: false,
        renderHeader: () => <ColumnHeader text={'Company'} />,
      },
      {
        field: 'quantity',
        headerName: 'Number of Shares',
        type: 'number',
        width: 300,
        editable: true,
        renderHeader: () => <ColumnHeader text={'Number of Shares'} />,
      },
      {
        field: 'price',
        headerName: 'Price',
        type: 'string',
        width: 300,
        editable: false,
        renderHeader: () => <ColumnHeader text={'Price'} />,
      },
      {
        field: 'equity',
        headerName: 'Equity',
        type: 'string',
        width: 300,
        editable: false,
        renderHeader: () => <ColumnHeader text={'Equity'} />,
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        cellClassName: 'actions',
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
  };

  const getPortfolioRows: (stocks: PortfolioStock[]) => PortfolioStockRow[] = (
    stocks,
  ) => {
    return stocks.map((stock) => {
      return {
        id: randomId(),
        symbol: stock.symbol,
        company: stock.company,
        quantity: `${stock.quantity.toLocaleString('en-US', { maximumFractionDigits: 2 })}`,
        price: `${US_DOLLAR.format(stock.price)}`,
        equity: `${US_DOLLAR.format(stock.equity)}`,
        isNew: false,
      };
    });
  };

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event,
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    const deleteRow: PortfolioStockRow = rows.find(
      (stock) => stock.id === id,
    ) as PortfolioStockRow;
    try {
      WalterAPI.deleteStock(deleteRow.symbol).then((response) => {
        if (response.isSuccess()) {
          setRows(rows.filter((stock) => stock.id !== id));
          props.setRefresh(true);
        }
      });
    } catch (e) {
      console.log(e);
      props.setRefresh(true);
    }
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((stock) => stock.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((stock) => stock.id !== id));
    }
  };

  const processRowUpdate = (newRow: PortfolioStockRow) => {
    const updatedRow = { ...newRow, isNew: false };
    try {
      WalterAPI.addStock(updatedRow.symbol, Number(updatedRow.quantity)).then(
        (response) => {
          if (response.isSuccess()) {
            setRows(
              rows.map((row) => (row.id === newRow.id ? updatedRow : row)),
            );
            props.setRefresh(true);
          }
        },
      );
      return updatedRow;
    } catch (e) {
      console.log(e);
      return newRow;
    }
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  return (
    <>
      {props.loading ? (
        <Box
          width={'100%'}
          height={400}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={getPortfolioColumns()}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            slots={{
              toolbar: EditToolbar as GridSlots['toolbar'],
            }}
            slotProps={{
              toolbar: { setRows, setRowModesModel },
            }}
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

export default PortfolioDataGridV2;
