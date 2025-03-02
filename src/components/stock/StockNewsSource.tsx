import React from 'react';
import {
  Card,
  CardContent,
  Container,
  CssBaseline,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import LoadingCircularProgress from '../progress/LoadingCircularProgress';
import { NewsSource } from '../../api/methods/GetNewsSummary';
import { Colors, Fonts } from '../../constants/Constants';
import Grid from '@mui/material/Grid2';

interface StockNewsSourceProps {
  loading: boolean;
  sources: NewsSource[];
}

const StockNewsSources: React.FC<StockNewsSourceProps> = (
  props: StockNewsSourceProps,
): React.ReactElement => {
  const getNewsSourceCard: (source: NewsSource) => React.ReactElement = (
    source: NewsSource,
  ): React.ReactElement => {
    return (
      <Grid
        container
        sx={{
          borderRadius: '40px',
          backgroundColor: Colors.LIGHT_GRAY,
          outline: '1px solid ' + Colors.GRAY,
          marginBottom: '15px',
        }}
      >
        <Stack spacing={2} sx={{ margin: '20px' }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontFamily: Fonts.RALEWAY, fontSize: '20px' }}
          >
            <Link
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              sx={{
                fontFamily: Fonts.RALEWAY,
                textDecoration: 'none',
                '&:hover': {
                  color: Colors.YELLOW,
                  textDecoration: 'underline',
                },
                transition: 'color 0.3s ease, text-decoration 0.3s ease',
                cursor: 'pointer',
              }}
            >
              {source.title}
            </Link>
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 1, fontFamily: Fonts.RALEWAY }}
          >
            Source: {source.source}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontFamily: Fonts.RALEWAY }}
          >
            Published:{' '}
            {new Date(source.published_timestamp).toISOString().split('T')[0]}
          </Typography>
        </Stack>
      </Grid>
    );
  };

  if (
    props.loading ||
    props.sources === undefined ||
    props.sources.length === 0
  ) {
    return <LoadingCircularProgress />;
  }

  return (
    <Grid container>
      <Stack>
        {props.sources.map(
          (source: NewsSource): React.ReactElement => getNewsSourceCard(source),
        )}
      </Stack>
    </Grid>
  );
};

export default StockNewsSources;
