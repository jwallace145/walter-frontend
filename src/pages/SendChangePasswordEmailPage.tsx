import React from 'react';
import Grid from '@mui/material/Grid2';
import SendChangePasswordEmailInformational from '../components/password/SendChangePasswordEmailInformational';
import SendChangePasswordEmailForm from '../components/password/SendChangePasswordEmailForm';

const SendChangePasswordEmailPage: React.FC = () => {
  return (
    <Grid container direction="row">
      <Grid size={6}>
        <SendChangePasswordEmailInformational />
      </Grid>
      <Grid size={6}>
        <SendChangePasswordEmailForm />
      </Grid>
    </Grid>
  );
};

export default SendChangePasswordEmailPage;
