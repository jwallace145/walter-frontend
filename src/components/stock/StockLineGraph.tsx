import * as React from 'react';
import { FC } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import dayjs from 'dayjs';
import { Container, Card, CardContent, Typography, Box } from '@mui/material';
import { Stock } from '../../api/methods/GetStock';
import { Colors, Fonts, US_DOLLAR } from '../../constants/Constants';
import { Price } from '../../api/methods/GetPrices';

interface StockLineGraphProps {
  loading: boolean;
  stock: Stock | undefined;
  prices: Price[];
}

const StockLineGraph: FC<StockLineGraphProps> = (
  props: StockLineGraphProps,
): React.ReactElement => {
  const getTimestamps: () => number[] = (): number[] => {
    return props.prices.map((price: Price) =>
      new Date(price.timestamp).getTime(),
    );
  };

  const getPrices: () => number[] = (): number[] => {
    return props.prices.map((price: Price) => price.price);
  };

  const getStartPrice: () => number = (): number => {
    if (props.prices.length === 0) {
      return 0;
    }
    return props.prices[0].price;
  };

  const getEndPrice: () => number = (): number => {
    if (props.prices.length === 0) {
      return 0;
    }
    return props.prices[props.prices.length - 1].price;
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card
        sx={{
          borderRadius: '40px',
          padding: '3px',
          boxShadow: 3,
          backgroundColor: Colors.LIGHT_GRAY,
          outline: `2px solid ${Colors.GRAY}`,
        }}
      >
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
              sx={{ fontWeight: 'bold', fontFamily: Fonts.RALEWAY }}
            >
              {props.stock?.company} ({props.stock?.symbol})
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontFamily: Fonts.RALEWAY }}
            >
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
                  fontFamily: Fonts.RALEWAY,
                  fontWeight: 'bold',
                },
              },
            ]}
            yAxis={[
              {
                valueFormatter: (value) => `${US_DOLLAR.format(value)}`,
                tickLabelStyle: {
                  fontSize: 12,
                  fontFamily: Fonts.RALEWAY,
                  fontWeight: 'bold',
                },
              },
            ]}
            series={[
              {
                data: getPrices(),
                valueFormatter: (v) => `${US_DOLLAR.format(v as number)}`,
                color: Colors.YELLOW,
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
