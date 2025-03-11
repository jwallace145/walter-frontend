import React, { useEffect, useState } from 'react';
import SideBar from '../components/sidebar/SideBar';
import HomePage from './common/HomePage';
import { Fonts } from '../constants/Constants';
import { Stack } from '@mui/material';
import { WalterAPI } from '../api/WalterAPI';
import {
  GetPortfolioResponse,
  PortfolioStock,
} from '../api/methods/GetPortfolio';
import PortfolioStockTile from '../components/portfolio/stock/PortfolioStockTile';
import LoadingCircularProgress from '../components/progress/LoadingCircularProgress';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import PortfolioStockExplorer from '../components/portfolio/stock/PortfolioStockExplorer';

interface PortfolioPageProps {
  authenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;
}

const PortfolioPage: React.FC<PortfolioPageProps> = (
  props: PortfolioPageProps,
): React.ReactElement => {
  const [loading, setLoading] = useState(false);
  const [stocks, setStocks] = useState<PortfolioStock[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect((): void => {
    getPortfolio();
  }, [refresh]);

  const getPortfolio: () => void = (): void => {
    setLoading(true);
    WalterAPI.getPortfolio()
      .then((response: GetPortfolioResponse): void => {
        setStocks(response.getStocks());
      })
      .finally((): void => {
        setLoading(false);
        setRefresh(false);
      });
  };

  const getSideBar: () => React.ReactElement = (): React.ReactElement => {
    return (
      <SideBar
        setAuthenticated={props.setAuthenticated}
        currentTab={'portfolio'}
      />
    );
  };

  const getContent: () => React.ReactElement = (): React.ReactElement => {
    if (loading) {
      return <LoadingCircularProgress />;
    }

    return (
      <Grid size={11}>
        <PortfolioStockExplorer stocks={stocks} setRefresh={setRefresh} />
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

export default PortfolioPage;
