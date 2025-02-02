import LoadingCircularProgress from '../progress/LoadingCircularProgress';
import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';

interface StockNewsSummaryProps {
  loading: boolean;
  summary: string | undefined;
}

const StockNewsSummary: React.FC<StockNewsSummaryProps> = (props) => {
  return (
    <>
      {props.loading || props.summary === undefined ? (
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
            <p>{props.summary}</p>
          </Box>
        </Container>
      )}
    </>
  );
};

export default StockNewsSummary;
