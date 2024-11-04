import * as React from 'react';
import { pieArcLabelClasses, PieChart } from '@mui/x-charts/PieChart';
import { CircularProgress, Container, Typography } from '@mui/material';
import Box from '@mui/material/Box';

const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];

interface PortfolioProps {
  loading: boolean;
  stocks: any[];
}

const PortfolioPieChart: React.FC<PortfolioProps> = (props: PortfolioProps) => {
  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const graphStocks = () => {
    const data = [];
    for (const stock of props.stocks) {
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
      {props.loading ? (
        <Box
          width={600}
          height={400}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <PieChart
          series={[
            {
              data: graphStocks(),
              innerRadius: 10,
              paddingAngle: 2,
              arcLabel: (value) => `${USDollar.format(value.value)}`,
              arcLabelMinAngle: 35,
              valueFormatter: (value) => `${USDollar.format(value.value)}`,
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
      )}
    </Container>
  );
};

export default PortfolioPieChart;
