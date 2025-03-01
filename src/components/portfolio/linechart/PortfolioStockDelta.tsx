import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { Fonts, US_DOLLAR } from '../../../constants/Constants';

interface PortfolioStockDeltaProps {
  delta: number;
  equity: number;
}

const PortfolioStockDelta: React.FC<PortfolioStockDeltaProps> = (props) => {
  const [isDeltaPercentage, setIsDeltaPercentage] =
    React.useState<boolean>(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsDeltaPercentage((prevState: boolean): boolean => !prevState);
    }, 5000); // 5000 ms = 5 seconds
    return () => clearInterval(intervalId);
  }, []);

  const getDeltaPercentage = () => {
    const delta_percentage: number = props.delta * 100;
    const delta_percentage_string: string = `${delta_percentage.toFixed(2)} %`;
    if (delta_percentage > 0.0) {
      return (
        <Typography
          variant="subtitle1"
          style={{
            color: 'green',
            fontFamily: Fonts.RALEWAY,
            fontWeight: 'bold',
          }}
        >
          ({delta_percentage_string})
        </Typography>
      );
    } else {
      return (
        <Typography
          variant="subtitle1"
          style={{
            color: 'red',
            fontFamily: Fonts.RALEWAY,
            fontWeight: 'bold',
          }}
        >
          ({delta_percentage_string})
        </Typography>
      );
    }
  };

  /**
   * Get the delta equity over the time period.
   */
  const getDeltaEquity = () => {
    const delta_equity: number = props.delta * props.equity;
    const delta_equity_string: string = `${US_DOLLAR.format(delta_equity)}`;
    if (delta_equity > 0.0) {
      return (
        <Typography
          variant="subtitle1"
          style={{
            color: 'green',
            fontFamily: Fonts.RALEWAY,
            fontWeight: 'bold',
          }}
        >
          ({delta_equity_string})
        </Typography>
      );
    } else {
      return (
        <Typography
          variant="subtitle1"
          style={{
            color: 'red',
            fontFamily: Fonts.RALEWAY,
            fontWeight: 'bold',
          }}
        >
          ({delta_equity_string})
        </Typography>
      );
    }
  };

  return <>{isDeltaPercentage ? getDeltaPercentage() : getDeltaEquity()}</>;
};

export default PortfolioStockDelta;
