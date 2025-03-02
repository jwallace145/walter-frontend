import React, { useEffect, useState } from 'react';
import SideBar from '../components/sidebar/SideBar';
import HomePage from './common/HomePage';
import { Fonts } from '../constants/Constants';
import { Container } from '@mui/material';
import { WalterAPI } from '../api/WalterAPI';
import {
  GetPortfolioResponse,
  PortfolioStock,
} from '../api/methods/GetPortfolio';
import PortfolioStockCard from '../components/portfolio/stock/PortfolioStockCard';
import LoadingCircularProgress from '../components/progress/LoadingCircularProgress';
import Typography from '@mui/material/Typography';

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

  useEffect(() => {
    getPortfolio();
  }, [refresh]);

  const getPortfolio: () => void = (): void => {
    setLoading(true);
    WalterAPI.getPortfolio()
      .then((response: GetPortfolioResponse): void => {
        setStocks(response.getStocks());
      })
      .finally(() => {
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

    if (stocks.length === 0) {
      return (
        <Container>
          <Typography
            sx={{
              fontFamily: Fonts.RALEWAY,
              fontWeight: 'normal',
              fontSize: '18px',
            }}
          >
            No stocks found in portfolio...
          </Typography>
        </Container>
      );
    }
    return (
      <Container>
        {stocks.map(
          (stock: PortfolioStock): React.ReactElement => (
            <PortfolioStockCard stock={stock} setRefresh={setRefresh} />
          ),
        )}
      </Container>
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
