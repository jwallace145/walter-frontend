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
      return getVerifyEmailButton(FULL_PAGE_WIDTH);
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
      <Grid size={size} sx={{ marginTop: isMobile ? '100px' : '200px' }}>
        <VerifyEmailButton setAuthenticated={props.setAuthenticated} />
      </Grid>
    );
  };

  const getVerifyEmailInformational = (size: number) => {
    return (
      <Grid size={size}>
        <VerifyEmailInformational />
      </Grid>
    );
  };

  return (
    <Grid container direction="row">
      {getVerifyEmailPage(isMobile)}
    </Grid>
  );
};

export default VerifyEmailPage;
