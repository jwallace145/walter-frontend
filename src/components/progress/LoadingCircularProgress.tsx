import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';

const LoadingCircularProgress = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width={'100%'}
      height={400}
      textAlign="center"
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingCircularProgress;
