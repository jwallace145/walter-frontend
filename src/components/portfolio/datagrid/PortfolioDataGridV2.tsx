import { PortfolioStock } from '../../../api/GetPortfolio';
import React, { useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModesModel,
  GridSlots,
} from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';
import { US_DOLLAR } from '../../../constants/Constants';
import DeleteIcon from '@mui/icons-material/Delete';
import { WalterAPI } from '../../../api/WalterAPI';
import AddStockToolbar from './AddStockToolBar';
import LoadingCircularProgress from '../../progress/LoadingCircularProgress';

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
        renderHeader: () => <ColumnHeader text={'Delete'} />,
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

  return (
    <>
      {props.loading ? (
        <LoadingCircularProgress />
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
            slots={{
              toolbar: AddStockToolbar as GridSlots['toolbar'],
            }}
            slotProps={{
              toolbar: {
                setRows,
                setRowModesModel,
                setRefresh: props.setRefresh,
              },
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
