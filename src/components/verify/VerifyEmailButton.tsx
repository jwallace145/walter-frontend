import React, { FC, FormEvent, useState } from 'react';
import { Alert, Container, Snackbar } from '@mui/material';
import Box from '@mui/material/Box';
import LoadingButton from '../button/LoadingButton';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { WalterAPI } from '../../api/WalterAPI';
import { VerifyEmailResponse } from '../../api/methods/VerifyEmail';
import { DASHBOARD_PAGE, LOGIN_PAGE } from '../../pages/common/Pages';
import useIsMobile from '../utils/IsMobile';
import { setCookie } from 'typescript-cookie';
import { WALTER_TOKEN_NAME } from '../../constants/Constants';

const EMAIL_VERIFICATION_TOKEN_KEY: string = 'token';

interface VerifyEmailButtonProps {
  setAuthenticated: (authenticated: boolean) => void;
}

const VerifyEmailButton: FC<VerifyEmailButtonProps> = (
  props: VerifyEmailButtonProps,
) => {
  const isMobile: boolean = useIsMobile();
  const navigate: NavigateFunction = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [openErrorAlert, setErrorAlert] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // early return if token is null or undefined
    const token: string | null = getEmailVerificationToken();
    if (!isValidEmailVerificationToken(token)) {
      handleInvalidEmailVerificationToken();
      return;
    }

    // attempt to verify email ownership with email verification token and VerifyEmail API
    attemptToVerifyEmail(token as string);
  };

  const getEmailVerificationToken = () => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get(EMAIL_VERIFICATION_TOKEN_KEY);
  };

  const isValidEmailVerificationToken = (token: string | null) => {
    if (token === null || token === undefined) {
      return false;
    }
    return true;
  };

  const handleInvalidEmailVerificationToken = () => {
    setError('Invalid email verification token!');
    setErrorAlert(true);
  };

  const attemptToVerifyEmail = (token: string) => {
    setLoading(true);
    WalterAPI.verifyEmail(token as string)
      .then((response: VerifyEmailResponse) => {
        if (response.isSuccess()) {
          handleVerifyEmailSuccess(response.getToken());
        } else {
          handleVerifyEmailFailure(response.getMessage());
        }
      })
      .catch((error: any) => console.log(error))
      .finally(() => setLoading(false));
  };

  const handleVerifyEmailSuccess = (userAuthToken: string) => {
    setCookie(WALTER_TOKEN_NAME, userAuthToken);
    navigate(DASHBOARD_PAGE);
  };

  const handleVerifyEmailFailure = (errorMessage: string) => {
    setError(errorMessage);
    setErrorAlert(true);
  };

  return (
    <Container
      sx={{
        backgroundColor: '#cccccc',
        borderRadius: '40px',
        padding: '40px',
        width: '80%',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LoadingButton
          sx={{
            backgroundColor: '#FFD213',
            borderRadius: '40px',
            marginTop: '20px',
            marginBottom: '20px',
            padding: isMobile ? '8px' : '10px',
            '&:hover': {
              backgroundColor: '#F1B800',
            },
            transition: 'background-color 0.3s ease',
            width: isMobile ? '80%' : '40%',
          }}
          loading={loading}
          onClick={handleSubmit}
          text={'Verify'}
        />
      </Box>
      <Snackbar
        open={openErrorAlert}
        autoHideDuration={6000}
        onClose={() => setErrorAlert(false)}
      >
        <Alert onClose={() => setErrorAlert(false)} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default VerifyEmailButton;
