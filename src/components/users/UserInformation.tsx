import React from 'react';
import { User } from '../../api/methods/GetUser';
import { Stack, Typography } from '@mui/material';
import { formatDate } from '../../constants/Constants';
import Grid from '@mui/material/Grid2';
import styles from './UserInformation.module.scss';

interface UserInformationProps {
  user: User;
}

const UserInformation: React.FC<UserInformationProps> = (
  props: UserInformationProps,
): React.ReactElement => {
  return (
    <Grid container className={styles.UserInformation__container}>
      <Stack className={styles.UserInformation__stack}>
        <Typography className={styles.UserInformation__text}>
          <Typography className={styles.UserInformation__textBold}>
            Email:{' '}
          </Typography>
          {props.user.email}
        </Typography>
        <Typography className={styles.UserInformation__text}>
          <Typography className={styles.UserInformation__textBold}>
            Username:{' '}
          </Typography>
          {props.user.username}
        </Typography>
        <Typography className={styles.UserInformation__text}>
          <Typography className={styles.UserInformation__textBold}>
            Sign Up Date:{' '}
          </Typography>
          {formatDate(props.user.signUpDate, 'yyyy-mm-dd')}
        </Typography>
      </Stack>
    </Grid>
  );
};

export default UserInformation;
