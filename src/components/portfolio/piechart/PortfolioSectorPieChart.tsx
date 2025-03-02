import { PortfolioStock } from '../../../api/methods/GetPortfolio';
import React from 'react';
import LoadingCircularProgress from '../../progress/LoadingCircularProgress';
import { Container, Typography } from '@mui/material';
import { Colors, Fonts, US_DOLLAR } from '../../../constants/Constants';
import { pieArcLabelClasses, PieChart } from '@mui/x-charts/PieChart';

const colors = [
  Colors.LIGHT_BLUE,
  Colors.YELLOW,
  Colors.TEAL,
  Colors.GRAY,
  Colors.LAVENDER,
];

interface PortfolioPieChartProps {
  loading: boolean;
  equity: number;
  stocks: PortfolioStock[];
}

const PortfolioSectorPieChart: React.FC<PortfolioPieChartProps> = (props) => {
  const getSectors: () => { [key: string]: number } = () => {
    let sectors: { [key: string]: number } = {};
    props.stocks.forEach((stock) => {
      if (stock.sector in sectors) {
        let count = sectors[stock.sector];
        sectors[stock.sector] = count + 1;
      } else {
        sectors[stock.sector] = 1;
      }
    });
    return sectors;
  };

  const getNumberOfStocks = () => {
    let numberOfStocks: number = 0;
    props.stocks.forEach((stock) => {
      numberOfStocks += 1;
    });
    return numberOfStocks;
  };

  const getDataPoints = () => {
    const numberOfStocks: number = getNumberOfStocks();
    let dataPoints: any[] = [];
    Object.entries(getSectors()).forEach(
      ([sector, count]: [string, number]) => {
        dataPoints.push({
          id: sector,
          value: 100 * (count / numberOfStocks),
          label: sector,
        });
      },
    );
    return dataPoints;
  };

  if (props.loading) {
    return <LoadingCircularProgress />;
  }

  return (
    <>
      <Container>
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ fontFamily: Fonts.RALEWAY, fontWeight: 'bold' }}
          >
            Portfolio
          </Typography>
          <Typography variant="subtitle1">
            {US_DOLLAR.format(props.equity)}
          </Typography>
        </Container>
        <PieChart
          series={[
            {
              data: getDataPoints(),
              innerRadius: 10,
              paddingAngle: 2,
              arcLabel: (value) => `${Math.trunc(value.value)} %`,
              arcLabelMinAngle: 35,
              valueFormatter: (value) => `${Math.trunc(value.value)} %`,
              highlightScope: { fade: 'global', highlight: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fontFamily: Fonts.RALEWAY,
              fontWeight: 'bold',
            },
          }}
          slotProps={{ legend: { hidden: true } }}
          height={400}
          colors={colors}
        />
      </Container>
    </>
  );
};

export default PortfolioSectorPieChart;
