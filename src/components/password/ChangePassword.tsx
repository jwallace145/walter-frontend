import React, { FC, FormEvent, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
import { ChangePasswordResponse } from '../../api/methods/ChangePassword';
import { WalterAPI } from '../../api/WalterAPI';

const ChangePassword: FC = () => {
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string>('');
  const [openSuccessAlert, setSuccessAlert] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [openErrorAlert, setErrorAlert] = useState<boolean>(false);

  /**
   * Handle the user attempting to change their password.
   *
   * @param event
   */
  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    // confirm new password and confirm new password are equal
    if (newPassword !== confirmNewPassword) {
      setError('Passwords do not match!');
      setErrorAlert(true);
      return;
    }

    // verify change password token is valid
    const token: string | null = getChangePasswordToken();
    if (token === null || token === undefined) {
      setError('Invalid token!');
      setErrorAlert(true);
      return;
    }

    // call ChangePassword API with token and new password candidate
    setLoading(true);
    WalterAPI.changePassword(token, newPassword)
      .then((response: ChangePasswordResponse) => {
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
   * The change password token is given as a URL query parameter with name `token`.
   *
   * The token is used to authenticate the request and ensure that only people with
   * access to the user's email can change their password.
   */
  const getChangePasswordToken = () => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get('token');
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
            id="newPassword"
            name="newPassword"
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="confirmNewPassword"
            name="confirmNewPassword"
            label="Confirm New Password"
            type="password"
            value={confirmNewPassword}
            onChange={(e) => {
              setConfirmNewPassword(e.target.value);
            }}
          />
          <LoadingButton
            loading={loading}
            onClick={handleSubmit}
            text={'Reset'}
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

export default ChangePassword;
