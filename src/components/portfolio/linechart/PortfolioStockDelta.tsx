import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { US_DOLLAR } from '../../../constants/Constants';

/**
 * PortfolioStockDeltaProps
 *
 * The props object for the delta of a stock in a user portfolio over the
 * given time period.
 */
interface PortfolioStockDeltaProps {
  delta: number;
  equity: number;
}

/**
 * PortfolioStockDelta Component
 *
 * This component rotates displaying colored updates about the user's stocks
 * updates over the time period.
 *
 * @constructor
 */
const PortfolioStockDelta: React.FC<PortfolioStockDeltaProps> = (props) => {
  const [isDeltaPercentage, setIsDeltaPercentage] = React.useState<boolean>(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsDeltaPercentage((prevState: boolean): boolean => !prevState);
    }, 5000); // 5000 ms = 5 seconds
    return () => clearInterval(intervalId);
  }, []);

  /**
   * Get the delta percentage of the stock over the time period.
   */
  const getDeltaPercentage = () => {
    const delta_percentage: number = props.delta * 100;
    const delta_percentage_string: string = `${delta_percentage.toFixed(2)} %`;
    if (delta_percentage > 0.0) {
      return (
        <Typography variant="subtitle1" style={{ color: 'green' }}>
          ({delta_percentage_string})
        </Typography>
      );
    } else {
      return (
        <Typography variant="subtitle1" style={{ color: 'red' }}>
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
        <Typography variant="subtitle1" style={{ color: 'green' }}>
          ({delta_equity_string})
        </Typography>
      );
    } else {
      return (
        <Typography variant="subtitle1" style={{ color: 'red' }}>
          ({delta_equity_string})
        </Typography>
      );
    }
  };

  return (
    <>
      {isDeltaPercentage ? getDeltaPercentage() : getDeltaEquity()}
    </>
  );
};

export default PortfolioStockDelta;
