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
import SideBar from '../components/sidebar/SideBar';
import HomePage from './common/HomePage';

interface DashboardProps {
  authenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;
  setNoStocksAlert: (noStocks: boolean) => void;
}

const DashboardPage: React.FC<DashboardProps> = (
  props: DashboardProps,
): React.ReactElement => {
  const [loading, setLoading] = useState(false);
  const [stocks, setStocks] = useState<PortfolioStock[]>([]);
  const [totalEquity, setTotalEquity] = useState<number>(0);

  useEffect((): void => {
    getPortfolio();
  }, []);

  const getPortfolio: () => void = (): void => {
    setLoading(true);
    WalterAPI.getPortfolio()
      .then((response: GetPortfolioResponse): void => {
        setStocks(response.getStocks());
        setTotalEquity(response.getTotalEquity());
        props.setNoStocksAlert(response.getStocks().length === 0);
      })
      .finally((): void => {
        setLoading(false);
      });
  };

  const getSideBar: () => React.ReactElement = (): React.ReactElement => {
    return (
      <SideBar
        setAuthenticated={props.setAuthenticated}
        currentTab="dashboard"
      />
    );
  };

  const getContent: () => React.ReactElement = (): React.ReactElement => {
    return (
      <Grid container size={11} spacing={2}>
        <Grid
          size={6}
          sx={{
            padding: 2,
            borderRadius: '40px',
            backgroundColor: Colors.LIGHT_GRAY,
            outline: `1px solid ${Colors.GRAY}`,
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.15)',
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
            outline: `1px solid ${Colors.GRAY}`,
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.15)',
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
            outline: `1px solid ${Colors.GRAY}`,
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.15)',
          }}
        >
          <PortfolioDataGridV2
            loading={loading}
            stocks={stocks}
          />
        </Grid>
      </Grid>
    );
  };

  return (
    <HomePage
      authenticated={props.authenticated}
      sideBar={getSideBar()}
      content={getContent()}
    />
  );
};

export default DashboardPage;
