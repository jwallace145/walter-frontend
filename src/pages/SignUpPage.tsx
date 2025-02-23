import React from 'react';
import Grid from '@mui/material/Grid2';
import SignUpInformational from '../components/signup/SignUpInformational';
import SignUpForm from '../components/signup/SignUpForm';
import useIsMobile from '../components/utils/IsMobile';
import { FULL_PAGE_WIDTH, HALF_PAGE_WIDTH } from '../constants/Constants';

interface SignUpPageProps {
  setSentEmailVerificationAlert: (sentEmailVerification: boolean) => void;
}

const SignUpPage: React.FC<SignUpPageProps> = (props: SignUpPageProps) => {
  const isMobile: boolean = useIsMobile();

  const getSignUpPage = (isMobile: boolean) => {
    if (isMobile) {
      return getSignUpForm(FULL_PAGE_WIDTH);
    } else {
      return (
        <>
          {getSignUpInformational(HALF_PAGE_WIDTH)}
          {getSignUpForm(HALF_PAGE_WIDTH)}
        </>
      );
    }
  };

  const getSignUpForm = (size: number) => {
    return (
      <Grid size={size} sx={{ marginTop: isMobile ? '20px' : '60px' }}>
        <SignUpForm
          setSentEmailVerificationAlert={props.setSentEmailVerificationAlert}
        />
      </Grid>
    );
  };

  const getSignUpInformational = (size: number) => {
    return (
      <Grid size={size}>
        <SignUpInformational />
      </Grid>
    );
  };

  return (
    <Grid container direction="row">
      {getSignUpPage(isMobile)}
    </Grid>
  );
};

export default SignUpPage;
