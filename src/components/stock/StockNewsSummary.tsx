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

/**
 * StockNewsSummaryProps
 *
 * The props used to display a brief summary of recent stock news articles.
 */
interface StockNewsSummaryProps {
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
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <CssBaseline />
      <Card
        sx={{
          boxShadow: 2,
          padding: 2,
          borderRadius: '40px',
          backgroundColor: Colors.LIGHT_GRAY,
          outline: '2px solid ' + Colors.GRAY,
        }}
      >
        <CardContent>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ fontFamily: Fonts.RALEWAY }}
          >
            <ReactMarkdown children={props.summary} />
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default StockNewsSummary;
