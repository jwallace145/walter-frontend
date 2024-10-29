import React, { useEffect, useState } from 'react';
import { WalterAPI } from '../../api/WalterAPI';
import { GetPortfolioResponse, PortfolioStock } from '../../api/GetPortfolio';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import PortfolioPieChart from '../portfolio/PortfolioPieChart';
import PortfolioStockLineChartWidget from '../portfolio/PortfolioStockLineChartWidget';
import PortfolioDataGrid from '../portfolio/PortfolioDataGrid';

const Dashboard: React.FC = () => {
  const [stocks, setStocks] = useState<PortfolioStock[]>([]);

  useEffect(() => {
    WalterAPI.getPortfolio().then((response: GetPortfolioResponse) => {
      setStocks(response.getStocks());
    });
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid
          size={6}
          sx={{
            border: '2px solid #1976d2',
            borderRadius: '8px',
            padding: 2,
            backgroundColor: '#f5f5f5',
          }}
        >
          <PortfolioPieChart stocks={stocks} />
        </Grid>
        <Grid
          size={6}
          sx={{
            border: '2px solid #1976d2',
            borderRadius: '8px',
            padding: 2,
            backgroundColor: '#f5f5f5',
          }}
        >
          <PortfolioStockLineChartWidget stocks={stocks} />
        </Grid>
        <Grid
          size={12}
          sx={{
            border: '2px solid #1976d2',
            borderRadius: '8px',
            padding: 2,
            backgroundColor: '#f5f5f5',
          }}
        >
          <PortfolioDataGrid stocks={stocks} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
