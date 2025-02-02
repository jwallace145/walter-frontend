import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import Header from './components/header/Header';
import { WalterAPI } from './api/WalterAPI';
import { ThemeProvider } from '@mui/material';
import theme from './theme/Theme';
import LandingPage from './components/landing/LandingPage';
import LoadingCircularProgress from './components/progress/LoadingCircularProgress';
import {
  CHANGE_PASSWORD_PAGE,
  DASHBOARD_PAGE,
  LANDING_PAGE,
  LOGIN_PAGE,
  NEWSLETTER_PAGE,
  REGISTER_PAGE,
  RESET_PASSWORD_PAGE,
  SEND_VERIFY_EMAIL_PAGE,
  UNSUBSCRIBE_PAGE,
  VERIFY_EMAIL_PAGE,
} from './pages/common/Pages';
import { GetUserResponse } from './api/methods/GetUser';
import VerifyEmail from './components/verify/VerifyEmail';
import ChangePassword from './components/password/ChangePassword';
import SendChangePasswordEmail from './components/password/SendChangePasswordEmail';
import UserNotVerifiedAlert from './components/alerts/UserNotVerifiedAlert';
import SendVerifyEmail from './components/verify/SendVerifyEmail';
import NewslettersPage from './pages/NewslettersPage';
import PortfolioDashboardPage from './pages/PortfolioDashboardPage';
import UnsubscribePage from './pages/UnsubscribePage';
import UserNotSubscribedAlert from './components/alerts/UserNotSubscribedAlert';
import userNotSubscribedAlert from './components/alerts/UserNotSubscribedAlert';

/**
 * Walter App
 *
 * The web application for Walter, the market know-it-all that uses AI and the
 * latest market data to provide subscribed users with a daily newsletter about
 * their portfolio's performance.
 *
 * @constructor
 */
const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [userNotVerifiedAlert, setUserNotVerifiedAlert] =
    useState<boolean>(false);
  const [userNotSubscribedAlert, setUserNotSubscribeAlert] =
    useState<boolean>(false);

  /**
   * On component mount, check to see if the current user is authenticated or not.
   */
  useEffect(() => {
    isUserAuthenticated();
  }, [authenticated]);

  /**
   * Call Walter API and determine if the current user is authenticated or not.
   */
  const isUserAuthenticated = async () => {
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
    <ThemeProvider theme={theme}>
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
              <Route path={LANDING_PAGE} element={<LandingPage />} />
              <Route path={REGISTER_PAGE} element={<SignUp />} />
              <Route
                path={LOGIN_PAGE}
                element={<Login setAuthenticated={setAuthenticated} />}
              />
              <Route
                path={DASHBOARD_PAGE}
                element={<PortfolioDashboardPage />}
              />
              <Route path={NEWSLETTER_PAGE} element={<NewslettersPage />} />
              <Route
                path={SEND_VERIFY_EMAIL_PAGE}
                element={<SendVerifyEmail />}
              />
              <Route path={VERIFY_EMAIL_PAGE} element={<VerifyEmail />} />
              <Route path={CHANGE_PASSWORD_PAGE} element={<ChangePassword />} />
              <Route
                path={RESET_PASSWORD_PAGE}
                element={<SendChangePasswordEmail />}
              />
              <Route path={UNSUBSCRIBE_PAGE} element={<UnsubscribePage />} />
            </Routes>
            <UserNotVerifiedAlert
              userNotVerified={userNotVerifiedAlert}
              setUserNotVerifiedAlert={setUserNotVerifiedAlert}
            />
            <UserNotSubscribedAlert
              userNotSubscribed={userNotSubscribedAlert}
              setUserNotSubscribedAlert={setUserNotSubscribeAlert}
            />
          </>
        )}
      </Router>
    </ThemeProvider>
  );
};

export default App;
