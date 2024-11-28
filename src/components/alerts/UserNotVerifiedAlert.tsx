import { Alert, Snackbar } from '@mui/material';
import React from 'react';

/**
 * UserNotVerifiedAlertProps
 *
 * The props for the UserNotVerifiedAlert component which alerts
 * users with a popup notification if their email address has not
 * been successfully verified.
 */
interface UserNotVerifiedAlertProps {
  userNotVerified: boolean;
  setUserNotVerifiedAlert: (userNotVerified: boolean) => void;
}

/**
 * UserNotVerifiedAlert
 *
 * This component alerts the user with a popup notification if their
 * email address has not been successfully verified. This ensures
 * that users are aware if Walter can send their daily newsletter.
 *
 * @constructor
 */
const UserNotVerifiedAlert: React.FC<UserNotVerifiedAlertProps> = (props) => {
  return (
    <>
      <Snackbar
        open={props.userNotVerified}
        onClose={(e) => props.setUserNotVerifiedAlert(false)}
      >
        <Alert
          onClose={(e) => props.setUserNotVerifiedAlert(false)}
          severity="error"
        >
          User not verified! Please verify your email address.
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserNotVerifiedAlert;
