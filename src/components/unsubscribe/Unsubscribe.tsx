import React from 'react';
import { WalterAPI } from '../../api/WalterAPI';
import { UnsubscribeResponse } from '../../api/methods/Unsubscribe';
import Grid from '@mui/material/Grid2';
import { Alert, Avatar, Snackbar } from '@mui/material';
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';
import LoadingButton from '../button/LoadingButton';

interface UnsubscribeProps {
  token: string;
}

const Unsubscribe: React.FC<UnsubscribeProps> = (props: UnsubscribeProps) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);
  const [alert, setAlert] = React.useState<string>('');
  const [open, setOpen] = React.useState<boolean>(false);

  const handleUnsubscribe = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    WalterAPI.unsubscribeUser(props.token)
      .then((response: UnsubscribeResponse) => {
        setError(response.isFailure());
        setAlert(response.getMessage());
        setOpen(true);
      })
      .catch((error: any) => console.log(error))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Grid
        size={{ xs: 12, md: 4 }}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 2,
          boxShadow: 3,
          padding: 2,
        }}
      >
        <Avatar sx={{ mt: 2 }}>
          <UnsubscribeIcon />
        </Avatar>
        <LoadingButton
          loading={loading}
          onClick={handleUnsubscribe}
          text={'Unsubscribe'}
        />
      </Grid>
      <Snackbar open={open} onClose={() => setOpen(false)}>
        <Alert
          onClose={() => setOpen(false)}
          severity={error ? 'error' : 'success'}
        >
          {alert}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Unsubscribe;
