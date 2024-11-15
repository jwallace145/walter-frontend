import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Price } from '../../../api/GetPrices';
import dayjs from 'dayjs';
import { Container, Typography } from '@mui/material';
import { US_DOLLAR } from '../../../constants/Constants';
import { PortfolioStock } from '../../../api/GetPortfolio';

/**
 * PortfolioStockLineChartProps
 *
 * The component props used to create a line chart for the given stock.
 */
interface PortfolioStockLineChartProps {
  loading: boolean;
  stock: PortfolioStock;
  prices: Price[];
}

/**
 * PortfolioStockLineChart
 *
 * The line chart for the given stock displayed on the user portfolio dashboard.
 *
 * @param props
 * @constructor
 */
const PortfolioStockLineChart: React.FC<PortfolioStockLineChartProps> = (
  props: PortfolioStockLineChartProps,
) => {
  const getTimestamps = () => {
    return props.prices.map((price: Price) =>
      new Date(price.timestamp).getTime(),
    );
  };

  const getPrices = () => {
    return props.prices.map((price: Price) => price.price);
  };

  const getDelta = () => {
    const start_price: number = props.prices[0].price;
    const end_price: number = props.prices[props.prices.length - 1].price;
    const delta_percentage: number =
      ((end_price - start_price) / start_price) * 100;
    const delta_percentage_string: string = `${delta_percentage.toFixed(2)} %`;
    if (delta_percentage > 0.0) {
      return (
        <Typography variant="h6" style={{ color: 'green' }}>
          ({delta_percentage_string})
        </Typography>
      );
    } else {
      return (
        <Typography variant="h6" style={{ color: 'red' }}>
          ({delta_percentage_string})
        </Typography>
      );
    }
  };

  return (
    <Container>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6">
          {props.stock.company} ({props.stock.symbol})
        </Typography>
        {getDelta()}
      </Container>
      <LineChart
        xAxis={[
          {
            data: getTimestamps(),
            valueFormatter: (v) => dayjs(v).format('MMM D, YYYY'),
            tickLabelStyle: {
              fontSize: 12,
              fontFamily: 'Raleway, sans-serif',
              fontWeight: 'bold',
            },
          },
        ]}
        yAxis={[
          {
            valueFormatter: (value) => `${US_DOLLAR.format(value)}`,
            tickLabelStyle: {
              fontSize: 12,
              fontFamily: 'Raleway, sans-serif',
              fontWeight: 'bold',
            },
          },
        ]}
        series={[
          {
            data: getPrices(),
            valueFormatter: (v) => `${US_DOLLAR.format(v as number)}`,
            color: '#257180',
            showMark: false,
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
