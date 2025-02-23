import React, { FC, FormEvent, useState } from 'react';
import { Alert, Container, Snackbar } from '@mui/material';
import Box from '@mui/material/Box';
import LoadingButton from '../button/LoadingButton';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';
import { WalterAPI } from '../../api/WalterAPI';
import { VerifyEmailResponse } from '../../api/methods/VerifyEmail';
import { DASHBOARD_PAGE } from '../../pages/common/Pages';
import { setCookie } from 'typescript-cookie';
import { WALTER_TOKEN_NAME } from '../../constants/Constants';

const EMAIL_VERIFICATION_TOKEN_KEY: string = 'token';

interface VerifyEmailButtonProps {
  setAuthenticated: (authenticated: boolean) => void;
}

const VerifyEmailButton: FC<VerifyEmailButtonProps> = (
  props: VerifyEmailButtonProps,
) => {
  const navigate: NavigateFunction = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [openErrorAlert, setErrorAlert] = useState<boolean>(false);

  const getEmailToken = () => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get(EMAIL_VERIFICATION_TOKEN_KEY);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // early return if token is null or undefined
    const token: string | null = getEmailToken();
    if (token === null || token === undefined) {
      setError('Invalid token!');
      setErrorAlert(true);
      return;
    }

    // attempt to verify email ownership with verification token and VerifyEmailButton API
    setLoading(true);
    WalterAPI.verifyEmail(token as string)
      .then((response: VerifyEmailResponse) => {
        console.log(response);
        if (response.isSuccess()) {
          const token: string = response.getToken();
          setCookie(WALTER_TOKEN_NAME, token);
          props.setAuthenticated(true);
          navigate(DASHBOARD_PAGE);
        } else {
          setError(response.getMessage());
          setErrorAlert(true);
        }
      })
      .catch((error: any) => console.log(error))
      .finally(() => setLoading(false));
  };

  return (
    <Container
      sx={{
        backgroundColor: '#cccccc',
        borderRadius: '40px',
        marginTop: '200px',
        marginRight: '120px',
        padding: '40px',
        width: '80%',
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
            padding: '10px',
            '&:hover': {
              backgroundColor: '#F1B800',
            },
            transition: 'background-color 0.3s ease',
            width: '40%',
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
