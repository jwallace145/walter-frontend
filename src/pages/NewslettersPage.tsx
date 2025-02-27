import { WalterAPI } from '../api/WalterAPI';
import React, { useState } from 'react';
import { SendNewsletterResponse } from '../api/methods/SendNewsletter';
import { UnsubscribeResponse } from '../api/methods/Unsubscribe';
import { SubscribeResponse } from '../api/methods/Subscribe';
import LoadingButton from '../components/button/LoadingButton';
import { Alert, Avatar, Box, Link, Snackbar } from '@mui/material';
import Grid from '@mui/material/Grid2';
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import { SEND_VERIFY_EMAIL_PAGE } from './common/Pages';
import { PurchaseNewsletterSubscriptionResponse } from '../api/methods/PurchaseNewsletterSubscription';
import { loadStripe, Stripe } from '@stripe/stripe-js';

/**
 * Newsletters Page
 *
 * The Newsletters page allows the user to subscribe and unsubscribe to/from Walter's newsletter
 * after verification and send emails on-demand.
 *
 * @constructor
 */
const NewslettersPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>('');
  const [openSuccessAlert, setSuccessAlert] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [openErrorAlert, setErrorAlert] = useState<boolean>(false);

  /**
   * Handle the user subscribing to Walter's newsletter.
   *
   * @param event
   */
  const handleSubscribe = (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);
    WalterAPI.subscribe()
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

  /**
   * Handle the user unsubscribing from Walter's newsletter.
   *
   * @param event
   */
  const handleUnsubscribe = (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);
    WalterAPI.unsubscribe()
      .then((response: UnsubscribeResponse) => {
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

  /**
   * Handle sending a newsletter on-demand to current user.
   *
   * @param event
   */
  const handleSendNewsletter = (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);
    WalterAPI.sendNewsletter()
      .then((response: SendNewsletterResponse) => {
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

  const handlePurchase = async (event: React.FormEvent) => {
    event.preventDefault();

    const stripe: Stripe | null = await loadStripe(
      'pk_test_51QwECvQMqNHwv625BtmYcO7aMcPZmw7pn6WYadT9IYy1zzdtUvQQGkOKfvIlqBXBsSs3dgZkKtXPgVWDKR8LyLpt00EMsyuzxM',
    );

    setLoading(true);
    WalterAPI.purchaseNewsletterSubscription().then(
      (response: PurchaseNewsletterSubscriptionResponse) => {
        if (response.isSuccess()) {
          stripe?.redirectToCheckout({
            sessionId: response.getCheckoutSessionId(),
          });
        } else {
          setError(response.getMessage());
          setErrorAlert(true);
        }
      },
    );
  };

  /**
   * Handle closing the snack bar notifications.
   */
  const handleClose = () => {
    setSuccessAlert(false);
    setErrorAlert(false);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Grid
        container
        size={12}
        spacing={2}
        direction="column"
        alignItems="center"
        sx={{
          padding: 2,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
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
            <ScheduleSendIcon />
          </Avatar>
          <LoadingButton
            loading={loading}
            onClick={handleSendNewsletter}
            text={'Send Newsletter'}
          />
          <Link
            href={SEND_VERIFY_EMAIL_PAGE}
            variant="body2"
            sx={{
              display: 'inline-block',
              fontSize: '0.875rem',
              color: 'text.secondary',
              textDecoration: 'none',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            Verify Email?
          </Link>
        </Grid>
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
            <MarkEmailReadIcon />
          </Avatar>
          <LoadingButton
            loading={loading}
            onClick={handleSubscribe}
            text={'Subscribe'}
          />
        </Grid>
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
            onClick={handlePurchase}
            text={'Purchase'}
          />
        </Grid>
      </Grid>
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
    </Box>
  );
};

export default NewslettersPage;
