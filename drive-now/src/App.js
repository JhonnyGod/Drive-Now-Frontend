import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login/login';
import Home from './pages/Homepage/home';
import Recover from '../src/pages/PasswordForgot/recover';
import Register from '../src/pages/Register/register';
import Settings from '../src/pages/Settings/settings';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/recover" element={<Recover />} />
          <Route path="/register" element={<Register />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
    </Router>
  );
};

export default App;
