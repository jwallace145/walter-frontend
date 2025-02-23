import React from 'react';
import Grid from '@mui/material/Grid2';
import ChangePasswordForm from '../components/password/ChangePasswordForm';
import ChangePasswordInformational from '../components/password/ChangePasswordInformational';
import useIsMobile from '../components/utils/IsMobile';
import { FULL_PAGE_WIDTH, HALF_PAGE_WIDTH } from '../constants/Constants';

const ChangePasswordPage: React.FC = () => {
  const isMobile: boolean = useIsMobile();

  const getChangePasswordPage = () => {
    if (isMobile) {
      return (
        <>
          {getChangePasswordInformational(FULL_PAGE_WIDTH)}
          {getChangePasswordForm(FULL_PAGE_WIDTH)}
        </>
      );
    } else {
      return (
        <>
          {getChangePasswordInformational(FULL_PAGE_WIDTH)}
          {getChangePasswordForm(FULL_PAGE_WIDTH)}
        </>
      );
    }
  };

  const getChangePasswordInformational = (size: number) => {
    return (
      <Grid size={size}>
        <ChangePasswordInformational />
      </Grid>
    );
  };

  const getChangePasswordForm = (size: number) => {
    return (
      <Grid size={size}>
        <ChangePasswordForm />
      </Grid>
    );
  };

  return (
    <Grid container direction={isMobile ? 'column' : 'row'}>
      {getChangePasswordPage()}
    </Grid>
  );
};

export default ChangePasswordPage;
