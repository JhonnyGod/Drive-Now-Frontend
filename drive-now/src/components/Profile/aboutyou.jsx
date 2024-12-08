// src/pages/services.jsx
import React from "react";
import Header from "../../components/header/header";
import Footer from "../../components/Footer/Footer";
import "./profile.css"; // Archivo CSS para estilos personalizados

const Services = () => {
  return (
    <div>
      <Header />
      <main className="services-main-content">
        <section className="services-container">
          <div className="services-header">
            <h2>Tu informacion</h2>
          </div>
          <section className="about-me">
            <div className="profile-card">
              <div className="avatar-container">
                <img
                  src="https://via.placeholder.com/150" // Sustituye con la URL de la imagen del usuario
                  alt="Avatar de usuario"
                  className="profile-avatar"
                />
              </div>
              <div className="profile-info">
                <h3 className="profile-name">Jhonny es mariquita de playa</h3>
                
              </div>
              <div className="profile-details">
                <p><strong>Documento:</strong> 123456789</p>
                <p><strong>Teléfono:</strong> +57 300 123 4567</p>
                <p><strong>Correo:</strong> correoquesea@gmail.com</p>
              </div>
              <div className="profile-actions">
                <button className="btn btn-edit">✏️ Editar Perfil</button>
              </div>
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
