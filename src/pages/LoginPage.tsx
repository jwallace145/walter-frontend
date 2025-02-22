import React from 'react';
import Grid from '@mui/material/Grid2';
import LoginForm from '../components/login/LoginForm';
import LoginInformational from '../components/login/LoginInformational';

interface LoginPageProps {
  setAuthenticated: (authenticated: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = (props) => {
  return (
    <Grid container direction="row">
      <Grid size={6}>
        <LoginInformational />
      </Grid>
      <Grid size={6}>
        <LoginForm setAuthenticated={props.setAuthenticated} />
      </Grid>
    </Grid>
  );
};

export default LoginPage;
