import React, { FormEvent, useState } from 'react';
import { WalterAPI } from '../../api/WalterAPI';
import { SubscribeResponse } from '../../api/methods/Subscribe';
import { Alert, Avatar, Container, CssBaseline, Snackbar } from '@mui/material';
import Box from '@mui/material/Box';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import LoadingButton from '../button/LoadingButton';

/**
 * Unsubscribe Component
 *
 * This component contains a button used to unsubscribe authenticated users
 * from Walter's newsletter.
 *
 * @constructor
 */
const Unsubscribe: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>('');
  const [openSuccessAlert, setSuccessAlert] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [openErrorAlert, setErrorAlert] = useState<boolean>(false);

  /**
   * Call the Unsubscribe API to unsubscribe authenticated user from Walter's
   * newsletter.
   *
   * @param event
   */
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    setLoading(true);
    WalterAPI.unsubscribe()
      .then((response: SubscribeResponse) => {
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
          text={'Unsubscribe'}
        />
      </Box>
      <Snackbar open={openSuccessAlert} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {success}
        </Alert>
      </Snackbar>
      <Snackbar open={openErrorAlert} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Unsubscribe;
