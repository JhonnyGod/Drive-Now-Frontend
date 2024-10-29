import React, { useState } from 'react';
import './login.css';
import profileImage from '../../Assets/Profile.jpg';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Iniciar sesión con:', email, password);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
      <div className="profile-image-container">
          <img src={profileImage} alt="Perfil" className="profile-image" />
        </div>
        <h2 className="title">Iniciar Sesión</h2>
        <div className="input-group">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
            placeholder="Ingresa tu correo"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password" className="label">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
            placeholder="Ingresa tu contraseña"
          />
        </div>
        <button type="submit" className="button">
          Iniciar
        </button>
        <div className="link">
          <div className="forgot-password">
            <a href="#" className="forgot-password-link">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <div className="register">
            <a href="#" className="register-link">
              ¿No tienes una cuenta?
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
