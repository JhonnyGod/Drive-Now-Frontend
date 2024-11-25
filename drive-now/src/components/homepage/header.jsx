import React from "react";
import './header.css'
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/useUserStore";

function Header() {
  const navigate = useNavigate();

  const { hasSession, clearUser } = useUserStore();

  const openProfile = () => {
    console.log("Abriendo perfil")
  }

  const goHome = () => {
    navigate('/');
  }

  const handlelogout = () => {
    clearUser();
    navigate('/home');
  }

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    navigate('/login');
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
          {hasSession() ? <div className="profile-container"> <button className="profile" onClick={openProfile}></button><p className="profile-text">Mi perfil</p></div> : null}
          {hasSession() ? null : <button className="buttonSing" onClick={handleLogin}>Iniciar Sesión</button>}
          {hasSession() ? null : <button className="buttonSing" onClick={handleRegisterClick}>Regístrate</button>}
        </div>
      </header>
    </div>
  );

}
export default Header;





