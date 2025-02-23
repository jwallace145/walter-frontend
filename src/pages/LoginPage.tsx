import React from 'react';
import Grid from '@mui/material/Grid2';
import LoginForm from '../components/login/LoginForm';
import LoginInformational from '../components/login/LoginInformational';
import useIsMobile from '../components/utils/isMobile';
import { FULL_PAGE_WIDTH, HALF_PAGE_WIDTH } from '../constants/Constants';

interface LoginPageProps {
  setAuthenticated: (authenticated: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = (props: LoginPageProps) => {
  const isMobile: boolean = useIsMobile();

  const getLoginPage = (isMobile: boolean) => {
    if (isMobile) {
      return getLoginForm(FULL_PAGE_WIDTH);
    } else {
      return (
        <>
          {getLoginInformational(HALF_PAGE_WIDTH)}
          {getLoginForm(HALF_PAGE_WIDTH)}
        </>
      );
    }
  };

  const getLoginForm = (size: number) => {
    return (
      <Grid size={size} sx={{ marginTop: isMobile ? '60px' : '120px' }}>
        <LoginForm setAuthenticated={props.setAuthenticated} />
      </Grid>
    );
  };

  const getLoginInformational = (size: number) => {
    return (
      <Grid size={size}>
        <LoginInformational />
      </Grid>
    );
  };

  return (
    <Grid container direction="row">
      {getLoginPage(isMobile)}
    </Grid>
  );
};

export default LoginPage;
