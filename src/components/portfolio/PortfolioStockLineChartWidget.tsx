import * as React from 'react';
import { useEffect, useState } from 'react';
import { Price } from '../../api/GetPrices';
import { CircularProgress, Container, Pagination } from '@mui/material';
import PortfolioStockLineChart from './PortfolioStockLineChart';
import { PortfolioStock } from '../../api/GetPortfolio';
import { WalterAPI } from '../../api/WalterAPI';
import Box from '@mui/material/Box';

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

  useEffect(() => {
    if (props.stocks !== undefined && props.stocks.length > 0) {
      setStock(props.stocks[page - 1].symbol);
      WalterAPI.getPrices(props.stocks[page - 1].symbol).then((response) => {
        setPrices(response.getPrices());
      });
    }
  }, [page, props.stocks]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      {props.loading ? (
        <Box
          width={600}
          height={400}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Container>
          <PortfolioStockLineChart
            loading={props.loading}
            stock={stock}
            prices={prices}
          />
          <Pagination
            count={props.stocks.length}
            color="primary"
            page={page}
            onChange={handleChange}
          />
        </Container>
      )}
    </>
  );
};

export default PortfolioStockLineChartWidget;
