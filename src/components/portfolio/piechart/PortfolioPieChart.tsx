import * as React from 'react';
import { pieArcLabelClasses, PieChart } from '@mui/x-charts/PieChart';
import { Container, Typography, useMediaQuery } from '@mui/material';
import LoadingCircularProgress from '../../progress/LoadingCircularProgress';
import { US_DOLLAR } from '../../../constants/Constants';
import { PortfolioStock } from '../../../api/methods/GetPortfolio';
import { useNavigate } from 'react-router-dom';

/**
 * The colors utilized for the pie chart.
 */
const colors = ['#257180', '#F2E5BF', '#FD8B51', '#CB6040', '#FF6F61'];

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
  const navigate = useNavigate();

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
      <Container>
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="subtitle1">Portfolio</Typography>
          <Typography variant="subtitle1">
            {US_DOLLAR.format(props.equity)}
          </Typography>
        </Container>
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
              fontFamily: 'Raleway, sans-serif',
              fontWeight: 'bold',
            },
          }}
          slotProps={{ legend: { hidden: false } }}
          height={400}
          colors={colors}
          onItemClick={handleItemClick}
        />
      </Container>
    </>
  );
};

export default PortfolioPieChart;
