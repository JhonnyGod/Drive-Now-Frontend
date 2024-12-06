// src/pages/About.jsx
import React from "react";
import Header from "../../components/header/header";
import Footer from "../../components/Footer/Footer";
import './homeedition.css';

const About = () => {
  return (
    <div>
      <Header />
      <main className="about-main-content">
        <section className="about-container">
          <div className="about-header">
            <h2>Sobre Nosotros</h2>
            <p>
              Bienvenido a nuestra plataforma de alquiler de vehículos, donde la innovación, la comodidad y la calidad
              se combinan para ofrecerte una experiencia única.
            </p>
          </div>

          <div className="about-content">
            <section className="about-section">
              <h3>Nuestra Misión</h3>
              <p>
                En nuestra empresa, nos dedicamos a revolucionar la forma en que las personas alquilan vehículos.
                Garantizamos acceso rápido y seguro a una amplia gama de opciones, desde carros y camionetas hasta motos
                y vehículos acuáticos, todo desde la comodidad de tu hogar.
              </p>
            </section>

            <section className="about-section">
              <h3>Nuestro Compromiso</h3>
              <p>
                Nos enfocamos en brindar una experiencia de usuario excepcional, con una plataforma fácil de usar y un
                servicio confiable. Nuestro sistema de entrega a la puerta asegura que el vehículo alquilado llegue a tu
                ubicación de manera rápida y eficiente.
              </p>
            </section>

            <section className="about-section">
              <h3>Innovación</h3>
              <p>
                Ofrecemos un sistema totalmente en línea. Desde la selección del vehículo hasta el pago y la confirmación,
                todo se realiza directamente en nuestra página web, redefiniendo la experiencia de alquiler.
              </p>
            </section>

            <section className="about-section">
              <h3>Variedad de Vehículos</h3>
              <p>Incluimos opciones como:</p>
              <ul>
                <li>Carros y camionetas para viajes familiares o de negocios</li>
                <li>Motos para desplazamientos rápidos</li>
                <li>Vehículos acuáticos para aventuras en el agua</li>
                <li>Vehículos deportivos para experiencias únicas</li>
              </ul>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
