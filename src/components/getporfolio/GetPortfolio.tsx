import React, { useState } from 'react';
import { Alert, Button, Container, Snackbar, Typography } from '@mui/material';
import Portfolio from '../portfolio/Portfolio';
import { Response, WalterAPI } from '../../api/WalterAPI';

const GetPortfolio: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [stocks, setStocks] = useState<[]>([]);
  const [success, setSuccess] = useState<string>('');
  const [openSuccessAlert, setSuccessAlert] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [openErrorAlert, setErrorAlert] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response: Response = await WalterAPI.getPortfolio(email);

      setStocks(response.getData().stocks);

      const message: string = response.getMessage();
      if (response.isSuccess()) {
        setSuccess(message);
        setSuccessAlert(true);
      } else {
        setError(message);
        setErrorAlert(true);
      }
    } catch (error) {
      console.log(error);
      setError('Unexpected error!');
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
        Get Portfolio
      </Typography>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        type="submit"
        onClick={handleSubmit}
      >
        Get Portfolio
      </Button>
      <Portfolio stocks={stocks} />
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

export default GetPortfolio;
