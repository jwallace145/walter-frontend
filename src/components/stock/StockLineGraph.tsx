import * as React from 'react';
import { FC } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import dayjs from 'dayjs';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
} from '@mui/material';
import { Stock } from '../../api/methods/GetStock';
import { Colors, Fonts, US_DOLLAR } from '../../constants/Constants';
import { Price } from '../../api/methods/GetPrices';
import Grid from '@mui/material/Grid2';

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

  return (
    <Grid
      container
      spacing={2}
      sx={{
        borderRadius: '40px',
        backgroundColor: Colors.LIGHT_GRAY,
        outline: '1px solid ' + Colors.GRAY,
        padding: '10px',
        marginBottom: '15px',
      }}
    >
      <Stack width={'100%'} sx={{ margin: '20px' }}>
        <Typography
          sx={{
            fontFamily: Fonts.RALEWAY,
            fontWeight: 'bold',
            fontSize: '24px',
            '&:hover': {
              color: Colors.YELLOW,
              textDecoration: 'underline',
            },
            transition: 'color 0.3s ease, text-decoration 0.3s ease',
            cursor: 'pointer',
          }}
        >
          {props.stock?.symbol}
        </Typography>
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
              color: Colors.ATLANTIC_BLUE,
              showMark: false,
            },
          ]}
          height={350}
          margin={{ left: 60, right: 60, top: 60, bottom: 60 }}
          grid={{ vertical: true, horizontal: true }}
        />
      </Stack>
    </Grid>
  );
};

export default StockLineGraph;
