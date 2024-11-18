import React, { useState } from 'react';
import './styles.css';
import VehiculoModal from './vehicles-modal/modal';

const Rating = ({ score }) => {
  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={`star ${star <= score ? 'filled' : ''}`}>★</span>
      ))}
      <span className="score">{score.toFixed(1)}</span>
    </div>
  );
};

const Modal = ({ vehiculo, onClose }) => {
  return vehiculo ? <VehiculoModal vehiculo={vehiculo} onClose={onClose} /> : null;
};

const PaginaPrincipal = ({ vehiculos }) => {
  const [selectedVehiculo, setSelectedVehiculo] = useState(null);

  const openModal = (vehiculo) => {
    setSelectedVehiculo(vehiculo);
  };
  const closeModal = () => {
    setSelectedVehiculo(null);
  };

  console.log(vehiculos);

  return (
    <div className="page-container">
      <main className="main-content">
        <h2 className="main-title">Catálogo</h2>
        <div className="vehicle-grid">
          {vehiculos.map((vehiculo) => (
            <div key={vehiculo.idvehiculo} className="vehicle-item">
              <div className="vehicle-card">
                <img src={'https://www.mitsubishi-motors.com.pe/blog/wp-content/uploads/2023/03/carroceria-suv.jpg'} alt={vehiculo.nombre} className="vehicle-image" />
                <div className="vehicle-info">
                  <h2 className="vehicle-title">{vehiculo.nombre}</h2>
                  <ul className="vehicle-features">
                    <li>Tipo: {vehiculo.tipovehiculo}</li>
                    <li>Marca: {vehiculo.marca}</li>
                    <li>Color: {vehiculo.color}</li>
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
      </main>
      <Modal vehiculo={selectedVehiculo} onClose={closeModal} />
    </div>
  );
};

export default PaginaPrincipal;
