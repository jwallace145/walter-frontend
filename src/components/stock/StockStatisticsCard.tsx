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
  const formatLargeNumber: (number: number) => string = (
    number: number,
  ): string => {
    const absNumber: number = Math.abs(number);

    let largeNumber: string;
    if (absNumber >= 1_000_000_000_000) {
      largeNumber = (absNumber / 1_000_000_000_000).toFixed(2) + 'T';
    } else if (absNumber >= 1_000_000_000) {
      largeNumber = (absNumber / 1_000_000_000).toFixed(2) + 'B';
    } else if (absNumber >= 1_000_000) {
      largeNumber = (absNumber / 1_000_000).toFixed(2) + 'M';
    } else {
      largeNumber = number.toString();
    }

    if (number < 0) {
      return `-$${largeNumber}`;
    } else {
      return `$${largeNumber}`;
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
              <Typography
                sx={{
                  fontFamily: Fonts.RALEWAY,
                  fontWeight: 'bold',
                  fontSize: '18px',
                  display: 'inline',
                }}
              >
                Market Cap:{' '}
              </Typography>
              {formatLargeNumber(props.statistics.marketCapitalization)}
            </Typography>
            <Typography
              sx={{
                fontFamily: Fonts.RALEWAY,
                fontWeight: 'normal',
                fontSize: '18px',
              }}
            >
              <Typography
                sx={{
                  fontFamily: Fonts.RALEWAY,
                  fontWeight: 'bold',
                  fontSize: '18px',
                  display: 'inline',
                }}
              >
                EBITDA:
              </Typography>{' '}
              {formatLargeNumber(props.statistics.ebitda)}
            </Typography>
            <Typography
              sx={{
                fontFamily: Fonts.RALEWAY,
                fontWeight: 'normal',
                fontSize: '18px',
              }}
            >
              <Typography
                sx={{
                  fontFamily: Fonts.RALEWAY,
                  fontWeight: 'bold',
                  fontSize: '18px',
                  display: 'inline',
                }}
              >
                PE Ratio:
              </Typography>{' '}
              {props.statistics.peRatio}
            </Typography>
            <Typography
              sx={{
                fontFamily: Fonts.RALEWAY,
                fontWeight: 'normal',
                fontSize: '18px',
              }}
            >
              <Typography
                sx={{
                  fontFamily: Fonts.RALEWAY,
                  fontWeight: 'bold',
                  fontSize: '18px',
                  display: 'inline',
                }}
              >
                Dividend Yield:
              </Typography>{' '}
              {props.statistics.dividendYield}
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
              <Typography
                sx={{
                  fontFamily: Fonts.RALEWAY,
                  fontWeight: 'bold',
                  fontSize: '18px',
                  display: 'inline',
                }}
              >
                EPS:
              </Typography>{' '}
              {props.statistics.eps}
            </Typography>
            <Typography
              sx={{
                fontFamily: Fonts.RALEWAY,
                fontWeight: 'normal',
                fontSize: '18px',
              }}
            >
              <Typography
                sx={{
                  fontFamily: Fonts.RALEWAY,
                  fontWeight: 'bold',
                  fontSize: '18px',
                  display: 'inline',
                }}
              >
                52 Week High:{' '}
              </Typography>
              {US_DOLLAR.format(props.statistics.fiftyTwoWeekHigh)}
            </Typography>
            <Typography
              sx={{
                fontFamily: Fonts.RALEWAY,
                fontWeight: 'normal',
                fontSize: '18px',
              }}
            >
              <Typography
                sx={{
                  fontFamily: Fonts.RALEWAY,
                  fontWeight: 'bold',
                  fontSize: '18px',
                  display: 'inline',
                }}
              >
                52 Week Low:
              </Typography>{' '}
              {US_DOLLAR.format(props.statistics.fiftyTwoWeekLow)}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default StockStatisticsCard;
