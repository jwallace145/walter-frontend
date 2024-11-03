import React, { useState } from 'react';
import {
  Alert,
  Avatar,
  Button,
  Container,
  CssBaseline,
  Snackbar,
  TextField,
} from '@mui/material';
import { WalterAPI } from '../../api/WalterAPI';
import { setCookie } from 'typescript-cookie';
import { AuthUserResponse } from '../../api/AuthUser';
import { WALTER_TOKEN_NAME } from '../../constants/Constants';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { LockOutlined } from '@mui/icons-material';

export interface LoginProps {
  setAuthenticated: (authenticated: boolean) => void;
}

const Login = (props: LoginProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [openErrorAlert, setErrorAlert] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response: AuthUserResponse = await WalterAPI.authUser(
        email,
        password,
      );

      const message: string = response.getMessage();
      if (response.isSuccess()) {
        const token: string = response.getToken();
        setCookie(WALTER_TOKEN_NAME, token);
        props.setAuthenticated(true);
        navigate('/dashboard');
      } else {
        setError(message);
        setErrorAlert(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleClose = () => {
    setErrorAlert(false);
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
            <Button fullWidth sx={{ mt: 3, mb: 2 }} onClick={handleSubmit}>
              LOGIN
            </Button>
          </Box>
        </Box>
        <Snackbar
          open={openErrorAlert}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default Login;
