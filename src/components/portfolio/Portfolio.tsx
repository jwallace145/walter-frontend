import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

interface PortfolioProps {
  stocks: []
}

const Portfolio: React.FC<PortfolioProps> = ({ stocks }) => {

  const graphStocks = () => {
    const data = []
    for (const stock of stocks) {
      data.push({
        id: stock["stock_symbol"],
        value: stock["quantity"],
        label: stock["stock_symbol"],
      })
    }
    return data
  }

  return (
    <PieChart
      series={[
        {
          data: graphStocks(),
        },
      ]}
      width={400}
      height={200}
    />
  );
}

export default Portfolio;