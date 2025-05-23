import React from 'react';
import Grid from '@mui/material/Grid2';
import { Alert, Modal, Snackbar, Stack, Typography } from '@mui/material';
import HoverableTextLink from '../text/HoverableTextLink';
import LoadingButton from '../button/LoadingButton';
import { Colors } from '../../constants/Constants';
import { WalterAPI } from '../../api/WalterAPI';
import { SendVerifyEmailResponse } from '../../api/methods/SendVerifyEmail';
import styles from './UserVerificationStatus.module.scss';

interface UserVerificationStatusProps {
  verified: boolean;
  setRefresh: (value: boolean) => void;
}

const UserVerificationStatus: React.FC<UserVerificationStatusProps> = (
  props: UserVerificationStatusProps,
): React.ReactElement => {
  const [sendVerificationEmailLoading, setSendVerificationEmailLoading] =
    React.useState<boolean>(false);
  const [openSendVerificationEmailModal, setOpenSendEmailVerificationModal] =
    React.useState<boolean>(false);
  const [openAlert, setOpenAlert] = React.useState<boolean>(false);
  const [alertMessage, setAlertMessage] = React.useState<string>('');
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);

  const getStatus: (verified: boolean) => React.ReactElement = (
    verified: boolean,
  ): React.ReactElement => {
    if (verified) {
      return (
        <Typography className={styles.UserVerificationStatus_text}>
          Verified
        </Typography>
      );
    } else {
      return (
        <HoverableTextLink
          text={'Not verified! Click here to verify'}
          onClick={(): void => setOpenSendEmailVerificationModal(true)}
          sx={{ display: 'inline' }}
        />
      );
    }
  };

  const getSendVerificationEmailModel: () => React.ReactElement =
    (): React.ReactElement => {
      return (
        <Modal
          open={openSendVerificationEmailModal}
          onClose={(): void => setOpenSendEmailVerificationModal(false)}
        >
          <Grid className={styles.UserVerificationStatus__modal}>
            <Typography className={styles.UserVerificationStatus_textBold}>
              Send Verification Email
            </Typography>
            <LoadingButton
              loading={sendVerificationEmailLoading}
              onClick={handleSendVerificationEmail}
              text={'Send'}
              sx={{
                backgroundColor: Colors.YELLOW,
                borderRadius: '40px',
                padding: '4px',
                '&:hover': {
                  backgroundColor: Colors.YELLOW_HOVER,
                },
                transition: 'background-color 0.3s ease',
                width: '40%',
              }}
            />
          </Grid>
        </Modal>
      );
    };

  const handleSendVerificationEmail: () => void = (): void => {
    setSendVerificationEmailLoading(true);
    WalterAPI.sendVerifyEmail()
      .then((response: SendVerifyEmailResponse): void => {
        console.log(response);
        const success: boolean = response.isSuccess();
        const message: string = response.getMessage();
        setIsSuccess(success);
        setAlertMessage(message);
        if (success) {
          props.setRefresh(true);
        }
      })
      .catch((error: Error): void => {
        setIsSuccess(false);
        setAlertMessage(error.message);
      })
      .finally((): void => {
        setSendVerificationEmailLoading(false);
        setOpenSendEmailVerificationModal(false);
        setOpenAlert(true);
      });
  };

  return (
    <>
      <Grid container className={styles.UserVerificationStatus__container}>
        <Stack direction="row" className={styles.UserVerificationStatus__stack}>
          <Typography className={styles.UserVerificationStatus_text}>
            <Typography className={styles.UserVerificationStatus_textBold}>
              Verification Status:{' '}
            </Typography>
            {getStatus(props.verified)}
          </Typography>
        </Stack>
      </Grid>
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={(e) => setOpenAlert(false)}
      >
        <Alert
          onClose={(e) => setOpenAlert(false)}
          severity={isSuccess ? 'success' : 'error'}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
      {openSendVerificationEmailModal && getSendVerificationEmailModel()}
    </>
  );
};

export default UserVerificationStatus;
