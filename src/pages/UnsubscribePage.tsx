import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Unsubscribe from '../components/unsubscribe/Unsubscribe';
import { useLocation } from 'react-router-dom';

const UnsubscribePage: React.FC = () => {
  const location = useLocation();

  const getToken = () => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get('token') as string;
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Grid
        container
        size={12}
        spacing={2}
        direction="column"
        alignItems="center"
        sx={{
          padding: 2,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Unsubscribe token={getToken()} />
      </Grid>
    </Box>
  );
};

export default UnsubscribePage;
