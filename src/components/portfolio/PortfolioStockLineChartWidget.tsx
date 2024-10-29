import * as React from 'react';
import { useEffect, useState } from 'react';
import { Price } from '../../api/GetPrices';
import { Container, Pagination } from '@mui/material';
import PortfolioStockLineChart from './PortfolioStockLineChart';
import { PortfolioStock } from '../../api/GetPortfolio';
import { WalterAPI } from '../../api/WalterAPI';

interface PortfolioStockLineChartWidgetProps {
  stocks: PortfolioStock[];
}

const PortfolioStockLineChartWidget: React.FC<
  PortfolioStockLineChartWidgetProps
> = (props) => {
  const [page, setPage] = useState<number>(1);
  const [stock, setStock] = useState<string>('');
  const [stocks, setStocks] = useState<PortfolioStock[]>([]);
  const [prices, setPrices] = useState<Price[]>([]);

  useEffect(() => {
    setStocks(props.stocks);
  }, [props.stocks]);

  useEffect(() => {
    if (stocks !== undefined && stocks.length > 0) {
      setStock(stocks[page - 1].symbol);
      WalterAPI.getPrices(stocks[page - 1].symbol).then((response) => {
        setPrices(response.getPrices());
      });
    }
  }, [page]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Container>
      <PortfolioStockLineChart stock={stock} prices={prices} />
      <Pagination
        count={stocks.length}
        color="primary"
        page={page}
        onChange={handleChange}
      />
    </Container>
  );
};

export default PortfolioStockLineChartWidget;
