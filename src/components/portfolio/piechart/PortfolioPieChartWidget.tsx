import React, { useState } from 'react';
import LoadingCircularProgress from '../../progress/LoadingCircularProgress';
import { Container, Pagination } from '@mui/material';
import Box from '@mui/material/Box';
import PortfolioPieChart from './PortfolioPieChart';
import PortfolioSectorPieChart from './PortfolioSectorPieChart';
import { PortfolioStock } from '../../../api/methods/GetPortfolio';

interface PortfolioPieChartWidgetProps {
  loading: boolean;
  stocks: PortfolioStock[];
  equity: number;
}

const PortfolioPieChartWidget: React.FC<PortfolioPieChartWidgetProps> = (
  props,
): React.ReactElement => {
  const [page, setPage] = useState<number>(1); // pagination component starts pages list at 1 (not zero-indexed)

  if (props.loading) {
    return <LoadingCircularProgress />;
  }

  const renderPortfolioPieChart = () => {
    if (page === 1) {
      return (
        <>
          <PortfolioPieChart
            loading={props.loading}
            equity={props.equity}
            stocks={props.stocks}
          />
        </>
      );
    } else if (page === 2) {
      return (
        <>
          <PortfolioSectorPieChart
            loading={props.loading}
            equity={props.equity}
            stocks={props.stocks}
          />
        </>
      );
    }
  };

  return (
    <Container>
      {renderPortfolioPieChart()}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Pagination
          count={2}
          size={'small'}
          page={page}
          onChange={(event, value) => setPage(value)}
          style={{ marginTop: '5px' }}
          sx={{
            '& .MuiPaginationItem-root': {
              fontFamily: 'Raleway, sans-serif',
              fontSize: '16px',
            },
          }}
        />
      </Box>
    </Container>
  );
};

export default PortfolioPieChartWidget;
