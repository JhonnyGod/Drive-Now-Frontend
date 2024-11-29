import React from "react";
import './header.css';
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/useUserStore";
import useModalStore from "../../store/useModalStore";

function Header() {  

  //TODO: Cambiar para que se vea la imagen del usuario en lugar de una imagen estática
  const navigate = useNavigate();
  const { hasSession, clearUser } = useUserStore();
  const setOpenProfile = useModalStore((state) => state.setOpenProfile);

  const goHome = () => {
    navigate('/');
  };

  const handleLogout = () => {
    clearUser();
    navigate('/home');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const openProfile = () => {
    setOpenProfile(true);
    console.log('Abriendo perfil');
  }

  return (
    <div className="main-screen">
      <header className="header">
        <div className="logo">
          <img src="https://i.ibb.co/zVPsLGf/imagen-2024-11-03-193947179-removebg-preview.png" onClick={goHome} />
        </div>

        <input type="text" className="header-input" placeholder="Buscar..." />

        <nav className="nav">
          <ul>
            <li><a href="#home">Inicio</a></li>
            <li><a href="#about">Sobre Nosotros</a></li>
            <li><a href="#services">Servicios</a></li>
            <li><a href="#contact">Contacto</a></li>
          </ul>
        </nav>

        <div className="buttonsUser">
          {hasSession() ? (
            <div className="profile-container" onClick={openProfile}>
              <button className="profile" onClick={openProfile}>
                <img className = 'profileimg' src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png" alt="" />
              </button>
              <p className="profile-text">Mi perfil</p>
            </div>
          ) : null}
          {hasSession() ? null : <button className="buttonSing" onClick={handleLogin}>Iniciar Sesión</button>}
          {hasSession() ? null : <button className="buttonSing" onClick={handleRegisterClick}>Regístrate</button>}
        </div>
      </header>
    </div>
  );
}

export default Header;