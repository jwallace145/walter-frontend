import React, { useEffect, useState } from 'react';
import { WalterAPI } from '../../api/WalterAPI';
import { GetPortfolioResponse, PortfolioStock } from '../../api/GetPortfolio';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import PortfolioPieChart from '../portfolio/PortfolioPieChart';
import PortfolioStockLineChartWidget from '../portfolio/PortfolioStockLineChartWidget';
import PortfolioDataGridV2 from '../portfolio/datagrid/PortfolioDataGridV2';

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [stocks, setStocks] = useState<PortfolioStock[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    WalterAPI.getPortfolio()
      .then((response: GetPortfolioResponse) => {
        setStocks(response.getStocks());
      })
      .finally(() => {
        setLoading(false);
        setRefresh(false);
      });
  }, [refresh]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={2}
        sx={{
          padding: 2,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Grid
          size={6}
          sx={{
            padding: 2,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <PortfolioPieChart loading={loading} stocks={stocks} />
        </Grid>
        <Grid
          size={6}
          sx={{
            padding: 2,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <PortfolioStockLineChartWidget loading={loading} stocks={stocks} />
        </Grid>
        <Grid
          size={12}
          sx={{
            padding: 2,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <PortfolioDataGridV2
            loading={loading}
            stocks={stocks}
            setRefresh={setRefresh}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
