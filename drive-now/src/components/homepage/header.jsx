import React from "react";
import './header.css'
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/'); 
  }

  const handleRegisterClick = () => {
    navigate('/register'); // Navega a la ruta /register
  };

  const handleLogin = () => {
    navigate('/Login'); // Navega a la ruta /login
  };

  return (
    <div className="main-screen">
      <header className="header">
        <div className="logo">
          <img src="https://i.ibb.co/zVPsLGf/imagen-2024-11-03-193947179-removebg-preview.png" onClick={goHome} /> {/*lUEGO SE CAMBIA DEJALO ASI POR MIENTRAS*/}
        </div>

        <input type="text" className="header-input" placeholder="Buscar..."></input>

        <nav className="nav">
          <ul>
            <li><a href="#home">Inicio</a></li>
            <li><a href="#about">Sobre Nosotros</a></li>
            <li><a href="#services">Servicios</a></li>
            <li><a href="#contact">Contacto</a></li>
          </ul>
        </nav>

        <div className="buttonsUser">
          <button className="buttonLogin" onClick={handleLogin}>Iniciar sesión</button>
          <button className="buttonSing" onClick={handleRegisterClick}>Regístrate</button>
        </div>
      </header>
    </div>
  );

}
export default Header;





