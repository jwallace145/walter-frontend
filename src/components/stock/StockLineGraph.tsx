import * as React from 'react';
import { FC } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import dayjs from 'dayjs';
import { Container, Card, CardContent, Typography, Box } from '@mui/material';
import { Stock } from '../../api/methods/GetStock';
import { US_DOLLAR } from '../../constants/Constants';
import { Price } from '../../api/methods/GetPrices';

/**
 * StockLineGraphProps
 */
interface StockLineGraphProps {
  loading: boolean;
  stock: Stock | undefined;
  prices: Price[];
}

const StockLineGraph: FC<StockLineGraphProps> = (
  props: StockLineGraphProps,
) => {
  /**
   * Get the timestamps from the prices in the given props.
   */
  const getTimestamps = () => {
    return props.prices.map((price: Price) =>
      new Date(price.timestamp).getTime(),
    );
  };

  /**
   * Get the prices from the prices in the given props.
   */
  const getPrices = () => {
    return props.prices.map((price: Price) => price.price);
  };

  /**
   * Get the start price of the stock at the start of the time period.
   */
  const getStartPrice = () => {
    if (props.prices.length === 0) {
      return 0;
    }
    return props.prices[0].price;
  };

  /**
   * Get the end price of the stock at the end of the time period.
   */
  const getEndPrice = () => {
    if (props.prices.length === 0) {
      return 0;
    }
    return props.prices[props.prices.length - 1].price;
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: 'bold' }}
            >
              {props.stock?.company} ({props.stock?.symbol})
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {`Start: ${US_DOLLAR.format(getStartPrice())} | End: ${US_DOLLAR.format(getEndPrice())}`}
            </Typography>
          </Box>

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
        </CardContent>
      </Card>
    </Container>
  );
};

export default StockLineGraph;
