import React, { useState } from 'react';
import {
  Alert,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Snackbar,
  TextField,
} from '@mui/material';
import { WalterAPI } from '../../api/WalterAPI';
import { setCookie } from 'typescript-cookie';
import { AuthUserResponse } from '../../api/methods/AuthUser';
import {
  DASHBOARD_PAGE,
  SEND_CHANGE_PASSWORD_EMAIL_PAGE,
} from '../../pages/common/Pages';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import LoadingButton from '../button/LoadingButton';
import { isValidEmail, WALTER_TOKEN_NAME } from '../../constants/Constants';
import Typography from '@mui/material/Typography';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useIsMobile from '../utils/IsMobile';

/**
 * LoginProps
 *
 * The props to pass into the login component which is responsible for
 * authenticating users.
 */
export interface LoginFormProps {
  setAuthenticated: (authenticated: boolean) => void;
}

/**
 * LoginForm
 *
 * The login component that users will interact with to authenticate themselves
 * and get access to restricted pages.
 *
 * @param props
 * @constructor
 */
const LoginForm: React.FC<LoginFormProps> = (props: LoginFormProps) => {
  const isMobile: boolean = useIsMobile();
  const navigate: NavigateFunction = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = useState<string>('');
  const [openErrorAlert, setErrorAlert] = React.useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setError('Invalid email address!');
      setErrorAlert(true);
      return;
    }

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
          <Typography
            variant="h4"
            sx={{ fontFamily: 'Raleway', fontWeight: '700' }}
          >
            Login
          </Typography>
          <Typography
            variant="body1"
            sx={{
              marginLeft: '20px',
              marginTop: '20px',
              fontFamily: 'Raleway',
              fontWeight: 600,
              textAlign: 'left',
              width: '100%',
            }}
          >
            Email
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            value={email}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '16px',
                backgroundColor: '#EFEFEF',
              },
              '& .MuiInputLabel-root': {
                borderRadius: '16px',
              },
            }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Typography
            variant="body1"
            sx={{
              marginLeft: '20px',
              marginTop: '20px',
              marginBottom: '10px',
              fontFamily: 'Raleway',
              fontWeight: 'bold',
              textAlign: 'left',
              width: '100%',
            }}
          >
            Password
          </Typography>
          <FormControl
            fullWidth
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderColor: 'black',
                borderRadius: '16px',
                backgroundColor: '#EFEFEF',
              },
              '& .MuiInputLabel-root': {
                borderColor: 'black',
                borderRadius: '16px',
                backgroundColor: '#EFEFEF',
              },
            }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? 'hide the password'
                        : 'display the password'
                    }
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <Link
            href={SEND_CHANGE_PASSWORD_EMAIL_PAGE}
            variant="body2"
            sx={{
              marginLeft: '20px',
              marginTop: '20px',
              color: 'black',
              fontFamily: 'Raleway',
              fontWeight: 'bold',
              textAlign: 'left',
              width: '100%',
              textDecoration: 'none',
              '&:hover': {
                color: '#444444',
                textDecoration: 'underline',
              },
              transition: 'color 0.3s ease, text-decoration 0.3s ease',
              cursor: 'pointer',
            }}
          >
            Forgot password?
          </Link>
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
            onClick={handleLogin}
            text={'login'}
          />
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

export default LoginForm;
