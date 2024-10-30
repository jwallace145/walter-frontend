import * as React from 'react';
import { pieArcLabelClasses, PieChart } from '@mui/x-charts/PieChart';
import { Container, Typography } from '@mui/material';

const data = [
  { value: 40, label: 'Segment 1' },
  { value: 30, label: 'Segment 2' },
  { value: 20, label: 'Segment 3' },
  { value: 10, label: 'Segment 4' },
];

const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];

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
    <Container>
      <Typography variant="h6">Portfolio</Typography>
      <PieChart
        series={[
          {
            data: graphStocks(),
            innerRadius: 10,
            paddingAngle: 2,
            arcLabel: (value) => `$ ${value.value.toFixed(2)}`,
            arcLabelMinAngle: 35,
            valueFormatter: (value) => `$ ${value.value.toFixed(2)}`,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fontWeight: 'bold',
          },
        }}
        width={600}
        height={400}
        colors={colors}
      />
    </Container>
  );
};

export default PortfolioPieChart;
