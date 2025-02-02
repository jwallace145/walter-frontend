import LoadingCircularProgress from '../progress/LoadingCircularProgress';
import { Stock } from '../../api/methods/GetStock';
import React from 'react';
import { Container, CssBaseline, Typography } from '@mui/material';
import Box from '@mui/material/Box';

/**
 * StockOverviewProps
 *
 * The props used to display the overview of a stock. This
 * overview is intended to give users quick information about
 * a company on a stock dashboard page.
 */
interface StockOverviewProps {
  loading: boolean;
  stock: Stock | undefined;
}

/**
 * StockOverview
 *
 * This component displays the overview of a stock in a card
 * format and is to be used for the stock dashboard page.
 *
 * @param props
 * @constructor
 */
const StockOverview: React.FC<StockOverviewProps> = (props) => {
  return (
    <>
      {props.loading || props.stock === undefined ? (
        <LoadingCircularProgress />
      ) : (
        <Container maxWidth="md">
          <CssBaseline />
          <Box
            sx={{
              mt: 20,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: 2,
              boxShadow: 3,
              padding: 2,
            }}
          >
            <Typography variant="subtitle1">
              Symbol: {props.stock.symbol}
            </Typography>
            <Typography variant="subtitle1">
              Company: {props.stock.company}
            </Typography>
            <Typography variant="subtitle1">
              Description: {props.stock.description}
            </Typography>
            <Typography variant="subtitle1">
              Exchange: {props.stock.exchange}
            </Typography>
            <Typography variant="subtitle1">
              Sector: {props.stock.sector}
            </Typography>
            <Typography variant="subtitle1">
              Industry: {props.stock.industry}
            </Typography>
            <Typography variant="subtitle1">
              Official Site: {props.stock.official_site}
            </Typography>
            <Typography variant="subtitle1">
              Address: {props.stock.address}
            </Typography>
          </Box>
        </Container>
      )}
    </>
  );
};

export default StockOverview;
