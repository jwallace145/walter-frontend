import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, CircularProgress } from '@mui/material';
import { PortfolioStock } from '../../api/GetPortfolio';

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
  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

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
        price: `${USDollar.format(stock.price)}`,
        equity: `${USDollar.format(stock.equity)}`,
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
          />
        </Box>
      )}
    </>
  );
};

export default PortfolioDataGrid;
