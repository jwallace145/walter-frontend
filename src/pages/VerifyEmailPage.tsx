import React from 'react';
import Grid from '@mui/material/Grid2';
import VerifyEmailButton from '../components/verify/VerifyEmailButton';
import VerifyEmailInformational from '../components/verify/VerifyEmailInformational';
import useIsMobile from '../components/utils/IsMobile';
import { FULL_PAGE_WIDTH, HALF_PAGE_WIDTH } from '../constants/Constants';

interface VerifyEmailPageProps {
  setAuthenticated: (authenticated: boolean) => void;
}

const VerifyEmailPage: React.FC<VerifyEmailPageProps> = (
  props: VerifyEmailPageProps,
) => {
  const isMobile: boolean = useIsMobile();

  const getVerifyEmailPage = (isMobile: boolean) => {
    if (isMobile) {
      return (
        <>
          {getVerifyEmailInformational(FULL_PAGE_WIDTH)}
          {getVerifyEmailButton(FULL_PAGE_WIDTH)}
        </>
      );
    } else {
      return (
        <>
          {getVerifyEmailInformational(HALF_PAGE_WIDTH)}
          {getVerifyEmailButton(HALF_PAGE_WIDTH)}
        </>
      );
    }
  };

  const getVerifyEmailButton = (size: number) => {
    return (
      <Grid
        size={size}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: isMobile ? '20px' : '120px',
        }}
      >
        <VerifyEmailButton setAuthenticated={props.setAuthenticated} />
      </Grid>
    );
  };

  const getVerifyEmailInformational = (size: number) => {
    return (
      <Grid
        size={size}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: isMobile ? '20px' : '100px',
        }}
      >
        <VerifyEmailInformational />
      </Grid>
    );
  };

  return (
    <Grid container direction={isMobile ? 'column' : 'row'}>
      {getVerifyEmailPage(isMobile)}
    </Grid>
  );
};

export default VerifyEmailPage;
