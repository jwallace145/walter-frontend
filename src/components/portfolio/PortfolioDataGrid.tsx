import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { PortfolioStock } from '../../api/GetPortfolio';

interface PortfolioDataGridProps {
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
  function getColumns(): GridColDef<PortfolioDataGridRow>[] {
    return [
      { field: 'id', headerName: 'Stock', width: 300 },
      { field: 'company', headerName: 'Company', width: 300 },
      {
        field: 'quantity',
        headerName: 'Number of Shares',
        type: 'number',
        width: 300,
      },
      {
        field: 'price',
        headerName: 'Price',
        type: 'string',
        width: 300,
      },
      {
        field: 'equity',
        headerName: 'Equity',
        type: 'string',
        width: 300,
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
        quantity: `${stock.quantity.toFixed(2)}`,
        price: `$ ${stock.price.toFixed(2)}`,
        equity: `$ ${stock.equity.toFixed(2)}`,
      });
    }
    return rows;
  }

  return (
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
  );
};

export default PortfolioDataGrid;
