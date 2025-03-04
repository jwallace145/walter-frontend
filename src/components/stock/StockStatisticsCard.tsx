import React from 'react';
import LoadingCircularProgress from '../progress/LoadingCircularProgress';
import { Stack, Typography } from '@mui/material';
import { Colors, Fonts, US_DOLLAR } from '../../constants/Constants';
import Grid from '@mui/material/Grid2';
import { StockStatistics } from '../../api/methods/GetStatistics';

interface StockStatisticsProps {
  loading: boolean;
  statistics: StockStatistics | undefined;
}

const StockStatisticsCard: React.FC<StockStatisticsProps> = (
  props: StockStatisticsProps,
): React.ReactElement => {
  const formatMarketCap: (number: number) => string = (
    number: number,
  ): string => {
    if (number >= 1_000_000_000_000) {
      return (number / 1_000_000_000_000).toFixed(2) + 'T';
    } else if (number >= 1_000_000_000) {
      return (number / 1_000_000_000).toFixed(2) + 'B';
    } else if (number >= 1_000_000) {
      return (number / 1_000_000).toFixed(2) + 'M';
    } else {
      return number.toString();
    }
  };

  if (props.loading || props.statistics === undefined) {
    return <LoadingCircularProgress />;
  }

  return (
    <>
      <Grid
        container
        sx={{
          borderRadius: '40px',
          backgroundColor: Colors.LIGHT_GRAY,
          outline: '1px solid ' + Colors.GRAY,
          padding: '3px',
          marginBottom: '15px',
        }}
      >
        <Grid size={6}>
          <Stack
            sx={{
              marginLeft: '20px',
              marginTop: '10px',
              marginBottom: '10px',
              padding: '3px',
            }}
          >
            <Typography
              sx={{
                fontFamily: Fonts.RALEWAY,
                fontWeight: 'normal',
                fontSize: '18px',
              }}
            >
              Market Cap:{' '}
              {formatMarketCap(props.statistics.marketCapitalization)}
            </Typography>
            <Typography
              sx={{
                fontFamily: Fonts.RALEWAY,
                fontWeight: 'normal',
                fontSize: '18px',
              }}
            >
              EBITDA: {props.statistics.ebitda}
            </Typography>
            <Typography
              sx={{
                fontFamily: Fonts.RALEWAY,
                fontWeight: 'normal',
                fontSize: '18px',
              }}
            >
              PE Ratio: {props.statistics.peRatio}
            </Typography>
            <Typography
              sx={{
                fontFamily: Fonts.RALEWAY,
                fontWeight: 'normal',
                fontSize: '18px',
              }}
            >
              Dividend Yield: {props.statistics.dividendYield}
            </Typography>
          </Stack>
        </Grid>
        <Grid size={6} sx={{ alignItems: 'left' }}>
          <Stack
            sx={{
              marginLeft: '20px',
              marginTop: '10px',
              marginBottom: '10px',
              padding: '3px',
            }}
          >
            <Typography
              sx={{
                fontFamily: Fonts.RALEWAY,
                fontWeight: 'normal',
                fontSize: '18px',
              }}
            >
              EPS: {props.statistics.eps}
            </Typography>
            <Typography
              sx={{
                fontFamily: Fonts.RALEWAY,
                fontWeight: 'normal',
                fontSize: '18px',
              }}
            >
              52 Week High:{' '}
              {US_DOLLAR.format(props.statistics.fiftyTwoWeekHigh)}
            </Typography>
            <Typography
              sx={{
                fontFamily: Fonts.RALEWAY,
                fontWeight: 'normal',
                fontSize: '18px',
              }}
            >
              52 Week Low: {US_DOLLAR.format(props.statistics.fiftyTwoWeekLow)}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default StockStatisticsCard;
