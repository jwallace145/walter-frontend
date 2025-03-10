import * as React from 'react';
import { FC, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Price } from '../../../api/methods/GetPrices';
import dayjs from 'dayjs';
import { Container, Link, Typography } from '@mui/material';
import { Colors, Fonts, US_DOLLAR } from '../../../constants/Constants';
import { PortfolioStock } from '../../../api/methods/GetPortfolio';
import PortfolioStockDelta from './PortfolioStockDelta';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import isMobile from '../../utils/IsMobile';

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
): React.ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const [delta, setDelta] = React.useState<number>(0);

  /**
   * On update of the stock prices passed into this child component, set the
   * delta to feed into the title.
   */
  useEffect(() => {
    setDelta(getDelta());
  }, [props.prices]);

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

  const getEndPrice: () => number = () => {
    if (props.prices.length === 0) {
      return 0;
    }
    return props.prices[props.prices.length - 1].price;
  };

  const getDelta: () => number = (): number => {
    if (props.prices.length === 0) {
      return 0;
    }
    return (getEndPrice() - getStartPrice()) / getStartPrice();
  };

  if (props.prices.length === 0) {
    return (
      <Container>
        <Typography
          variant="subtitle1"
          sx={{ fontFamily: Fonts.RALEWAY, fontWeight: 'bold' }}
        >
          No stock prices available for this stock.
        </Typography>
      </Container>
    );
  }

  /**
   * Get the stock identifier for the stock line chart title.
   *
   * For mobile, utilize a shorter name such as the ticker symbol to use
   * less characters and improve UX.
   */
  const getStock: (isMobile: boolean) => React.ReactElement = (
    isMobile: boolean,
  ): React.ReactElement => {
    if (isMobile) {
      return (
        <Typography
          variant="subtitle1"
          onClick={() =>
            navigate(`/stocks/${props.stock.symbol.toLowerCase()}`)
          }
          sx={{
            fontFamily: Fonts.RALEWAY,
            fontWeight: 'bold',
            textDecoration: 'none',
            '&:hover': {
              color: Colors.YELLOW,
              textDecoration: 'underline',
            },
            transition: 'color 0.3s ease, text-decoration 0.3s ease',
            cursor: 'pointer',
          }}
        >
          <Link>{props.stock.symbol}</Link>
        </Typography>
      );
    } else {
      return (
        <Typography
          variant="subtitle1"
          sx={{
            fontFamily: Fonts.RALEWAY,
            fontWeight: 'bold',
            textDecoration: 'none',
            '&:hover': {
              color: Colors.YELLOW,
              textDecoration: 'underline',
            },
            transition: 'color 0.3s ease, text-decoration 0.3s ease',
            cursor: 'pointer',
          }}
        >
          <Link
            onClick={() =>
              navigate(`/stocks/${props.stock.symbol.toLowerCase()}`)
            }
            sx={{
              cursor: 'pointer',
              textDecoration: 'none',
              color: 'inherit',
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
        {getStock(isMobile())}
        <PortfolioStockDelta delta={delta} equity={props.stock.equity} />
      </Container>
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
            valueFormatter: (value: any): string =>
              `${US_DOLLAR.format(value)}`,
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
            valueFormatter: (v: number | null): string =>
              `${US_DOLLAR.format(v as number)}`,
            color: Colors.ATLANTIC_BLUE,
            showMark: false,
            area: true,
            baseline: 'min',
          },
        ]}
        height={400}
        margin={{ left: 60 }}
        grid={{ vertical: true, horizontal: true }}
      />
    </Container>
  );
};

export default PortfolioStockLineChart;
