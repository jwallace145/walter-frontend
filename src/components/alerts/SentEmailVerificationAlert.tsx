import { Alert, Snackbar } from '@mui/material';
import React from 'react';

interface EmailVerificationAlertProps {
  sentEmailVerificationAlert: boolean;
  setSentEmailVerificationAlert: (sentEmailVerificationAlert: boolean) => void;
}

const SentEmailVerificationAlert: React.FC<EmailVerificationAlertProps> = (
  props: EmailVerificationAlertProps,
) => {
  return (
    <>
      <Snackbar
        open={props.sentEmailVerificationAlert}
        onClose={(e) => props.setSentEmailVerificationAlert(false)}
      >
        <Alert
          onClose={(e) => props.setSentEmailVerificationAlert(false)}
          severity="success"
        >
          Sent verification email!
        </Alert>
      </Snackbar>
    </>
  );
};

export default SentEmailVerificationAlert;
