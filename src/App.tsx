import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import AddStock from './components/addstock/AddStock';
import Header from './components/header/Header';
import GetPortfolio from './components/getporfolio/GetPortfolio';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addstock" element={<AddStock />} />
        <Route path="/getstocksforuser" element={<GetPortfolio />} />
      </Routes>
    </Router>
  );
}

export default App;
