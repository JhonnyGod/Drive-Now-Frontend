import React, { useState } from 'react';
import './styles.css';
import VehiculoModal from './vehicles-modal/modal';


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

  return (
    <div className="page-container">
      <main className="main-content">
        <h2 className="main-title">Catálogo</h2>
        <div className="vehicle-grid">
          {vehiculos.map((vehiculo) => (
            <div key={vehiculo.idvehiculo} className="vehicle-item">
              <div className="vehicle-card">
                <img src={vehiculo.image_src} alt={vehiculo.nombre} className="vehicle-image" />
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
