import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import Header from './components/header/Header';
import Dashboard from './components/dashboard/Dashboard';
import Newsletter from './components/newsletter/Newsletter';
import { WalterAPI } from './api/WalterAPI';
import { ThemeProvider } from '@mui/material';
import theme from './theme/Theme';
import LandingPage from './components/landing/LandingPage';
import LoadingCircularProgress from './components/progress/LoadingCircularProgress';
import {
  DASHBOARD_PAGE,
  LANDING_PAGE,
  LOGIN_PAGE,
  NEWSLETTER_PAGE,
  REGISTER_PAGE,
  VERIFY_EMAIL_PAGE,
} from './constants/Constants';
import { GetUserResponse } from './api/GetUser';
import VerifyEmail from './components/verify/VerifyEmail';

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
      .then((response: GetUserResponse) =>
        setAuthenticated(response.isAuthenticated()),
      )
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
          <Routes>
            <Route path={LANDING_PAGE} element={<LandingPage />} />
            <Route path={REGISTER_PAGE} element={<SignUp />} />
            <Route
              path={LOGIN_PAGE}
              element={<Login setAuthenticated={setAuthenticated} />}
            />
            <Route path={DASHBOARD_PAGE} element={<Dashboard />} />
            <Route path={NEWSLETTER_PAGE} element={<Newsletter />} />
            <Route path={VERIFY_EMAIL_PAGE} element={<VerifyEmail />} />
          </Routes>
        )}
      </Router>
    </ThemeProvider>
  );
};

export default App;
