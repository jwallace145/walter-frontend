import * as React from 'react';
import { useEffect, useState } from 'react';
import { Price } from '../../api/GetPrices';
import { Button, Container } from '@mui/material';
import PortfolioStockLineChart from './PortfolioStockLineChart';
import { PortfolioStock } from '../../api/GetPortfolio';
import { WalterAPI } from '../../api/WalterAPI';

interface PortfolioStockLineChartWidgetProps {
  stocks: PortfolioStock[];
}

const PortfolioStockLineChartWidget: React.FC<
  PortfolioStockLineChartWidgetProps
> = (props) => {
  const [index, setIndex] = useState<number>(0);
  const [stocks, setStocks] = useState<PortfolioStock[]>([]);
  const [prices, setPrices] = useState<Price[]>([]);

  useEffect(() => {
    setStocks(props.stocks);
    if (stocks !== undefined && stocks.length > 0) {
      WalterAPI.getPrices(stocks[index].symbol).then((response) => {
        setPrices(response.getPrices());
      });
    }
  }, [props, stocks, index]);

  async function handlePreviousButton(e: React.FormEvent) {
    e.preventDefault();

    if (index === 0) {
      return;
    }
    setIndex(index - 1);
  }

  async function handleNextButton(e: React.FormEvent) {
    e.preventDefault();

    if (index === stocks.length - 1) {
      return;
    }

    setIndex(index + 1);
  }

  return (
    <Container>
      <PortfolioStockLineChart prices={prices} />
      <Button variant="contained" type="submit" onClick={handlePreviousButton}>
        Previous
      </Button>
      <Button variant="contained" type="submit" onClick={handleNextButton}>
        Next
      </Button>
    </Container>
  );
};

export default PortfolioStockLineChartWidget;
