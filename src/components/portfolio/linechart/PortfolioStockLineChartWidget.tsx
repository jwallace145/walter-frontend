import * as React from 'react';
import { useEffect, useState } from 'react';
import { GetPricesResponse, Price } from '../../../api/methods/GetPrices';
import { Container, Pagination } from '@mui/material';
import PortfolioStockLineChart from './PortfolioStockLineChart';
import { PortfolioStock } from '../../../api/methods/GetPortfolio';
import { WalterAPI } from '../../../api/WalterAPI';
import Box from '@mui/material/Box';
import LoadingCircularProgress from '../../progress/LoadingCircularProgress';
import { Fonts } from '../../../constants/Constants';

interface PortfolioStockLineChartWidgetProps {
  loading: boolean; // the loading boolean state for parent component GetPortfolio API call
  stocks: PortfolioStock[];
}

const PortfolioStockLineChartWidget: React.FC<
  PortfolioStockLineChartWidgetProps
> = (props) => {
  const [page, setPage] = useState<number>(1); // pagination component starts pages list at 1 (not zero-indexed)
  const [stock, setStock] = useState<PortfolioStock>();
  const [prices, setPrices] = useState<Price[]>([]);
  const [pricesLoading, setPricesLoading] = useState<boolean>(true);

  useEffect(() => {
    setPricesLoading(true);

    // if parent component (PortfolioDashboardPage) is still loading GetPortfolio API call, keep stocks loading symbol
    if (props.loading) {
      return;
    }

    // if parent component (PortfolioDashboardPage) finished GetPortfolio API call but portfolio is empty, do not
    // get stock prices via GetPrices API and unset stock loading symbol
    if (props.stocks.length === 0) {
      setPricesLoading(false);
      setStock(undefined);
      setPrices([]);
    }

    // if parent component (PortfolioDashboardPage) finished GetPortfolio API call and portfolio contains stocks,
    // set the current stock as the first stock in response and then call GetPrices API to get stock prices
    if (props.stocks.length > 0) {
      setStock(props.stocks[page - 1]);
      setPricesLoading(true);
      WalterAPI.getPrices(props.stocks[page - 1].symbol)
        .then((response: GetPricesResponse) => setPrices(response.getPrices()))
        .catch((error) => console.log(error))
        .finally(() => setPricesLoading(false));
    }
  }, [page, props.stocks, props.loading]);

  // if either parent component GetPortfolio API call or GetPrices API call is still in progress, return loading symbol
  if (props.loading || pricesLoading) {
    return <LoadingCircularProgress />;
  }

  return (
    <Container>
      <PortfolioStockLineChart
        loading={pricesLoading}
        stock={stock as PortfolioStock}
        prices={prices}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Pagination
          count={props.stocks.length}
          size={'small'}
          page={page}
          onChange={(event, value) => setPage(value)}
          style={{ marginTop: '5px' }}
          sx={{
            '& .MuiPaginationItem-root': {
              fontFamily: Fonts.RALEWAY,
              fontSize: '16px',
            },
          }}
        />
      </Box>
    </Container>
  );
};

export default PortfolioStockLineChartWidget;
