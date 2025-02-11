import React, { FC, FormEvent, useState } from 'react';
import { WalterAPI } from '../../api/WalterAPI';
import { SendChangePasswordEmailResponse } from '../../api/methods/SendChangePasswordEmail';
import {
  Alert,
  Avatar,
  Container,
  CssBaseline,
  Snackbar,
  TextField,
} from '@mui/material';
import Box from '@mui/material/Box';
import KeyIcon from '@mui/icons-material/Key';
import LoadingButton from '../button/LoadingButton';

/**
 * The send change password email component.
 *
 * This component contains a form for the user to input the email of their
 * account to send a reset password link. The user can then use the reset password
 * link included in the sent email to navigate to Walter to reset their password.
 *
 * @constructor
 */
const SendChangePasswordEmail: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>('');
  const [openSuccessAlert, setSuccessAlert] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [openErrorAlert, setErrorAlert] = useState<boolean>(false);

  /**
   * Handle sending a change password email to the given email.
   *
   * @param event
   */
  const handleSendChangePasswordEmail = (event: FormEvent): void => {
    event.preventDefault();

    // call SendChangePasswordEmail API
    setLoading(true);
    WalterAPI.sendChangePasswordEmail(email)
      .then((response: SendChangePasswordEmailResponse) => {
        const message: string = response.getMessage();
        if (response.isSuccess()) {
          setSuccess(message);
          setSuccessAlert(true);
        } else {
          setError(message);
          setErrorAlert(true);
        }
      })
      .catch((error: any) => console.log(error))
      .finally(() => setLoading(false));
  };

  /**
   * Handle closing the success/failure notifications
   */
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
          borderRadius: 2,
          boxShadow: 3,
          padding: 2,
        }}
      >
        <Avatar sx={{ m: 2 }}>
          <KeyIcon />
        </Avatar>
        <Box sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <LoadingButton
            loading={loading}
            onClick={handleSendChangePasswordEmail}
            text={'Send'}
          />
        </Box>
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

export default SendChangePasswordEmail;
