import React, { useEffect, useState } from 'react';
import {
  GetPortfolioResponse,
  PortfolioStock,
} from '../api/methods/GetPortfolio';
import { WalterAPI } from '../api/WalterAPI';
import Grid from '@mui/material/Grid2';
import PortfolioStockLineChartWidget from '../components/portfolio/linechart/PortfolioStockLineChartWidget';
import PortfolioDataGridV2 from '../components/portfolio/datagrid/PortfolioDataGridV2';
import PortfolioPieChartWidget from '../components/portfolio/piechart/PortfolioPieChartWidget';
import { Colors } from '../constants/Constants';
import { Stack } from '@mui/material';
import DashboardSideBar from '../components/sidebar/DashboardSideBar';

interface DashboardProps {
  setAuthenticated: (authenticated: boolean) => void;
  setNoStocksAlert: (noStocks: boolean) => void;
}

const Dashboard: React.FC<DashboardProps> = (
  props: DashboardProps,
): React.ReactElement => {
  const [loading, setLoading] = useState(false);
  const [stocks, setStocks] = useState<PortfolioStock[]>([]);
  const [totalEquity, setTotalEquity] = useState<number>(0);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    getPortfolio();
  }, [refresh]);

  const getPortfolio = (): void => {
    setLoading(true);
    WalterAPI.getPortfolio()
      .then((response: GetPortfolioResponse) => {
        setStocks(response.getStocks());
        setTotalEquity(response.getTotalEquity());
        props.setNoStocksAlert(response.getStocks().length === 0);
      })
      .finally(() => {
        setLoading(false);
        setRefresh(false);
      });
  };

  return (
    <Grid container spacing={2} sx={{ padding: 2 }}>
      <Grid size={10} spacing={2}>
        <Stack spacing={2} direction="row" useFlexGap sx={{ flexWrap: 'wrap' }}>
          <Grid
            size={6}
            sx={{
              padding: 2,
              borderRadius: '40px',
              backgroundColor: Colors.LIGHT_GRAY,
              outline: '2px solid ' + Colors.GRAY,
            }}
          >
            <PortfolioPieChartWidget
              loading={loading}
              equity={totalEquity}
              stocks={stocks}
            />
          </Grid>
          <Grid
            size={6}
            sx={{
              padding: 2,
              borderRadius: '40px',
              backgroundColor: Colors.LIGHT_GRAY,
              outline: '2px solid ' + Colors.GRAY,
            }}
          >
            <PortfolioStockLineChartWidget loading={loading} stocks={stocks} />
          </Grid>
          <Grid
            size={12}
            sx={{
              padding: 2,
              borderRadius: '40px',
              backgroundColor: Colors.LIGHT_GRAY,
              outline: '2px solid ' + Colors.GRAY,
            }}
          >
            <PortfolioDataGridV2
              loading={loading}
              stocks={stocks}
              setRefresh={setRefresh}
            />
          </Grid>
        </Stack>
      </Grid>
      <Grid size={2} spacing={2}>
        <DashboardSideBar setAuthenticated={props.setAuthenticated} />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
