import React from 'react';
import {
  Card,
  CardContent,
  Container,
  CssBaseline,
  Typography,
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import LoadingCircularProgress from '../progress/LoadingCircularProgress';
import { Colors, Fonts } from '../../constants/Constants';
import Grid from '@mui/material/Grid2';

/**
 * StockNewsSummaryProps
 *
 * The props used to display a brief summary of recent stock news articles.
 */
interface StockNewsSummaryProps {
  sx?: object;
  loading: boolean;
  summary: string | undefined;
}

/**
 * StockNewsSummary
 *
 * This component displays a brief summary of recent news articles related to the stock.
 * It is visually designed to be engaging but not distracting.
 *
 * @param props
 * @constructor
 */
const StockNewsSummary: React.FC<StockNewsSummaryProps> = (props) => {
  if (props.loading || props.summary === undefined) {
    return <LoadingCircularProgress />;
  }

  return (
    <Grid
      container
      spacing={2}
      sx={{
        borderRadius: '40px',
        backgroundColor: Colors.LIGHT_GRAY,
        outline: '1px solid ' + Colors.GRAY,
        padding: '20px',
        ...props.sx,
      }}
    >
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ fontFamily: Fonts.RALEWAY }}
      >
        <ReactMarkdown children={props.summary} />
      </Typography>
    </Grid>
  );
};

export default StockNewsSummary;
