import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

interface PortfolioProps {
  stocks: any[];
}

const PortfolioPieChart: React.FC<PortfolioProps> = ({ stocks }) => {
  const graphStocks = () => {
    const data = [];
    for (const stock of stocks) {
      data.push({
        id: stock.symbol,
        value: stock.equity,
        label: stock.symbol,
      });
    }
    return data;
  };

  return (
    <PieChart
      series={[
        {
          data: graphStocks(),
        },
      ]}
      width={600}
      height={300}
    />
  );
};

export default PortfolioPieChart;
