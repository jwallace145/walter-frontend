import * as React from 'react';
import { FC, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Price } from '../../../api/methods/GetPrices';
import dayjs from 'dayjs';
import { Container, Link, Typography, useMediaQuery } from '@mui/material';
import { US_DOLLAR } from '../../../constants/Constants';
import { PortfolioStock } from '../../../api/methods/GetPortfolio';
import theme from '../../../theme/Theme';
import StringRotator from '../../utils/StringRotator';
import PortfolioStockDelta from './PortfolioStockDelta';
import { NavigateFunction, useNavigate } from 'react-router-dom';

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
const PortfolioStockLineChart: FC<PortfolioStockLineChartProps> = (
  props: PortfolioStockLineChartProps,
) => {
  const isMobile: boolean = useMediaQuery(theme.breakpoints.down('md'));
  const navigate: NavigateFunction = useNavigate();
  const [delta, setDelta] = React.useState<number>(0);

  /**
   * On update of the stock prices passed into this child component, set the
   * delta to feed into the title.
   */
  useEffect(() => {
    setDelta(getDelta());
  }, [props.prices]);

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
    return props.prices[0].price;
  };

  /**
   * Get the end price of the stock at the end of the time period.
   */
  const getEndPrice = () => {
    return props.prices[props.prices.length - 1].price;
  };

  /**
   * Get the delta of the stock over the given time period.
   */
  const getDelta = (): number => {
    return (getEndPrice() - getStartPrice()) / getStartPrice();
  };

  /**
   * Get the stock identifier for the stock line chart title.
   *
   * For mobile, utilize a shorter name such as the ticker symbol to use
   * less characters and improve UX.
   */
  const getStock = () => {
    if (isMobile) {
      return (
        <Typography
          variant="subtitle1"
          onClick={() => navigate(`/stocks/${props.stock.symbol.toLowerCase()}`)}
          sx={{
            cursor: 'pointer',
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          <Link>{props.stock.symbol}</Link>
        </Typography>
      );
    } else {
      return (
        <Typography variant="subtitle1">
          <Link
            onClick={() => navigate(`/stocks/${props.stock.symbol.toLowerCase()}`)}
            sx={{
              cursor: 'pointer',
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            {props.stock.company} ({props.stock.symbol})
          </Link>
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
        {getStock()}
        <PortfolioStockDelta delta={delta} equity={props.stock.equity} />
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
