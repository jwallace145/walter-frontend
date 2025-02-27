import React from 'react';
import Grid from '@mui/material/Grid2';
import useIsMobile from '../components/utils/IsMobile';
import { Colors, FULL_PAGE_WIDTH } from '../constants/Constants';
import LandingPageTextTitle from '../components/landing/LandingPageTextTitle';
import LandingPageGraphicInstructional from '../components/landing/LandingPageGraphicInstructional';
import { Divider } from '@mui/material';

const LandingPage: React.FC = () => {
  const isMobile: boolean = useIsMobile();

  const getLandingPageTextTitle = (size: number) => {
    return (
      <Grid
        size={size}
        sx={{
          marginTop: isMobile ? '40px' : '70px',
          marginLeft: isMobile ? '40px' : '100px',
        }}
      >
        <LandingPageTextTitle />
      </Grid>
    );
  };

  const getDivider = (size: number) => {
    return (
      <Grid size={size}>
        <Divider
          sx={{
            backgroundColor: Colors.YELLOW,
            height: '3px',
            marginY: isMobile ? 4 : 8,
            width: '85%',
            borderRadius: '8px',
            marginLeft: isMobile ? '40px' : '100px',
            border: 'none',
          }}
        ></Divider>
      </Grid>
    );
  };

  const getLandingPageGraphicInstructional = (size: number) => {
    return <LandingPageGraphicInstructional />;
  };

  return (
    <Grid container direction="column">
      {getLandingPageTextTitle(FULL_PAGE_WIDTH)}
      {getDivider(FULL_PAGE_WIDTH)}
      {getLandingPageGraphicInstructional(FULL_PAGE_WIDTH)}
    </Grid>
  );
};

export default LandingPage;
