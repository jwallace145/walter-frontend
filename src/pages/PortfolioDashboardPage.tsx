import React, { useEffect, useState } from 'react';
import {
  GetPortfolioResponse,
  PortfolioStock,
} from '../api/methods/GetPortfolio';
import { WalterAPI } from '../api/WalterAPI';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import PortfolioStockLineChartWidget from '../components/portfolio/linechart/PortfolioStockLineChartWidget';
import PortfolioDataGridV2 from '../components/portfolio/datagrid/PortfolioDataGridV2';
import PortfolioPieChartWidget from '../components/portfolio/piechart/PortfolioPieChartWidget';

interface PortfolioDashboardPageProps {
  setNoStocksAlert: (noStocks: boolean) => void;
}

/**
 * Portfolio Dashboard Page
 *
 * The portfolio dashboard page aims to provide the user with a view of their
 * portfolio to quickly get an update on its weekly performance. The dashboard
 * currently includes a pie chart, line charts for the included stocks, and a
 * data grid display the stocks in a tabular format.
 *
 * @constructor
 */
const PortfolioDashboardPage: React.FC<PortfolioDashboardPageProps> = (
  props: PortfolioDashboardPageProps,
) => {
  const [loading, setLoading] = useState(false);
  const [totalEquity, setTotalEquity] = useState<number>(0);
  const [stocks, setStocks] = useState<PortfolioStock[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  /**
   * On refresh update, check if refresh is true and if so call Walter API to get
   * the latest portfolio for the user to display as one of the child components
   * most likely updated the portfolio and triggered a refresh operation.
   */
  useEffect(() => {
    attempToGetUserPortfolioFromDB(props.setNoStocksAlert);
  }, [refresh]);

  const attempToGetUserPortfolioFromDB = (
    alert: (noStocks: boolean) => void,
  ) => {
    setLoading(true);
    WalterAPI.getPortfolio()
      .then((response: GetPortfolioResponse) => {
        alertUserIfNoStocksInPortfolio(response.getStocks());
        setStocks(response.getStocks());
        setTotalEquity(response.getTotalEquity());
      })
      .finally(() => {
        setLoading(false);
        setRefresh(false);
      });
  };

  const alertUserIfNoStocksInPortfolio = (stocks: PortfolioStock[]) => {
    if (stocks.length === 0) {
      props.setNoStocksAlert(true);
    } else {
      props.setNoStocksAlert(false);
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Grid
        container
        size={12}
        spacing={2}
        sx={{
          padding: 2,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            padding: 2,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <PortfolioPieChartWidget
            loading={loading}
            equity={totalEquity}
            stocks={stocks}
          />
        </Grid>
        <Grid
          size={{ xs: 12, md: 6 }}
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

export default PortfolioDashboardPage;
