import React from 'react';
import {
  Card,
  CardContent,
  Container,
  CssBaseline,
  Link,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import LoadingCircularProgress from '../progress/LoadingCircularProgress';
import { NewsSource } from '../../api/methods/GetNewsSummary';

interface StockNewsSourceProps {
  loading: boolean;
  sources: NewsSource[];
}

const StockNewsSources: React.FC<StockNewsSourceProps> = (props) => {
  if (
    props.loading ||
    props.sources === undefined ||
    props.sources.length == 0
  ) {
    return <LoadingCircularProgress />;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <CssBaseline />
      {props.sources.map((source, index) => (
        <Card
          sx={{
            borderRadius: 2,
            boxShadow: 2,
            padding: 2,
            backgroundColor: 'background.paper',
          }}
        >
          <CardContent>
            <Typography variant="h6" component="div" sx={{ mb: 2 }}>
              <Link
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
              >
                {source.title}
              </Link>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Source: {source.source}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Published:{' '}
              {new Date(source.published_timestamp).toISOString().split('T')[0]}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default StockNewsSources;
