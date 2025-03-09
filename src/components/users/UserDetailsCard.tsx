import React from 'react';
import { formatDate } from '../../constants/Constants';
import { Modal, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { User } from '../../api/methods/GetUser';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { WalterAPI } from '../../api/WalterAPI';
import { UnsubscribeResponse } from '../../api/methods/Unsubscribe';
import { SendVerifyEmailResponse } from '../../api/methods/SendVerifyEmail';
import styles from './UserDetailsCard.module.scss';
import LoadingButton from '../button/LoadingButton';
import HoverableTextLink from '../text/HoverableTextLink';

interface UserDetailsCardProps {
  user: User;
}

const UserDetailsCard: React.FC<UserDetailsCardProps> = (
  props: UserDetailsCardProps,
): React.ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const [openSubscribeModal, setOpenSubscribeModal] = React.useState(false);
  const [unsubscribeLoading, setUnsubscribeLoading] = React.useState(false);
  const [openUnsubscribeModal, setOpenUnsubscribeModal] = React.useState(false);
  const [sendVerificationEmailLoading, setSendVerificationEmailLoading] =
    React.useState(false);
  const [openSendVerificationEmailModal, setOpenSendVerificationEmailModal] =
    React.useState(false);

  const getSubscriptionStatus: () => React.ReactElement =
    (): React.ReactElement => {
      if (props.user.subscribed) {
        return (
          <HoverableTextLink
            text={'Subscribed! Click here to unsubscribe'}
            onClick={(): void => setOpenUnsubscribeModal(true)}
            sx={{ display: 'inline' }}
          />
        );
      } else {
        return (
          <HoverableTextLink
            text={'Not subscribed! Click here to subscribe'}
            onClick={(): void => setOpenSubscribeModal(true)}
            sx={{ display: 'inline' }}
          />
        );
      }
    };

  const getVerificationStatus: () => React.ReactElement =
    (): React.ReactElement => {
      if (props.user.verified) {
        return (
          <Typography className={styles.UserDetailsCard_body}>
            Verified
          </Typography>
        );
      } else {
        return (
          <HoverableTextLink
            text={'Not verified! Click here to verify'}
            onClick={(): void => setOpenSendVerificationEmailModal(true)}
            sx={{ display: 'inline' }}
          />
        );
      }
    };

  const getSendVerificationEmailModal: () => React.ReactElement = () => {
    return (
      <Modal
        open={openSendVerificationEmailModal}
        onClose={(): void => setOpenSendVerificationEmailModal(false)}
      >
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
          }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>
            Send Verification Email
          </Typography>
          <LoadingButton
            loading={unsubscribeLoading}
            onClick={handleSendVerificationEmail}
            text={'Send'}
          />
        </Grid>
      </Modal>
    );
  };

  const handleSendVerificationEmail: () => void = (): void => {
    setSendVerificationEmailLoading(true);
    WalterAPI.sendVerifyEmail()
      .then((response: SendVerifyEmailResponse): void => {
        setOpenSendVerificationEmailModal(false);
      })
      .catch((error: Error): void => console.log(error))
      .finally((): void => {
        setSendVerificationEmailLoading(false);
      });
  };

  const getUnsubscribeModal: () => React.ReactElement = () => {
    return (
      <Modal
        open={openUnsubscribeModal}
        onClose={(): void => setOpenUnsubscribeModal(false)}
      >
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
          }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>Unsubscribe?</Typography>
          <LoadingButton
            loading={unsubscribeLoading}
            onClick={handleUnsubscribe}
            text={'Logout'}
            sx={{}}
          />
        </Grid>
      </Modal>
    );
  };

  const handleUnsubscribe: () => void = (): void => {
    setUnsubscribeLoading(true);
    WalterAPI.unsubscribe()
      .then((response: UnsubscribeResponse): void => {
        setOpenUnsubscribeModal(false);
      })
      .catch((error: Error): void => {
        console.log(error);
      })
      .finally((): void => {
        setUnsubscribeLoading(false);
      });
  };

  return (
    <>
      <Grid container className={styles.UserDetailsCard__container}>
        <Stack className={styles.UserDetailsCard__stack}>
          <Typography className={styles.UserDetailsCard_body}>
            <Typography className={styles.UserDetailsCard_body_bold}>
              Email:{' '}
            </Typography>
            {props.user.email}
          </Typography>
          <Typography className={styles.UserDetailsCard_body}>
            <Typography className={styles.UserDetailsCard_body_bold}>
              Username:{' '}
            </Typography>
            {props.user.username}
          </Typography>
          <Typography className={styles.UserDetailsCard_body}>
            <Typography className={styles.UserDetailsCard_body_bold}>
              Sign Up Date:{' '}
            </Typography>
            {formatDate(props.user.signUpDate, 'yyyy-mm-dd')}
          </Typography>
          <Typography className={styles.UserDetailsCard_body}>
            <Typography className={styles.UserDetailsCard_body_bold}>
              Subscription Status:{' '}
            </Typography>
            {getSubscriptionStatus()}
          </Typography>
          <Typography className={styles.UserDetailsCard_body}>
            <Typography className={styles.UserDetailsCard_body_bold}>
              Verification Status:{' '}
            </Typography>
            {getVerificationStatus()}
          </Typography>
        </Stack>
      </Grid>
      {openUnsubscribeModal && getUnsubscribeModal()}
      {openSendVerificationEmailModal && getSendVerificationEmailModal()}
    </>
  );
};

export default UserDetailsCard;
