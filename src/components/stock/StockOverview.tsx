import React from 'react';
import { Stock } from '../../api/methods/GetStock';
import LoadingCircularProgress from '../progress/LoadingCircularProgress';
import {
  Container,
  CssBaseline,
  Typography,
  Card,
  CardContent,
  Box,
  Link,
  Divider,
} from '@mui/material';
import {
  Business,
  Info,
  ShowChart,
  LocationCity,
  Web,
} from '@mui/icons-material';

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
  if (props.loading || props.stock === undefined) {
    return <LoadingCircularProgress />;
  }

  const { stock } = props;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <CssBaseline />
      <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            sx={{ fontWeight: 'bold', mb: 2 }}
          >
            Stock Overview
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Business sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                Symbol:
              </Typography>
              <Typography variant="body1" sx={{ ml: 1 }}>
                {stock.symbol}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Info sx={{ mr: 1, color: 'secondary.main' }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                Company:
              </Typography>
              <Typography variant="body1" sx={{ ml: 1 }}>
                {stock.company}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ShowChart sx={{ mr: 1, color: 'success.main' }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                Sector:
              </Typography>
              <Typography variant="body1" sx={{ ml: 1 }}>
                {stock.sector}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ShowChart sx={{ mr: 1, color: 'info.main' }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                Industry:
              </Typography>
              <Typography variant="body1" sx={{ ml: 1 }}>
                {stock.industry}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationCity sx={{ mr: 1, color: 'warning.main' }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                Address:
              </Typography>
              <Typography variant="body1" sx={{ ml: 1 }}>
                {stock.address}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Web sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                Official Site:
              </Typography>
              <Link
                href={stock.official_site}
                target="_blank"
                sx={{ ml: 1 }}
                variant="body1"
              >
                {stock.official_site}
              </Link>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Exchange: {stock.exchange}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default StockOverview;
