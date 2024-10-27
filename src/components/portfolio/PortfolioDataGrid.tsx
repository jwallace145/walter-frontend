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
  quantity: number;
  price: number;
  equity: number;
}

const PortfolioDataGrid: React.FC<PortfolioDataGridProps> = ({ stocks }) => {
  function getColumns(): GridColDef<PortfolioStock>[] {
    return [
      { field: 'id', headerName: 'Stock', width: 300 },
      {
        field: 'quantity',
        headerName: 'Number of Shares',
        type: 'number',
        width: 300,
      },
      {
        field: 'price',
        headerName: 'Price',
        type: 'number',
        width: 300,
      },
      {
        field: 'equity',
        headerName: 'Equity',
        type: 'number',
        width: 300,
      },
    ];
  }

  function getRows(): PortfolioDataGridRow[] {
    const rows: PortfolioDataGridRow[] = [];
    for (const stock of stocks) {
      rows.push({
        id: stock.symbol,
        symbol: stock.symbol,
        quantity: stock.quantity,
        price: stock.price,
        equity: stock.equity,
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
