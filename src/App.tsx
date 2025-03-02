import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import { WalterAPI } from './api/WalterAPI';
import LoadingCircularProgress from './components/progress/LoadingCircularProgress';
import {
  CHANGE_PASSWORD_PAGE,
  DASHBOARD_PAGE,
  LANDING_PAGE,
  LOGIN_PAGE,
  NEWSLETTER_PAGE,
  PORTFOLIO_PAGE,
  PURCHASE_NEWSLETTER_SUBSCRIPTION_SUCCESS_PAGE,
  REGISTER_PAGE,
  SEARCH_STOCKS_PAGE,
  SEND_CHANGE_PASSWORD_EMAIL_PAGE,
  SEND_VERIFY_EMAIL_PAGE,
  SETTINGS_PAGE,
  STOCK_PAGE,
  UNSUBSCRIBE_PAGE,
  VERIFY_EMAIL_PAGE,
} from './pages/common/Pages';
import { GetUserResponse } from './api/methods/GetUser';
import UserNotVerifiedAlert from './components/alerts/UserNotVerifiedAlert';
import SendVerifyEmail from './components/verify/SendVerifyEmail';
import NewslettersPage from './pages/NewslettersPage';
import DashboardPage from './pages/DashboardPage';
import UnsubscribePage from './pages/UnsubscribePage';
import UserNotSubscribedAlert from './components/alerts/UserNotSubscribedAlert';
import StockPage from './pages/StockPage';
import SearchStocksPage from './pages/SearchStocksPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ChangePasswordPage from './pages/ChangePasswordPage';
import SendChangePasswordEmailPage from './pages/SendChangePasswordEmailPage';
import LandingPage from './pages/LandingPage';
import { WALTER_TOKEN_NAME } from './constants/Constants';
import { getCookie } from 'typescript-cookie';
import VerifyEmailPage from './pages/VerifyEmailPage';
import SentEmailVerificationAlert from './components/alerts/SentEmailVerificationAlert';
import NoStocksInUserPortfolioAlert from './components/alerts/NoStocksInUserPortfolioAlert';
import PurchaseNewsletterSubscriptionSuccessPage from './pages/PurchaseNewsletterSubscriptionSuccessPage';
import PortfolioPage from './pages/PortfolioPage';
import SettingsPage from './pages/SettingsPage';

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [userNotVerifiedAlert, setUserNotVerifiedAlert] =
    useState<boolean>(false);
  const [userNotSubscribedAlert, setUserNotSubscribeAlert] =
    useState<boolean>(false);
  const [sentEmailVerificationAlert, setSentEmailVerificationAlert] =
    useState<boolean>(false);
  const [noStocksInUserPortfolioAlert, setNoStocksInUserPortfolioAlert] =
    useState<boolean>(false);

  useEffect((): void => {
    isUserAuthenticated();
  }, [authenticated, sentEmailVerificationAlert]);

  /**
   * Call Walter API and determine if the current user is authenticated or not.
   */
  const isUserAuthenticated = async () => {
    // early return if user authentication token is not present
    const userAuthToken: string | undefined = getCookie(WALTER_TOKEN_NAME);
    if (userAuthToken === undefined || userAuthToken === '') {
      setLoading(false);
      setAuthenticated(false);
      setUserNotVerifiedAlert(false);
      setUserNotSubscribeAlert(false);
    }

    // user authentication token is present in user cookies, call AuthUser API
    setLoading(true);
    WalterAPI.getUser()
      .then((response: GetUserResponse) => {
        setAuthenticated(response.isAuthenticated());
        setUserNotVerifiedAlert(response.isNotVerified());
        setUserNotSubscribeAlert(response.isNotSubscribed());
      })
      .catch((error: any) => setAuthenticated(false))
      .finally(() => setLoading(false));
  };

  return (
    <Router>
      <Header
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
      />
      {loading ? (
        <LoadingCircularProgress />
      ) : (
        <>
          <Routes>
            {/* UNAUTHENTICATED PAGES */}
            <Route path={LANDING_PAGE} element={<LandingPage />} />
            <Route
              path={REGISTER_PAGE}
              element={
                <SignUpPage
                  setSentEmailVerificationAlert={setSentEmailVerificationAlert}
                />
              }
            />
            <Route
              path={LOGIN_PAGE}
              element={<LoginPage setAuthenticated={setAuthenticated} />}
            />
            <Route
              path={VERIFY_EMAIL_PAGE}
              element={<VerifyEmailPage setAuthenticated={setAuthenticated} />}
            />
            <Route
              path={CHANGE_PASSWORD_PAGE}
              element={<ChangePasswordPage />}
            />
            <Route
              path={SEND_CHANGE_PASSWORD_EMAIL_PAGE}
              element={<SendChangePasswordEmailPage />}
            />
            <Route path={UNSUBSCRIBE_PAGE} element={<UnsubscribePage />} />

            {/* AUTHENTICATED PAGES */}
            <Route
              path={DASHBOARD_PAGE}
              element={
                <DashboardPage
                  authenticated={authenticated}
                  setAuthenticated={setAuthenticated}
                  setNoStocksAlert={setNoStocksInUserPortfolioAlert}
                />
              }
            />
            <Route
              path={PORTFOLIO_PAGE}
              element={
                <PortfolioPage
                  authenticated={authenticated}
                  setAuthenticated={setAuthenticated}
                />
              }
            />
            <Route
              path={NEWSLETTER_PAGE}
              element={
                <NewslettersPage
                  authenticated={authenticated}
                  setAuthenticated={setAuthenticated}
                />
              }
            />
            <Route
              path={SETTINGS_PAGE}
              element={
                <SettingsPage
                  authenticated={authenticated}
                  setAuthenticated={setAuthenticated}
                />
              }
            />
            <Route
              path={SEND_VERIFY_EMAIL_PAGE}
              element={<SendVerifyEmail />}
            />
            <Route path={STOCK_PAGE} element={<StockPage />} />
            <Route path={SEARCH_STOCKS_PAGE} element={<SearchStocksPage />} />
            <Route
              path={PURCHASE_NEWSLETTER_SUBSCRIPTION_SUCCESS_PAGE}
              element={<PurchaseNewsletterSubscriptionSuccessPage />}
            />
          </Routes>

          {/* ALERTS */}
          <UserNotVerifiedAlert
            userNotVerified={userNotVerifiedAlert}
            setUserNotVerifiedAlert={setUserNotVerifiedAlert}
          />
          <UserNotSubscribedAlert
            userNotSubscribed={userNotSubscribedAlert}
            setUserNotSubscribedAlert={setUserNotSubscribeAlert}
          />
          <SentEmailVerificationAlert
            sentEmailVerificationAlert={sentEmailVerificationAlert}
            setSentEmailVerificationAlert={setSentEmailVerificationAlert}
          />
          <NoStocksInUserPortfolioAlert
            noStocksInUserPortfolio={noStocksInUserPortfolioAlert}
            setNoStocksInUserPortfolio={setNoStocksInUserPortfolioAlert}
          />
        </>
      )}
    </Router>
  );
};

export default App;
