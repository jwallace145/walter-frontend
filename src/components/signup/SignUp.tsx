import React, { useState } from 'react';
import {
  Alert,
  Button,
  Container,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [openSuccessAlert, setSuccessAlert] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [openErrorAlert, setErrorAlert] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      setErrorAlert(true);
      return;
    }

    try {
      const response = await axios.post(
        'https://084slq55lk.execute-api.us-east-1.amazonaws.com/dev/users',
        {
          email: email,
          username: username,
          password: password,
        },
      );

      const status = response.data['Status']
      const message = response.data['Message']


      if (status === 'Failure') {
        setError(message);
        setErrorAlert(true);
      }

      if (status === 'Success') {
        setSuccess(message);
          setSuccessAlert(true);
      }
    } catch (error) {
      setError("Unexpected error!");
      setErrorAlert(true);
    }

    setEmail('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleClose = () => {
    setSuccessAlert(false);
    setErrorAlert(false);
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Sign Up
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
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button variant="contained" color="primary" fullWidth type="submit">
          Sign Up
        </Button>
      </form>
      <Snackbar open={openSuccessAlert} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {success}
        </Alert>
      </Snackbar>
      <Snackbar open={openErrorAlert} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Signup;
