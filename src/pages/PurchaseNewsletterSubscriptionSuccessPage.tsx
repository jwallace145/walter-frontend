import React, { useEffect, useState } from 'react';
import { WalterAPI } from '../api/WalterAPI';
import { VerifyPurchaseNewsletterSubscriptionResponse } from '../api/methods/VerifyPurchaseNewsletterSubscription';
import NewsletterSubscriptionSuccessInformational from '../components/newsletter/NewsletterSubscriptionSuccessInformational';
import { Alert, Snackbar } from '@mui/material';
import LoadingCircularProgress from '../components/progress/LoadingCircularProgress';
import { useLocation } from 'react-router-dom';

const PurchaseNewsletterSubscriptionSuccessPage: React.FC =
  (): React.ReactElement => {
    const location = useLocation();
    const params: Readonly<URLSearchParams> = new URLSearchParams(
      location.search,
    );
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<string>('');
    const [openSuccessAlert, setSuccessAlert] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [openErrorAlert, setErrorAlert] = useState<boolean>(false);

    useEffect((): void => {
      const sessionId: string | null = params.get('sessionId');
      if (!sessionId || sessionId === '') {
        setError('Invalid session ID!');
        setErrorAlert(true);
        return;
      }

      setLoading(true);
      WalterAPI.verifyPurchaseNewsletterSubscription(sessionId)
        .then(
          (response: VerifyPurchaseNewsletterSubscriptionResponse): void => {
            if (response.isSuccess()) {
              setSuccess(response.getMessage());
              setSuccessAlert(true);
            } else {
              setError(response.getMessage());
              setErrorAlert(true);
            }
          },
        )
        .catch((error: any): void => console.log(error))
        .finally((): void => setLoading(false));
    }, []);

    if (loading) {
      return <LoadingCircularProgress />;
    }

    return (
      <>
        <NewsletterSubscriptionSuccessInformational />
        <Snackbar
          open={openSuccessAlert}
          onClose={(): void => setSuccessAlert(false)}
        >
          <Alert
            onClose={(): void => setSuccessAlert(false)}
            severity="success"
          >
            {success}
          </Alert>
        </Snackbar>
        <Snackbar
          open={openErrorAlert}
          onClose={(): void => setErrorAlert(false)}
        >
          <Alert onClose={(): void => setErrorAlert(false)} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </>
    );
  };

export default PurchaseNewsletterSubscriptionSuccessPage;
