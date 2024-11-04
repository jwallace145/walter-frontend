import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Price } from '../../api/GetPrices';
import dayjs from 'dayjs';
import { CircularProgress, Container, Typography } from '@mui/material';
import Box from '@mui/material/Box';

interface PortfolioStockLineChartProps {
  loading: boolean;
  stock: string;
  prices: Price[];
}

const PortfolioStockLineChart: React.FC<PortfolioStockLineChartProps> = (
  props,
) => {
  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const formatCurrency = (value: number | null): string => {
    if (value === null) {
      return USDollar.format(0);
    }
    return USDollar.format(value);
  };

  function getTimestamps(): number[] {
    return props.prices.map((price) => new Date(price.timestamp).getTime());
  }

  function getPrices(): number[] {
    return props.prices.map((price) => price.price);
  }

  return (
    <Container>
      <Typography variant="h6">{props.stock} Stocks</Typography>
      <LineChart
        xAxis={[
          {
            data: getTimestamps(),
            valueFormatter: (v) => dayjs(v).format('YYYY-MM-DD'),
            tickLabelStyle: {
              fontSize: 12,
              fontFamily: 'Raleway, sans-serif',
            },
          },
        ]}
        yAxis={[
          {
            valueFormatter: (value) => `${formatCurrency(value)}`,
            tickLabelStyle: {
              fontSize: 12,
              fontFamily: 'Raleway, sans-serif',
            },
          },
        ]}
        series={[
          {
            data: getPrices(),
            valueFormatter: (v) => `${formatCurrency(v)}`,
          },
        ]}
        height={400}
        margin={{ left: 60, right: 60, top: 60, bottom: 60 }}
        grid={{ vertical: true, horizontal: true }}
      />
    </Container>
  );
};

export default PortfolioStockLineChart;
