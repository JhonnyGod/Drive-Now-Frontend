import React, { useState, useEffect } from 'react';
import './login.css';
import profileImage from '../../Assets/Profile.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../components/alert.css';


export const Login = () => {
  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertClass, setAlertClass] = useState('');
  const navigate = useNavigate();


  //TODO: Hay que modificar los status de la respuesta en el backend, y dado cada uno de ellas agregar al front mensajes de error para cada uno
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginRequest = await axios.post('http://localhost:3000/usuario/login', { //* Solicitud HTTP a la URL local del backend
        email: email,
        password: password,
      });

      if (loginRequest.status != 200) { //*Si el Estado es diferente de OK, devolver un mensaje de error
        console.log('Inicio de sesión fallido');
        setAlertMessage('Inicio de sesión fallido, verifica tus credenciales.');
        showAlertWithAnimation();
      }

      const data = loginRequest.data//* Tomo la información del usuario que me devuelve el backend

      if (data.user && data.user.email && data.user.id_user && data.user.token) {
        const userData = {
          user_id: data.user.id_user,
          username: data.user.username,
          email: data.user.email,
          token: data.user.token,
        };

        console.log("userData:", userData);

        setUser(userData); //*Guardo la información del usuario en el estado de React

        const { token, ...userDataWithoutToken } = userData;

        localStorage.setItem('userData', JSON.stringify(userDataWithoutToken)); //* La guardo en el Almacenamiento del navegador

        navigate('/home'); //*Navegar a la página de inicio
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setAlertMessage('Inicio de sesión fallido, verifica tus credenciales.');
      showAlertWithAnimation();
    }
  };

  const forgotPasswordRecover = async (e) => {

    e.preventDefault();
    navigate('/recover');
  }
  const showAlertWithAnimation = () => {
    setShowAlert(true);
    setAlertClass('alert-fall');

    setTimeout(() => {
      setAlertClass('alert-rise');


      setTimeout(() => {
        setShowAlert(false);
        setAlertClass('');
      }, 500);
    }, 3000);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <div className="profile-image-container">
          <img src={profileImage} alt="Perfil" className="profile-image" />
        </div>
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
        <div className="link">
          <div className="forgot-password">
            <a href="#" className="forgot-password-link" onClick={forgotPasswordRecover}>¿Olvidaste tu contraseña?</a>
          </div>
          <div className="register">
            <a href="#" className="register-link">¿No tienes una cuenta?</a>
          </div>
        </div>
        {showAlert && (
          <div className={`alert ${alertClass}`}>
            <p>{alertMessage}</p>
          </div>
        )}
      </form>
    </div>
  );
};
