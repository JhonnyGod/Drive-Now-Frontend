import React, { useState } from 'react';
import './login.css';
import profileImage from '../../Assets/Profile.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../components/alert.css';
import { Alert } from '../../components/alert';
import { CSSTransition } from 'react-transition-group';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginRequest = await axios.post('http://localhost:3000/usuario/login', {
        email: email,
        password: password,
      });

      if (loginRequest.status === 200) {
        console.log('Inicio de sesión exitoso');
        console.log(loginRequest.data);
        navigate('/home');
      }
      else {
        console.log('Inicio de sesión fallido, verifica tus credenciales.');
        setAlertMessage('Inicio de sesión fallido, verifica tus credenciales.');
        setTimeout(() => {
          setAlertMessage('');
        }, 3000);

      }

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setAlertMessage('Inicio de sesión fallido, verifica tus credenciales.'); // Mostrar alerta
      setTimeout(() => {
        setAlertMessage('');
      }, 3000);

    }

  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="title">Iniciar Sesión</h2>
        <div className="input-group">
          <label htmlFor="email" className="label">Email</label>
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
          <label htmlFor="password" className="label">Contraseña</label>
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
        <button type="submit" className="button">Iniciar</button>
        

        <CSSTransition
          in={!!alertMessage}
          timeout={5000}
          classNames={{
            enter: 'alert-enter',
            enterActive: 'alert-enter-active',
            exit: 'alert-exit',
            exitActive: 'alert-exit-active',
          }}
          unmountOnExit
        >
          <div className="alert">
            <p>{alertMessage}</p>
          </div>
        </CSSTransition>
      </form>
    </div>
  );
};
