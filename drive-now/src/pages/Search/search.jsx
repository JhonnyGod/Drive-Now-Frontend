import React, { useState } from "react";
import Header from "../../components/header/header";
import { useLocation } from "react-router-dom";
import VehiculoModal from '../../components/homepage/vehicles-page/vehicles-modal/modal';

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
    // Añadir más colores según sea necesario
};

const ResultsPage = () => {
    const location = useLocation();
    const vehicles = location.state?.vehicles || [];
    const [selectedVehiculo, setSelectedVehiculo] = useState(null);

    const openModal = (vehiculo) => {
        console.log(vehiculo)
        setSelectedVehiculo(vehiculo);
    };

    const closeModal = () => {
        setSelectedVehiculo(null);
    };

    return (
        <div className="search-page-main-container">
            <Header />
            <h2 className="search-title">Resultados de la búsqueda para:</h2>
            <div className="coincidences-container">
                {vehicles.length === 0 ? (
                    <p>No se encontraron resultados.</p>
                ) : (
                    vehicles.map((vehiculo) => (
                        <div key={vehiculo.idvehiculo} className="vehicle-item">
                            <div className="vehicle-card">
                                <img
                                    src={vehiculo.image_src}
                                    alt={vehiculo.nombre}
                                    className="vehicle-image"
                                />
                                <div className="vehicle-info">
                                    <h2 className="vehicle-title">{vehiculo.nombre}</h2>
                                    <ul className="vehicle-features">
                                        <li>Tipo: {vehiculo.tipovehiculo}</li>
                                        <li>Marca: {vehiculo.marca}</li>
                                        <li>
                                            Color:
                                            <span
                                                className="color-bubble"
                                                style={{ backgroundColor: colorMap[vehiculo.color.toLowerCase()] || 'gray' }}>
                                            </span>
                                            {vehiculo.color}
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
                    ))
                )}
            </div>
            <Modal vehiculo={selectedVehiculo} onClose={closeModal} />
        </div>
    );
}

export default ResultsPage;