import * as React from 'react';
import { pieArcLabelClasses, PieChart } from '@mui/x-charts/PieChart';
import { Container, Typography } from '@mui/material';
import LoadingCircularProgress from '../../progress/LoadingCircularProgress';
import { Colors, Fonts, US_DOLLAR } from '../../../constants/Constants';
import { PortfolioStock } from '../../../api/methods/GetPortfolio';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import useIsMobile from '../../utils/IsMobile';

/**
 * The colors utilized for the pie chart.
 */
const colors = [
  Colors.LIGHT_BLUE,
  Colors.YELLOW,
  Colors.TEAL,
  Colors.GRAY,
  Colors.LAVENDER,
];

/**
 * PortfolioPieChartProps
 *
 * The props used to render the portfolio pie chart on the dashboard page.
 */
interface PortfolioPieChartProps {
  loading: boolean;
  equity: number;
  stocks: PortfolioStock[];
}

/**
 * PortfolioPieChart
 *
 * The portfolio pie chart component that displays the users portfolio as a pie
 * chart on the dashboard page.
 *
 * @param props
 * @constructor
 */
const PortfolioPieChart: React.FC<PortfolioPieChartProps> = (props) => {
  const navigate: NavigateFunction = useNavigate();
  const isMobile: boolean = useIsMobile();

  const graphStocks = () => {
    return props.stocks.map((stock) => ({
      id: stock.symbol,
      value: stock.equity,
      label: stock.symbol,
    }));
  };

  const handleItemClick = (event: any, params: any) => {
    const stock = props.stocks[params.dataIndex].symbol.toLowerCase();
    navigate(`/stocks/${stock}`);
  };

  if (props.loading) {
    return <LoadingCircularProgress />;
  }

  return (
    <>
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
        <Typography
          variant="subtitle1"
          sx={{ fontFamily: Fonts.RALEWAY, fontWeight: 'bold' }}
        >
          {US_DOLLAR.format(props.equity)}
        </Typography>
      </Container>
      <Container
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <PieChart
          series={[
            {
              data: graphStocks(),
              innerRadius: 10,
              paddingAngle: 2,
              arcLabel: (value) => `${US_DOLLAR.format(value.value)}`,
              arcLabelMinAngle: 35,
              valueFormatter: (value) => `${US_DOLLAR.format(value.value)}`,
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fontFamily: Fonts.RALEWAY,
            },
          }}
          height={isMobile ? 300 : 400}
          slotProps={{ legend: { hidden: true } }}
          colors={colors}
          onItemClick={handleItemClick}
        />
      </Container>
    </>
  );
};

export default PortfolioPieChart;
