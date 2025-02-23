import React from 'react';
import Grid from '@mui/material/Grid2';
import VerifyEmailButton from '../components/verify/VerifyEmailButton';
import VerifyEmailInformational from '../components/verify/VerifyEmailInformational';

interface VerifyEmailPageProps {
  setAuthenticated: (authenticated: boolean) => void;
}

const VerifyEmailPage: React.FC<VerifyEmailPageProps> = (
  props: VerifyEmailPageProps,
) => {
  return (
    <Grid container direction="row">
      <Grid size={6}>
        <VerifyEmailInformational />
      </Grid>
      <Grid size={6}>
        <VerifyEmailButton setAuthenticated={props.setAuthenticated} />
      </Grid>
    </Grid>
  );
};

export default VerifyEmailPage;
