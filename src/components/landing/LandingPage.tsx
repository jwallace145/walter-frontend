import { CssBaseline, Typography } from '@mui/material';
import React from 'react';
import Box from '@mui/material/Box';

const LandingPage: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          mt: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CssBaseline />
        <Typography
          variant="h6"
          noWrap
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'Raleway, sans-serif',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          WALTER
        </Typography>
      </Box>
    </>
  );
};

export default LandingPage;
