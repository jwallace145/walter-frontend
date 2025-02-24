import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import UnsubscribeButton from '../components/unsubscribe/UnsubscribeButton';
import { useLocation } from 'react-router-dom';
import useIsMobile from '../components/utils/IsMobile';
import { FULL_PAGE_WIDTH, HALF_PAGE_WIDTH } from '../constants/Constants';
import UnsubscribeInformational from '../components/unsubscribe/UnsubscribeInformational';

const UNSUBSCRIBE_TOKEN_KEY: string = 'token';

const UnsubscribePage: React.FC = () => {
  const isMobile: boolean = useIsMobile();
  const location = useLocation();

  const getUnsubscribePage = (isMobile: boolean) => {
    if (isMobile) {
      return (
        <>
          {getUnsubscribeInformational(FULL_PAGE_WIDTH)}
          {getUnsubscribeButton(FULL_PAGE_WIDTH)}
        </>
      );
    } else {
      return (
        <>
          {getUnsubscribeInformational(HALF_PAGE_WIDTH)}
          {getUnsubscribeButton(HALF_PAGE_WIDTH)}
        </>
      );
    }
  };

  const getUnsubscribeInformational = (size: number) => {
    return (
      <Grid size={size}>
        <UnsubscribeInformational />
      </Grid>
    );
  };

  const getUnsubscribeButton = (size: number) => {
    return (
      <Grid
        size={size}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: isMobile ? '20px' : '160px',
        }}
      >
        <UnsubscribeButton token={getUnsubscribeToken()} />
      </Grid>
    );
  };

  const getUnsubscribeToken = () => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get(UNSUBSCRIBE_TOKEN_KEY) as string;
  };

  return (
    <Grid container direction={isMobile ? 'column' : 'row'}>
      {getUnsubscribePage(isMobile)}
    </Grid>
  );
};

export default UnsubscribePage;
