import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Price } from '../../api/GetPrices';

interface PortfolioStockLineChartProps {
  prices: Price[];
}

const PortfolioStockLineChart: React.FC<PortfolioStockLineChartProps> = ({
  prices,
}) => {
  function getTimestamps(): number[] {
    return prices.map((price) => convertIsoToEpochSeconds(price.timestamp));
  }

  function getPrices(): number[] {
    return prices.map((price) => price.price);
  }

  function convertIsoToEpochSeconds(isoString: string): number {
    const date = new Date(isoString);
    return Math.floor(date.getTime() / 1000);
  }

  return (
    <LineChart
      xAxis={[{ data: getTimestamps() }]}
      series={[
        {
          data: getPrices(),
        },
      ]}
      width={500}
      height={300}
    />
  );
};

export default PortfolioStockLineChart;
