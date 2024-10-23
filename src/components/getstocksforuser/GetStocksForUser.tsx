import React, { useState } from 'react';
import { Alert, Button, Container, Snackbar, TextField, Typography } from '@mui/material';
import axios from 'axios';
import Portfolio from '../portfolio/Portfolio';

const GetStocksForUser: React.FC = () => {
  const [token, setToken] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [stocks, setStocks] = useState<[]>([]);
  const [success, setSuccess] = useState<string>('');
  const [openSuccessAlert, setSuccessAlert] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [openErrorAlert, setErrorAlert] = useState<boolean>(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios({
        method: 'POST',
        url: 'https://084slq55lk.execute-api.us-east-1.amazonaws.com/dev/users/stocks',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          email: email
        },
      });
      const status = response.data['Status']
      const message = response.data['Message']

      setStocks(message)

      if (status === 'Failure') {
        setError("error");
        setErrorAlert(true);
      }

      if (status === 'Success') {
        setSuccess("success");
        setSuccessAlert(true);
      }
    } catch (error) {
      setError("Unexpected error!");
      setErrorAlert(true);
    }
  };

  const handleClose = () => {
    setSuccessAlert(false);
    setErrorAlert(false);
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Get Stocks
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Token"
          variant="outlined"
          fullWidth
          margin="normal"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button variant="contained" color="primary" fullWidth type="submit">
          Get Stocks
        </Button>
      </form>
      <Portfolio stocks={stocks}/>
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

export default GetStocksForUser;
