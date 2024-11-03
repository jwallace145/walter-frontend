import React, { useState } from 'react';
import { SendNewsletterResponse } from '../../api/SendNewsletter';
import { WalterAPI } from '../../api/WalterAPI';
import {
  Alert,
  Avatar,
  Button,
  Container,
  CssBaseline,
  Snackbar,
} from '@mui/material';
import Box from '@mui/material/Box';
import { Email } from '@mui/icons-material';

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
      <CssBaseline />
      <Box
        sx={{
          mt: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 2 }}>
          <Email />
        </Avatar>
        <Button fullWidth sx={{ mt: 3, mb: 2 }} onClick={handleSubmit}>
          SEND
        </Button>
      </Box>
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
