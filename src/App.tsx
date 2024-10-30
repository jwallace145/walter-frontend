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

function App() {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    WalterAPI.getUser().then((response: GetUserResponse) => {
      setAuthenticated(response.isSuccess());
    });
  }, []);

  return (
    <Router>
      <Header authenticated={authenticated} />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addstock" element={<AddStock />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/newsletter" element={<Newsletter />} />
      </Routes>
    </Router>
  );
}

export default App;
