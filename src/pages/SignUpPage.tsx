import React from 'react';
import Grid from '@mui/material/Grid2';
import SignUpInformational from '../components/signup/SignUpInformational';
import SignUpForm from '../components/signup/SignUpForm';

interface SignUpPageProps {
  setSentEmailVerificationAlert: (sentEmailVerification: boolean) => void;
}

const SignUpPage: React.FC<SignUpPageProps> = (props: SignUpPageProps) => {
  return (
    <Grid container direction="row">
      <Grid size={6}>
        <SignUpInformational />
      </Grid>
      <Grid size={6}>
        <SignUpForm
          setSentEmailVerificationAlert={props.setSentEmailVerificationAlert}
        />
      </Grid>
    </Grid>
  );
};

export default SignUpPage;
