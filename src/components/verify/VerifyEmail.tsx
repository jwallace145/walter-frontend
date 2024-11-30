import React, { FC, FormEvent, useState } from 'react';
import { Alert, Avatar, Container, CssBaseline, Snackbar } from '@mui/material';
import Box from '@mui/material/Box';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LoadingButton from '../button/LoadingButton';
import { useLocation } from 'react-router-dom';
import { WalterAPI } from '../../api/WalterAPI';
import { VerifyEmailResponse } from '../../api/methods/VerifyEmail';

const VerifyEmail: FC = () => {
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>('');
  const [openSuccessAlert, setSuccessAlert] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [openErrorAlert, setErrorAlert] = useState<boolean>(false);

  const getEmailToken = () => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get('token');
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setLoading(true);
    const token: string = getEmailToken() as string;
    WalterAPI.verifyEmail(token)
      .then((response: VerifyEmailResponse) => {
        if (response.isSuccess()) {
          setSuccess(response.getMessage());
          setSuccessAlert(true);
        } else {
          setError(response.getMessage());
          setErrorAlert(true);
        }
      })
      .catch((error: any) => console.log(error))
      .finally(() => setLoading(false));
  };

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
          <VerifiedUserIcon />
        </Avatar>
        <LoadingButton
          loading={loading}
          onClick={handleSubmit}
          text={'Verify'}
        />
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

export default VerifyEmail;
