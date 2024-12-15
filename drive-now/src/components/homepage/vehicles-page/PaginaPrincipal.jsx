import React, { useState, useRef, useEffect } from 'react';
import './styles.css';
import VehiculoModal from './vehicles-modal/modal';
import useModalStore from '../../../store/useModalStore';
import Profile from '../../Profile/profile';
import { useLocation } from 'react-router-dom';

const Modal = ({ vehiculo, onClose }) => {
  return vehiculo ? <VehiculoModal vehiculo={vehiculo} onClose={onClose} /> : null;
};

const colorMap = {
  rojo: 'red',
  azul: 'blue',
  verde: 'green',
  amarillo: 'yellow',
  blanco: 'white',
  negro: 'black',
  gris: 'gray',
  //? Se pueden añadir mas colores, incluso con rgb
};

const PaginaPrincipal = ({ vehiculos }) => {
  const [selectedVehiculo, setSelectedVehiculo] = useState(null);
  const openProfile = useModalStore((state) => state.openProfile);
  const setOpenProfile = useModalStore((state) => state.setOpenProfile);
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  const carsRef = useRef(null);
  const camionetasRef = useRef(null);
  const motosRef = useRef(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get('paymentSuccess') === 'true') {
      setShowModal(true);
    }
  }, [location]);

  const handleScroll = (direction, type) => {
    const container = type === 'cars' ? carsRef.current : type === 'camionetas' ? camionetasRef.current : motosRef.current;
    const scrollAmount = 300;

    if (container) {
      if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else if (direction === 'right') {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const openModal = (vehiculo) => {
    console.log(vehiculo)
    setSelectedVehiculo(vehiculo);
  };

  const closeModal = () => {
    setSelectedVehiculo(null);
  };

  const closeProfileModal = () => {
    setOpenProfile(false);
  };

  const openProfileModal = () => {
    setOpenProfile(true);
  };

  return (
    <div className="page-container">
      <main className="main-content">
        <h2 className="main-title">Nuestros vehículos</h2>

        {/* Sección de carros */}
        <section className='cars-grid'>
          <h1 className='cars-section-title'>Carros</h1>
          <div className="vehicles-wrapper">
            <button className="scroll-button left" onClick={() => handleScroll('left', 'cars')}>❮</button>
            <div className="cars-space" ref={carsRef}>
              {vehiculos.filter(vehiculo => vehiculo.tipovehiculo === "Coche").map((vehiculo) => (
                <div key={vehiculo.idvehiculo} className="vehicle-item">
                  <div className="vehicle-card">
                    <img src={vehiculo.image_src} alt={vehiculo.nombre} className="vehicle-image" />
                    <div className="vehicle-info">
                      <h2 className="vehicle-title">{vehiculo.nombre}</h2>
                      <ul className="vehicle-features">
                        <li>Tipo: {vehiculo.tipovehiculo}</li>
                        <li>Marca: {vehiculo.marca}</li>
                        <li style={{ listStyleType: 'none' }}>
                          <div className='text-color-card'>Color {vehiculo.color}</div>
                          <span
                            className="color-bubble-card"
                            style={{ backgroundColor: colorMap[vehiculo.color.toLowerCase()] || 'gray' }}>
                          </span>

                        </li>
                      </ul>
                      <button
                        className="details-button"
                        onClick={() => openModal(vehiculo)}
                      >
                        Ver detalles
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="scroll-button right" onClick={() => handleScroll('right', 'cars')}>❯</button>
          </div>
        </section>

        {/* Sección de camionetas */}
        <section className='camioneta-grid'>
          <h1 className='camioneta-section-title'>Camionetas</h1>
          <div className="vehicles-wrapper">
            <button className="scroll-button left" onClick={() => handleScroll('left', 'camionetas')}>❮</button>
            <div className="camionetas-space" ref={camionetasRef}>
              {vehiculos.filter(vehiculo => vehiculo.tipovehiculo === "Camioneta").map((vehiculo) => (
                <div key={vehiculo.idvehiculo} className="vehicle-item">
                  <div className="vehicle-card">
                    <img src={vehiculo.image_src} alt={vehiculo.nombre} className="vehicle-image" />
                    <div className="vehicle-info">
                      <h2 className="vehicle-title">{vehiculo.nombre}</h2>
                      <ul className="vehicle-features">
                        <li>Tipo: {vehiculo.tipovehiculo}</li>
                        <li>Marca: {vehiculo.marca}</li>
                        <li style={{ listStyleType: 'none' }}>
                          <div className='text-color-card'>Color {vehiculo.color}</div>
                          <span
                            className="color-bubble-card"
                            style={{ backgroundColor: colorMap[vehiculo.color.toLowerCase()] || 'gray' }}>
                          </span>
                        </li>
                      </ul>
                      <button
                        className="details-button"
                        onClick={() => openModal(vehiculo)}
                      >
                        Ver detalles
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="scroll-button right" onClick={() => handleScroll('right', 'camionetas')}>❯</button>
          </div>
        </section>

        {/* Sección de motos */}
        <section className='moto-grid'>
          <h1 className='moto-section-title'>Motos</h1>
          <div className="vehicles-wrapper">
            <button className="scroll-button left" onClick={() => handleScroll('left', 'motos')}>❮</button>
            <div className="motos-space" ref={motosRef}>
              {vehiculos.filter(vehiculo => vehiculo.tipovehiculo === "Moto").map((vehiculo) => (
                <div key={vehiculo.idvehiculo} className="vehicle-item">
                  <div className="vehicle-card">
                    <img src={vehiculo.image_src} alt={vehiculo.nombre} className="vehicle-image" />
                    <div className="vehicle-info">
                      <h2 className="vehicle-title">{vehiculo.nombre}</h2>
                      <ul className="vehicle-features">
                        <li>Tipo: {vehiculo.tipovehiculo}</li>
                        <li>Marca: {vehiculo.marca}</li>
                        <li style={{ listStyleType: 'none' }}>
                          <div className='text-color-card'>Color {vehiculo.color}</div>
                          <span
                            className="color-bubble-card"
                            style={{ backgroundColor: colorMap[vehiculo.color.toLowerCase()] || 'gray' }}>
                          </span>
                        </li>
                      </ul>
                      <button
                        className="details-button"
                        onClick={() => openModal(vehiculo)}
                      >
                        Ver detalles
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="scroll-button right" onClick={() => handleScroll('right', 'motos')}>❯</button>
          </div>
        </section>

      </main>
      <Modal vehiculo={selectedVehiculo} onClose={closeModal} />
      {openProfile && <Profile isOpen={openProfile} onClose={closeProfileModal} />}
      <footer></footer>
    </div>
  );
};

export default PaginaPrincipal;
