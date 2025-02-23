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
import Typography from '@mui/material/Typography';
import { isValidEmail } from '../../constants/Constants';

/**
 * The send change password email component.
 *
 * This component contains a form for the user to input the email of their
 * account to send a reset password link. The user can then use the reset password
 * link included in the sent email to navigate to Walter to reset their password.
 *
 * @constructor
 */
const SendChangePasswordEmailForm: FC = () => {
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

    if (!isValidEmail(email)) {
      setError('Invalid email address!');
      setErrorAlert(true);
      return;
    }

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
    <Container
      sx={{
        backgroundColor: '#cccccc',
        borderRadius: '40px',
        marginTop: '120px',
        marginRight: '120px',
        padding: '40px',
        width: '80%',
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
          Reset Password
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
        <LoadingButton
          sx={{
            backgroundColor: '#FFD213',
            borderRadius: '40px',
            marginTop: '40px',
            marginBottom: '20px',
            padding: '10px',
            '&:hover': {
              backgroundColor: '#F1B800',
            },
            transition: 'background-color 0.3s ease',
            width: '40%',
          }}
          loading={loading}
          onClick={handleSendChangePasswordEmail}
          text={'Send'}
        />
      </Box>
      <Snackbar
        open={openSuccessAlert}
        autoHideDuration={10000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          {success}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openErrorAlert}
        autoHideDuration={10000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SendChangePasswordEmailForm;
