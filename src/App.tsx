import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import AddStock from './components/addstock/AddStock';
import Header from './components/header/Header';
import Dashboard from './components/dashboard/Dashboard';
import Newsletter from './components/newsletter/Newsletter';
import { WalterAPI } from './api/WalterAPI';
import { GetUserResponse } from './api/GetUser';
import {
  CircularProgress,
  Container,
  ThemeProvider,
  Typography,
} from '@mui/material';
import theme from './theme/Theme';
import Box from '@mui/material/Box';

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const isUserAuthenticated = async () => {
    setLoading(true);
    try {
      const response: GetUserResponse = await WalterAPI.getUser();
      setAuthenticated(response.isAuthenticated());
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    isUserAuthenticated();
  }, [authenticated]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
        {loading ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            textAlign="center"
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/login"
              element={<Login setAuthenticated={setAuthenticated} />}
            />
            <Route path="/addstock" element={<AddStock />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/newsletter" element={<Newsletter />} />
          </Routes>
        )}
      </Router>
    </ThemeProvider>
  );
};

export default App;
