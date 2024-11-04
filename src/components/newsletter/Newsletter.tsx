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
import LoadingButton from '../button/LoadingButton';

const Newsletter: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>('');
  const [openSuccessAlert, setSuccessAlert] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [openErrorAlert, setErrorAlert] = useState<boolean>(false);

  async function handleSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    try {
      setLoading(true);
      const response: SendNewsletterResponse = await WalterAPI.sendNewsletter();
      setLoading(false);

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
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 2,
          boxShadow: 3,
          padding: 2,
        }}
      >
        <Avatar sx={{ m: 2 }}>
          <Email />
        </Avatar>
        <LoadingButton loading={loading} onClick={handleSubmit} text={'Send'} />
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
