import './register.css';
import image from '../../Assets/fondo.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptEmails, setAcceptEmails] = useState(false);
  const navigate = useNavigate();

  const login_return = async (e) => {
    e.preventDefault();
    navigate('/');
  }


  //TODO: Crear la lógica para el registro de usuario y ajustar el diseño de esta vista
  return (
    <>
      <div className="registro-container">
        <div className="imagen-lateral">
          <img src={'https://cdn.dribbble.com/users/992933/screenshots/4608688/media/f046153ea09fd6e833184c5cd209aee9.gif'} alt="Persona en coche" />
          <h2 className='overlay-text'>Bienvenido a Drive Now!🚗</h2>
          <h1 className='presentation'>Regístrate para acceder a nuestros servicios.</h1>
        </div>
        <div className="formulario-registro">
          <h2>Registro de usuario</h2>
          <form>
            <input className="username" type="text" placeholder="Ingrese su nombre de usuario" />
            <div className="name">
              <input className="Nombre" type="text" placeholder="Ingrese su nombre" />
              <input className="Apellido" type="text" placeholder="Ingrese su apellido" />
            </div>
            <input className="email_register" type="email" placeholder="Ingrese su correo" />
            <div className="contraseñas">
              <input className="contra" type="password" placeholder="Ingrese una contraseña" />
              <input className="Recontra" type="password" placeholder="Confirma tu contraseña" />
            </div>
            <input className="documento" type="text" placeholder="Ingrese numero de identificación" />
            <input className="telefono" type="text" placeholder="Ingrese su número de teléfono" />
            <div className="checkbox-container">
              <label>
                <div className={`toggle-button ${acceptTerms ? 'active' : ''}`} onClick={() => setAcceptTerms(prev => !prev)}>
                  <div className="toggle-switch" />
                </div>
                Acepto términos y condiciones
              </label>
              <label>
                <div className={`toggle-button ${acceptEmails ? 'active' : ''}`} onClick={() => setAcceptEmails(prev => !prev)}>
                  <div className="toggle-switch" />
                </div>
                Acepto el envío de información a través de correos
              </label>
            </div>
            <button className="Registrar" type="submit">Registrar</button>
            <div className="return_login">
              <a href="#" className="Regreso" onClick={login_return} > ¿Ya tienes cuenta? </a>
            </div>
          </form>
        </div>
      </div>
    </>
  )
};

export default Register;