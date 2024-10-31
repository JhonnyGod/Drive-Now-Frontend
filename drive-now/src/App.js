import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login/login'; 
import Home from './pages/Homepage/home'; 
import Recover from '../src/pages/PasswordForgot/recover';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recover" element={<Recover />} />
      </Routes>
    </Router>
  );
};

export default App;
