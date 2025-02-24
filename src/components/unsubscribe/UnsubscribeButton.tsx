import React from 'react';
import { WalterAPI } from '../../api/WalterAPI';
import { UnsubscribeResponse } from '../../api/methods/Unsubscribe';
import Grid from '@mui/material/Grid2';
import LoadingButton from '../button/LoadingButton';
import Box from '@mui/material/Box';
import useIsMobile from '../utils/IsMobile';
import { Alert, Snackbar } from '@mui/material';

interface UnsubscribeProps {
  token: string;
}

const UnsubscribeButton: React.FC<UnsubscribeProps> = (
  props: UnsubscribeProps,
) => {
  const isMobile: boolean = useIsMobile();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>('');
  const [open, setOpen] = React.useState<boolean>(false);

  const handleUnsubscribe = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isValidUnsubscribeToken(props.token)) {
      setMessage('Invalid token!');
      setSuccess(false);
      setOpen(true);
      return;
    }

    attemptToUnsubscribeUser(props.token);
  };

  const isValidUnsubscribeToken = (token: string): boolean => {
    if (token === null || token == undefined) {
      return false;
    }
    return true;
  };

  const attemptToUnsubscribeUser = (token: string) => {
    setLoading(true);
    WalterAPI.unsubscribeUser(token)
      .then((response: UnsubscribeResponse) => {
        if (response.isSuccess()) {
          handleUnsubscribeSuccess(response.getMessage());
        } else {
          handleUnsubscribeFailure(response.getMessage());
        }
      })
      .catch((error: any) => {
        setMessage('Unexpected error occurred!');
        setSuccess(false);
        setOpen(true);
      })
      .finally(() => setLoading(false));
  };

  const handleUnsubscribeSuccess = (message: string) => {
    setMessage(message);
    setSuccess(true);
    setOpen(true);
  };

  const handleUnsubscribeFailure = (message: string) => {
    setMessage(message);
    setSuccess(false);
    setOpen(true);
  };

  return (
    <>
      <Grid
        sx={{
          backgroundColor: '#cccccc',
          borderRadius: '40px',
          padding: '40px',
          width: '80%',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
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
          <LoadingButton
            sx={{
              backgroundColor: '#FFD213',
              borderRadius: '40px',
              marginTop: '20px',
              marginBottom: '20px',
              padding: isMobile ? '8px' : '10px',
              '&:hover': {
                backgroundColor: '#F1B800',
              },
              transition: 'background-color 0.3s ease',
              width: isMobile ? '80%' : '40%',
            }}
            loading={loading}
            onClick={handleUnsubscribe}
            text={'Unsubscribe'}
          />
        </Box>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
        >
          <Alert
            onClose={() => setOpen(false)}
            severity={success ? 'success' : 'error'}
          >
            {message}
          </Alert>
        </Snackbar>
      </Grid>
    </>
  );
};

export default UnsubscribeButton;
