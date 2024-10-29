import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Price } from '../../api/GetPrices';
import dayjs from 'dayjs';
import { Container, Typography } from '@mui/material';

interface PortfolioStockLineChartProps {
  stock: string;
  prices: Price[];
}

const PortfolioStockLineChart: React.FC<PortfolioStockLineChartProps> = (
  props,
) => {
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
          },
        ]}
        yAxis={[
          {
            valueFormatter: (value) => `$ ${value.toFixed(2)}`,
          },
        ]}
        series={[
          {
            data: getPrices(),
            valueFormatter: (v) => `$ ${v?.toFixed(2)}`,
          },
        ]}
        width={700}
        height={400}
        grid={{ vertical: true, horizontal: true }}
      />
    </Container>
  );
};

export default PortfolioStockLineChart;
