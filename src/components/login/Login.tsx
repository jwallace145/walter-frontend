import React, { useState } from 'react';
import {
  Alert,
  Avatar,
  Container,
  CssBaseline,
  Snackbar,
  TextField,
} from '@mui/material';
import { WalterAPI } from '../../api/WalterAPI';
import { setCookie } from 'typescript-cookie';
import { AuthUserResponse } from '../../api/methods/AuthUser';
import { DASHBOARD_PAGE, WALTER_TOKEN_NAME } from '../../constants/Constants';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { LockOutlined } from '@mui/icons-material';
import LoadingButton from '../button/LoadingButton';

/**
 * LoginProps
 *
 * The props to pass into the Login component which is responsible for
 * authenticating users.
 */
export interface LoginProps {
  setAuthenticated: (authenticated: boolean) => void;
}

/**
 * Login
 *
 * The login component that users will interact with to authenticate themselves
 * and get access to restricted pages.
 *
 * @param props
 * @constructor
 */
const Login = (props: LoginProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [openErrorAlert, setErrorAlert] = useState<boolean>(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    WalterAPI.authUser(email, password)
      .then((response: AuthUserResponse) => {
        const message: string = response.getMessage();
        if (response.isSuccess()) {
          const token: string = response.getToken();
          setCookie(WALTER_TOKEN_NAME, token);
          props.setAuthenticated(true);
          navigate(DASHBOARD_PAGE);
        } else {
          setError(message);
          setErrorAlert(true);
        }
      })
      .catch((error: any) => {
        setError('Unexpected error occurred!');
        setErrorAlert(true);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2,
            boxShadow: 3,
            padding: 2,
          }}
        >
          <Avatar sx={{ m: 2 }}>
            <LockOutlined />
          </Avatar>
          <Box sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <LoadingButton
              loading={loading}
              onClick={handleLogin}
              text={'Login'}
            />
          </Box>
        </Box>
        <Snackbar
          open={openErrorAlert}
          autoHideDuration={6000}
          onClose={(e) => setErrorAlert(false)}
        >
          <Alert onClose={(e) => setErrorAlert(false)} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default Login;
