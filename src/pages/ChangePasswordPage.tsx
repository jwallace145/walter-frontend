import React from 'react';
import Grid from '@mui/material/Grid2';
import ChangePasswordForm from '../components/password/ChangePasswordForm';
import ChangePasswordInformational from '../components/password/ChangePasswordInformational';

const ChangePasswordPage: React.FC = () => {
  return (
    <Grid container direction="row">
      <Grid size={6}>
        <ChangePasswordInformational />
      </Grid>
      <Grid size={6}>
        <ChangePasswordForm />
      </Grid>
    </Grid>
  );
};

export default ChangePasswordPage;
