import React, { useEffect, useState } from 'react';
import './styles.css';
import useUserStore from '../../../../store/useUserStore';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import StyledDatePicker from './DatePicker/Datepicker'


export default function VehiculoModal({ vehiculo, onClose }) {
    const [isOpen, setIsOpen] = useState(false);
    const { user, hasSession } = useUserStore();
    const [payment, setOpenPayment] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsOpen(true);
    }, []);

    const handleLogin = () => {
        navigate('/login');
    }
    const handleRent = () => {
        setOpenPayment(true);
    }


    const handleClose = () => {
        setIsOpen(false);
        setTimeout(onClose, 300);
    };

    return (
        <div className={`vm-modal-overlay ${isOpen ? 'vm-open' : ''}`}>
            <div className={`vm-modal-content ${isOpen ? 'vm-open' : ''}`}>
                <button className="vm-modal-close" onClick={handleClose}>&times;</button>
                {payment ? null : <div className="vm-modal-body">
                    <div className="vm-vehicle-details">
                        <div className="vm-vehicle-image-container">
                            <img src={vehiculo.image_src} alt={vehiculo.nombre} className="vm-vehicle-image" />
                        </div>
                        <div className="vm-vehicle-info">
                            <h2 className="vm-vehicle-title">{vehiculo.nombre}</h2>
                            <p className="vm-vehicle-description">{vehiculo.marca} - {vehiculo.color}</p>
                            <div className="vm-vehicle-features">
                                <div className="vm-feature">
                                    <span className="vm-feature-icon">🚗</span>
                                    <span>Tipo: {vehiculo.tipovehiculo}</span>
                                </div>
                                <div className="vm-feature">
                                    <span className="vm-feature-icon">🏷️</span>
                                    <span>Marca: {vehiculo.marca}</span>
                                </div>
                                <div className="vm-feature">
                                    <span className="vm-feature-icon">🎨</span>
                                    <span>Color: {vehiculo.color}</span>
                                </div>
                                <div className="vm-feature">
                                    <span className="vm-feature-icon">📅</span>
                                    <span>Modelo: {vehiculo.modelo}</span>
                                </div>
                            </div>
                            <div className="vm-vehicle-full-description">
                                <h3>Descripción</h3>
                                <p>{vehiculo.descripcion}</p>
                            </div>
                            <button
                                className="vm-rent-button"
                                onClick={() => hasSession() ? handleRent() : handleLogin()}
                            >
                                {hasSession() ? 'Alquilar' : 'Logearse'}
                            </button>
                        </div>
                    </div>
                </div>}
                {payment ?
                    <div className='payment-body'>
                        <div className='start-date-space'>
                            <h1 className='start-date-title'>Selecciona tu fecha de inicio y finalización de alquiler</h1>
                            <StyledDatePicker />
                            <button className='aceptar-button'>Aceptar</button>
                        </div>
                    </div> : null}
            </div>
        </div>
    );
}