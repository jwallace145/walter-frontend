import { Alert, Snackbar } from '@mui/material';
import React from 'react';

/**
 * UserNotSubscribedAlertProps
 *
 * The props for the user unsubscribed alert.
 */
interface UserNotSubscribedAlertProps {
  userNotSubscribed: boolean;
  setUserNotSubscribedAlert: (userNotSubscribed: boolean) => void;
}

/**
 * UserNotSubscribedAlert
 *
 * This component alerts the user with a popup notification if
 * they are not subscribed to Walter's newsletter. This ensures
 * that users are encouraged to subscribe and actually reap the
 * benefit of Walter, daily portfolio emails.
 *
 * @param props
 * @constructor
 */
const UserNotSubscribedAlert: React.FC<UserNotSubscribedAlertProps> = (
  props,
) => {
  return (
    <>
      <Snackbar
        open={props.userNotSubscribed}
        onClose={(e) => props.setUserNotSubscribedAlert(false)}
      >
        <Alert
          onClose={(e) => props.setUserNotSubscribedAlert(false)}
          severity="warning"
        >
          User not subscribed! Subscribe to the newsletter for daily portfolio
          updates.
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserNotSubscribedAlert;
