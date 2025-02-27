import React, { useEffect, useState } from 'react';
import { WalterAPI } from '../api/WalterAPI';
import { VerifyPurchaseNewsletterSubscriptionResponse } from '../api/methods/VerifyPurchaseNewsletterSubscription';
import NewsletterSubscriptionSuccessInformational from '../components/newsletter/NewsletterSubscriptionSuccessInformational';
import { Alert, Snackbar } from '@mui/material';
import LoadingCircularProgress from '../components/progress/LoadingCircularProgress';
import { useLocation } from 'react-router-dom';

const PurchaseNewsletterSubscriptionSuccessPage: React.FC = () => {
  const location = useLocation();
  const params: Readonly<URLSearchParams> = new URLSearchParams(
    location.search,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>('');
  const [openSuccessAlert, setSuccessAlert] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [openErrorAlert, setErrorAlert] = useState<boolean>(false);

  useEffect(() => {
    const sessionId = params.get('sessionId');
    if (!sessionId || sessionId === '') {
      setError('Invalid session ID!');
      setErrorAlert(true);
      return;
    }

    setLoading(true);
    WalterAPI.verifyPurchaseNewsletterSubscription(sessionId)
      .then((response: VerifyPurchaseNewsletterSubscriptionResponse) => {
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
  }, []);

  if (loading) {
    return <LoadingCircularProgress />;
  }

  return (
    <>
      <NewsletterSubscriptionSuccessInformational />
      <Snackbar open={openSuccessAlert} onClose={() => setSuccessAlert(false)}>
        <Alert onClose={() => setSuccessAlert(false)} severity="success">
          {success}
        </Alert>
      </Snackbar>
      <Snackbar open={openErrorAlert} onClose={() => setErrorAlert(false)}>
        <Alert onClose={() => setErrorAlert(false)} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PurchaseNewsletterSubscriptionSuccessPage;
