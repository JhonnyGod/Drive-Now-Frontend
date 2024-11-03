import React from "react";
import './header.css'
import { useNavigate } from "react-router-dom";



function Header() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register'); // Navega a la ruta /register
  };

  const handleLogin = () => {
    navigate('/Login'); // Navega a la ruta /login
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" alt="Logo" /> {/* aqui va la ruta del logo*/}
        <h1>Drive Now</h1>
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
        <button className="buttonLogin" onClick={handleLogin}>Login</button>
        <button className="buttonSing" onClick={handleRegisterClick}>Sing up</button>
      </div>
      
    </header>
  );

}
export default Header;





