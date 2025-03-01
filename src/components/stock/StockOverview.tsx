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
import { Colors, Fonts } from '../../constants/Constants';

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
      <Card
        sx={{
          boxShadow: 3,
          padding: 2,
          borderRadius: '40px',
          backgroundColor: Colors.LIGHT_GRAY,
          outline: '2px solid ' + Colors.GRAY,
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Business sx={{ mr: 1, color: 'primary.main' }} />
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 500, fontFamily: Fonts.RALEWAY }}
              >
                Symbol:
              </Typography>
              <Typography
                variant="body1"
                sx={{ ml: 1, fontFamily: Fonts.RALEWAY }}
              >
                {stock.symbol}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Info sx={{ mr: 1, color: 'secondary.main' }} />
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 500, fontFamily: Fonts.RALEWAY }}
              >
                Company:
              </Typography>
              <Typography
                variant="body1"
                sx={{ ml: 1, fontFamily: Fonts.RALEWAY }}
              >
                {stock.company}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ShowChart sx={{ mr: 1, color: 'success.main' }} />
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 500, fontFamily: Fonts.RALEWAY }}
              >
                Sector:
              </Typography>
              <Typography
                variant="body1"
                sx={{ ml: 1, fontFamily: Fonts.RALEWAY }}
              >
                {stock.sector}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ShowChart sx={{ mr: 1, color: 'info.main' }} />
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 500, fontFamily: Fonts.RALEWAY }}
              >
                Industry:
              </Typography>
              <Typography
                variant="body1"
                sx={{ ml: 1, fontFamily: Fonts.RALEWAY }}
              >
                {stock.industry}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationCity sx={{ mr: 1, color: 'warning.main' }} />
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 500, fontFamily: Fonts.RALEWAY }}
              >
                Address:
              </Typography>
              <Typography
                variant="body1"
                sx={{ ml: 1, fontFamily: Fonts.RALEWAY }}
              >
                {stock.address}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Web sx={{ mr: 1, color: 'primary.main' }} />
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 500, fontFamily: Fonts.RALEWAY }}
              >
                Official Site:
              </Typography>
              <Link
                href={stock.official_site}
                target="_blank"
                sx={{ ml: 1, fontFamily: Fonts.RALEWAY }}
                variant="body1"
              >
                {stock.official_site}
              </Link>
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontFamily: Fonts.RALEWAY }}
            >
              Exchange: {stock.exchange}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default StockOverview;
