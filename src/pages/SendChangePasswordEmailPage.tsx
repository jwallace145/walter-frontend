import React from 'react';
import Grid from '@mui/material/Grid2';
import useIsMobile from '../components/utils/IsMobile';
import { FULL_PAGE_WIDTH, HALF_PAGE_WIDTH } from '../constants/Constants';
import SendChangePasswordEmailInformational from '../components/password/SendChangePasswordEmailInformational';
import SendChangePasswordEmailForm from '../components/password/SendChangePasswordEmailForm';

const SendChangePasswordEmailPage: React.FC = () => {
  const isMobile: boolean = useIsMobile();

  const getSendChangePasswordEmailPage = () => {
    if (isMobile) {
      return (
        <>
          {getSendChangePasswordEmailInformational(FULL_PAGE_WIDTH)}
          {getSendChangePasswordEmailForm(FULL_PAGE_WIDTH)}
        </>
      );
    } else {
      return (
        <>
          {getSendChangePasswordEmailInformational(HALF_PAGE_WIDTH)}
          {getSendChangePasswordEmailForm(HALF_PAGE_WIDTH)}
        </>
      );
    }
  };

  const getSendChangePasswordEmailInformational = (size: number) => {
    return (
      <Grid
        size={size}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: isMobile ? '20px' : '100px',
        }}
      >
        <SendChangePasswordEmailInformational />
      </Grid>
    );
  };

  const getSendChangePasswordEmailForm = (size: number) => {
    return (
      <Grid
        size={size}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: isMobile ? '20px' : '100px',
        }}
      >
        <SendChangePasswordEmailForm />
      </Grid>
    );
  };

  return (
    <Grid container direction={isMobile ? 'column' : 'row'}>
      {getSendChangePasswordEmailPage()}
    </Grid>
  );
};

export default SendChangePasswordEmailPage;
