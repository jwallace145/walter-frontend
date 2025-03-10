import React from 'react';
import HoverableTextLink from '../text/HoverableTextLink';
import { Modal, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import LoadingButton from '../button/LoadingButton';
import { WalterAPI } from '../../api/WalterAPI';
import { UnsubscribeResponse } from '../../api/methods/Unsubscribe';
import { PurchaseNewsletterSubscriptionResponse } from '../../api/methods/PurchaseNewsletterSubscription';
import styles from './UserSubscriptionStatus.module.scss';
import { Colors, formatDate } from '../../constants/Constants';

interface UserSubscriptionStatusProps {
  subscribed: boolean;
  freeTrialEndDate: Date;
  activeStripeSubscription: boolean;
  setRefresh: (refresh: boolean) => void;
}

const UserSubscriptionStatus: React.FC<UserSubscriptionStatusProps> = (
  props: UserSubscriptionStatusProps,
): React.ReactElement => {
  const [unsubscribeLoading, setUnsubscribeLoading] =
    React.useState<boolean>(false);
  const [openUnsubscribeModal, setOpenUnsubscribeModal] =
    React.useState<boolean>(false);
  const [subscribeLoading, setSubscribeLoading] =
    React.useState<boolean>(false);
  const [openSubscribeModal, setOpenSubscribeModal] =
    React.useState<boolean>(false);

  const getStatus: (
    subscribed: boolean,
    freeTrialEndDate: Date,
    activeStripeSubscription: boolean,
  ) => React.ReactElement = (
    subscribed: boolean,
    freeTrialEndDate: Date,
    activeStripeSubscription: boolean,
  ): React.ReactElement => {
    const now: Date = new Date();

    // user is in free trial and has not yet paid to subscribe to newsletter
    if (now <= freeTrialEndDate && !activeStripeSubscription) {
      return (
        <HoverableTextLink
          text={'Currently in free trial. Click here to subscribe now.'}
          onClick={(): void => setOpenSubscribeModal(true)}
          sx={{ display: 'inline' }}
        />
      );
    }

    // user free trial has expired and user has not purchased a newsletter subscription
    if (now > freeTrialEndDate && !activeStripeSubscription) {
      return (
        <HoverableTextLink
          text={'Free trial expired! Click here to subscribe.'}
          onClick={(): void => setOpenSubscribeModal(true)}
          sx={{ display: 'inline' }}
        />
      );
    }

    // user is an active subscriber
    if (subscribed) {
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

  const getUnsubscribeModal: () => React.ReactElement = () => {
    return (
      <Modal
        open={openUnsubscribeModal}
        onClose={(): void => setOpenUnsubscribeModal(false)}
      >
        <Grid className={styles.UserSubscriptionStatus__modal}>
          <Typography className={styles.UserSubscriptionStatus_textBold}>
            Unsubscribe?
          </Typography>
          <LoadingButton
            loading={unsubscribeLoading}
            onClick={handleUnsubscribe}
            text={'Unsubscribe'}
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

  const handleUnsubscribe: () => void = (): void => {
    setUnsubscribeLoading(true);
    WalterAPI.unsubscribe()
      .then((response: UnsubscribeResponse): void => {
        if (response.isSuccess()) {
          props.setRefresh(true);
          setOpenUnsubscribeModal(false);
        }
      })
      .catch((error: Error): void => {
        console.log(error);
      })
      .finally((): void => {
        setUnsubscribeLoading(false);
      });
  };

  const getSubscribeModal: () => React.ReactElement =
    (): React.ReactElement => {
      return (
        <Modal
          open={openSubscribeModal}
          onClose={(): void => setOpenSubscribeModal(false)}
        >
          <Grid className={styles.UserSubscriptionStatus__modal}>
            <Typography className={styles.UserSubscriptionStatus_textBold}>
              Subscribe?
            </Typography>
            <LoadingButton
              loading={subscribeLoading}
              onClick={handleSubscribe}
              text={'Subscribe'}
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

  const handleSubscribe: () => void = (): void => {
    setSubscribeLoading(true);
    WalterAPI.purchaseNewsletterSubscription()
      .then((response: PurchaseNewsletterSubscriptionResponse): void => {
        if (response.isSuccess()) {
          props.setRefresh(true);
          window.location.href = response.getCheckoutUrl();
        } else {
          console.log(response.getMessage());
        }
      })
      .catch((error: Error): void => {
        console.log(error);
      })
      .finally((): void => {
        setSubscribeLoading(false);
      });
  };

  return (
    <>
      <Grid container className={styles.UserSubscriptionStatus__container}>
        <Stack
          direction="column"
          className={styles.UserSubscriptionStatus__stack}
        >
          <Typography className={styles.UserSubscriptionStatus_text}>
            <Typography className={styles.UserSubscriptionStatus_textBold}>
              Subscription Status:{' '}
            </Typography>
            {getStatus(
              props.subscribed,
              props.freeTrialEndDate,
              props.activeStripeSubscription,
            )}
          </Typography>
          <Typography className={styles.UserSubscriptionStatus_text}>
            <Typography className={styles.UserSubscriptionStatus_textBold}>
              Free Trial End Date:{' '}
            </Typography>
            {formatDate(props.freeTrialEndDate, 'yyyy-mm-dd')}
          </Typography>
        </Stack>
      </Grid>
      {openUnsubscribeModal && getUnsubscribeModal()}
      {openSubscribeModal && getSubscribeModal()}
    </>
  );
};

export default UserSubscriptionStatus;
