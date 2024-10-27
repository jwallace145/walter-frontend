import React, { useState } from 'react';
import { SendNewsletterResponse } from '../../api/SendNewsletter';
import { WalterAPI } from '../../api/WalterAPI';
import {
  Alert,
  Button,
  Container,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';

const Newsletter: React.FC = () => {
  const [success, setSuccess] = useState<string>('');
  const [openSuccessAlert, setSuccessAlert] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [openErrorAlert, setErrorAlert] = useState<boolean>(false);

  async function handleSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    try {
      const response: SendNewsletterResponse = await WalterAPI.sendNewsletter();

      const message: string = response.getMessage();
      if (response.isSuccess()) {
        setSuccess(message);
        setSuccessAlert(true);
      } else {
        setError(message);
        setErrorAlert(true);
      }
    } catch (error) {
      setError('Unexpected error!');
      setErrorAlert(true);
    }
  }

  const handleClose = () => {
    setSuccessAlert(false);
    setErrorAlert(false);
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Send Newsletter
      </Typography>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        type="submit"
        onClick={handleSubmit}
      >
        Send Newsletter
      </Button>
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

export default Newsletter;
