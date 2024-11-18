import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login/login';
import Home from './pages/Homepage/home';
import Recover from '../src/pages/PasswordForgot/recover';
import Register from '../src/pages/Register/register';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/Home" element={<Home />} />
          <Route path="/recover" element={<Recover />} />
          
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    </Router>
  );
};

export default App;
