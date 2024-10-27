import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import AddStock from './components/addstock/AddStock';
import Header from './components/header/Header';
import Dashboard from './components/dashboard/Dashboard';
import Newsletter from './components/newsletter/Newsletter';

function App() {
  return (
    <Router>
      <Header />
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
