// routes.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Homepage/home';
import { Login } from '../pages/Login/login';
import Recover from '../pages/PasswordForgot/recover';


const RoutesComponent: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Recover />} />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;
