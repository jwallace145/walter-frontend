import React, { useState } from 'react';
import {
  Alert,
  Button,
  Container,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { WalterAPI } from '../../api/WalterAPI';
import { setCookie } from 'typescript-cookie';
import { AuthUserResponse } from '../../api/AuthUser';
import { WALTER_TOKEN_NAME } from '../../constants/Constants';
import { useNavigate } from 'react-router-dom';

export interface LoginProps {
  setAuthenticated: (authenticated: boolean) => void;
}

const Login = (props: LoginProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState<string>('');
  const [openSuccessAlert, setSuccessAlert] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [openErrorAlert, setErrorAlert] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response: AuthUserResponse = await WalterAPI.authUser(
        email,
        password,
      );

      const message: string = response.getMessage();
      if (response.isSuccess()) {
        const token: string = response.getToken();
        setCookie(WALTER_TOKEN_NAME, token);
        setSuccess(message);
        setSuccessAlert(true);
        props.setAuthenticated(true);
        navigate('/dashboard');
      } else {
        setError(message);
        setErrorAlert(true);
      }
    } catch (error) {
      setError('Unexpected error!');
      setErrorAlert(true);
    }
  };

  const handleClose = () => {
    setSuccessAlert(false);
    setErrorAlert(false);
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        marginTop: 5,
        backgroundColor: '#eeeeee',
        padding: 3,
        border: '2px solid #121212',
        borderRadius: '8px',
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button fullWidth type="submit">
          Login
        </Button>
      </form>
      <Snackbar
        open={openSuccessAlert}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          {success}
        </Alert>
      </Snackbar>
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
  );
};

export default Login;
