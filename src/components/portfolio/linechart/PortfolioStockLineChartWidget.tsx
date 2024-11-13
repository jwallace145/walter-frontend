import * as React from 'react';
import { useEffect, useState } from 'react';
import { GetPricesResponse, Price } from '../../../api/GetPrices';
import { Container, Pagination } from '@mui/material';
import PortfolioStockLineChart from './PortfolioStockLineChart';
import { PortfolioStock } from '../../../api/GetPortfolio';
import { WalterAPI } from '../../../api/WalterAPI';
import Box from '@mui/material/Box';
import LoadingCircularProgress from '../../progress/LoadingCircularProgress';

interface PortfolioStockLineChartWidgetProps {
  loading: boolean;
  stocks: PortfolioStock[];
}

const PortfolioStockLineChartWidget: React.FC<
  PortfolioStockLineChartWidgetProps
> = (props) => {
  const [page, setPage] = useState<number>(1);
  const [stock, setStock] = useState<string>('');
  const [prices, setPrices] = useState<Price[]>([]);
  const [stockLoading, setStockLoading] = useState<boolean>(true);

  useEffect(() => {
    if (props.stocks !== undefined && props.stocks.length > 0) {
      setStock(props.stocks[page - 1].symbol);
      setStockLoading(true);
      WalterAPI.getPrices(props.stocks[page - 1].symbol)
        .then((response: GetPricesResponse) => setPrices(response.getPrices()))
        .catch((error) => console.log(error))
        .finally(() => setStockLoading(false));
    }
  }, [page, props.stocks]);

  return (
    <>
      { (props.loading || stockLoading) ? (
        <LoadingCircularProgress />
      ) : (
        <Container>
          <PortfolioStockLineChart
            loading={props.loading}
            stock={stock}
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
              page={page}
              onChange={(event, value) => setPage(value)}
              style={{ marginTop: '5px' }}
              sx={{
                '& .MuiPaginationItem-root': {
                  fontFamily: 'Raleway, sans-serif',
                  fontSize: '16px',
                },
              }}
            />
          </Box>
        </Container>
      )}
    </>
  );
};

export default PortfolioStockLineChartWidget;
