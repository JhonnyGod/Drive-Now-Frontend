import React, { useEffect, useState } from 'react';
import './styles.css';
import useUserStore from '../../../../store/useUserStore';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

export default function VehiculoModal({ vehiculo, onClose }) {
    const [isOpen, setIsOpen] = useState(false);
    const { user, hasSession } = useUserStore();
    const navigate = useNavigate();

    useEffect(() => {
        setIsOpen(true);
    }, []);

    const handleLogin = () => {
        navigate('/login');
    }
    const handleRent = () => {

        const idvehiculo = vehiculo.idvehiculo;
        const petition = axios.post('http://localhost:3000/home/rent', {
            id_user: user.user_id,
            idvehiculo: idvehiculo,
        })
        if (!petition) {
            alert('Error al alquilar el vehículo');
        }
        else {
            alert('El vehículo fue alquilado exitosamente, te enviamos un correo con toda la información')
            setIsOpen(false);
        }
    }
    const handleClose = () => {
        setIsOpen(false);
        setTimeout(onClose, 300);
    };

    return (
        <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
            <div className={`modal-content ${isOpen ? 'open' : ''}`}>
                <button className="modal-close" onClick={handleClose}>×</button>
                <div className="modal-body">
                    <div className="modal-info">
                        <h3 className="modal-title">{vehiculo.nombre}</h3>
                        <div className="modal-image-container">
                            <img src={vehiculo.image_src} alt={vehiculo.nombre} className="modal-image" />
                        </div>
                        <div className="attribute">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3h5v5M21 3l-7 7M21 21v-5m0 5l-7-7M3 16h5m-5 5h5v-5M3 3l7 7M3 3h5v5" /></svg>
                            <p>Tipo: {vehiculo.tipovehiculo}</p>
                        </div>
                        <div className="attribute">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" /></svg>
                            <p>Marca: {vehiculo.marca}</p>
                        </div>
                        <div className="attribute">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
                            <p>Color: {vehiculo.color}</p>
                        </div>
                        <div className="attribute">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>
                            <p>Modelo: {vehiculo.modelo}</p>
                        </div>
                        <button className="rent-button"  onClick={() => hasSession() ? handleRent() : handleLogin()} >{hasSession() ? 'Alquilar' : 'Logearse' }</button>
                    </div>
                </div>
            </div>
        </div>
    );
}