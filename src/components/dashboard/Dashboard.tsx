import React, { useEffect, useState } from 'react';
import { WalterAPI } from '../../api/WalterAPI';
import { PortfolioStock } from '../../api/GetPortfolio';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import PortfolioPieChart from '../portfolio/PortfolioPieChart';
import PortfolioStockLineChartWidget from '../portfolio/PortfolioStockLineChartWidget';
import PortfolioDataGrid from '../portfolio/PortfolioDataGrid';

const Dashboard: React.FC = () => {
  const [stocks, setStocks] = useState<PortfolioStock[]>([]);

  useEffect(() => {
    WalterAPI.getPortfolio().then((response) => {
      setStocks(response.getStocks());
    });
  }, [stocks]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4}>
        <Grid size={6}>
          <PortfolioPieChart stocks={stocks} />
        </Grid>
        <Grid size={6}>
          <PortfolioStockLineChartWidget stocks={stocks} />
        </Grid>
        <Grid size={12}>
          <PortfolioDataGrid stocks={stocks} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;