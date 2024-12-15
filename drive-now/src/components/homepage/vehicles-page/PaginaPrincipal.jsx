import React, { useState, useRef, useEffect } from 'react';
import { FaCar, FaTruck, FaMotorcycle, FaPaintBrush, FaCogs } from 'react-icons/fa';
import VehiculoModal from './vehicles-modal/modal';
import useModalStore from '../../../store/useModalStore';
import Profile from '../../Profile/profile';
import { useLocation } from 'react-router-dom';
import './styles.css';

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
};

const VehicleCard = ({ vehiculo, openModal }) => (
  <div className="vehicle-card">
    <img src={vehiculo.image_src} alt={vehiculo.nombre} className="vehicle-image" />
    <div className="vehicle-info">
      <h2 className="vehicle-title">{vehiculo.nombre}</h2>
      <div className="vehicle-features">
        <div className="feature">
          <FaCar />
          <span>{vehiculo.tipovehiculo}</span>
        </div>
        <div className="feature">
          <FaCogs />
          <span>{vehiculo.marca}</span>
        </div>
        <div className="feature">
          <FaPaintBrush />
          <span>{vehiculo.color}</span>
          <span
            className="color-bubble"
            style={{ backgroundColor: colorMap[vehiculo.color.toLowerCase()] || 'gray' }}
          ></span>
        </div>
        <div className="vehicle-price">
          <span className="vehicle-price-label">Valor de alquiler:</span>
          <span className="vehicle-price-value">${vehiculo.valor_dia.toFixed(2)}</span>
        </div>
      </div>
      <button className="details-button" onClick={() => openModal(vehiculo)}>
        Ver detalles
      </button>
    </div>
  </div>
);

const VehicleSection = ({ title, vehicles, icon, openModal }) => {
  const sectionRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (direction) => {
    const container = sectionRef.current;
    const scrollAmount = container.offsetWidth; // Medimos el ancho del contenedor para hacer scroll proporcional.
    const totalItems = vehicles.length;
    const visibleItems = Math.floor(container.offsetWidth / scrollAmount); // Items visibles en la pantalla.

    let newIndex = currentIndex;

    if (direction === 'left') {
      // Desplazar hacia la izquierda: retrocedemos, o si estamos en el primer índice, vamos al último
      newIndex = (newIndex - 1 + totalItems) % totalItems;
    } else if (direction === 'right') {
      // Desplazar hacia la derecha: avanzamos, o si estamos en el último índice, volvemos al primero
      newIndex = (newIndex + 1) % totalItems;
    }

    setCurrentIndex(newIndex);

    container.scrollTo({
      left: newIndex * scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="vehicle-section">
      <h1 className="section-title">
        {icon}
        {title}
      </h1>
      <div className="vehicles-wrapper">
        <button className="scroll-button left" onClick={() => handleScroll('left')}>
          ❮
        </button>
        <div className="vehicles-container" ref={sectionRef}>
          {vehicles.map((vehiculo) => (
            <VehicleCard key={vehiculo.idvehiculo} vehiculo={vehiculo} openModal={openModal} />
          ))}
        </div>
        <button className="scroll-button right" onClick={() => handleScroll('right')}>
          ❯
        </button>
      </div>
    </section>
  );
};

const PaginaPrincipal = ({ vehiculos }) => {
  const [selectedVehiculo, setSelectedVehiculo] = useState(null);
  const openProfile = useModalStore((state) => state.openProfile);
  const setOpenProfile = useModalStore((state) => state.setOpenProfile);
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get('paymentSuccess') === 'true') {
      setShowModal(true);
    }
  }, [location]);

  const openModal = (vehiculo) => {
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

  const carros = vehiculos.filter((vehiculo) => vehiculo.tipovehiculo === 'Coche');
  const camionetas = vehiculos.filter((vehiculo) => vehiculo.tipovehiculo === 'Camioneta');
  const motos = vehiculos.filter((vehiculo) => vehiculo.tipovehiculo === 'Moto');

  return (
    <div className="page-container">
      <main className="main-content">
        <h2 className="main-title">Nuestros vehículos</h2>

        <VehicleSection title="Carros" vehicles={carros} icon={<FaCar />} openModal={openModal} />
        <VehicleSection title="Camionetas" vehicles={camionetas} icon={<FaTruck />} openModal={openModal} />
        <VehicleSection title="Motos" vehicles={motos} icon={<FaMotorcycle />} openModal={openModal} />
      </main>
      <Modal vehiculo={selectedVehiculo} onClose={closeModal} />
      {openProfile && <Profile isOpen={openProfile} onClose={closeProfileModal} />}
      <footer></footer>
    </div>
  );
};

export default PaginaPrincipal;
