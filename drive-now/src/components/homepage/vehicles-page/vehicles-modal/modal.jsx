import React, { useEffect, useState } from 'react';
import './styles.css';
import useUserStore from '../../../../store/useUserStore';
import { json, useNavigate } from 'react-router-dom';
import StyledDatePicker from './DatePicker/Datepicker';
import GooglePayComponent from '../../../../payments/GooglePayButton';
import usePaymentStatus from '../../../../store/PaymentStatus';

export default function VehiculoModal({
    vehiculo,
    onClose,
    isEditMode = false, // Define si el modal está en modo edición
    onEditSave = () => { }, // Callback para guardar cambios
}) {
    const [isOpen, setIsOpen] = useState(false);
    const { user, hasSession } = useUserStore();
    const [payment, setOpenPayment] = useState(false);
    const [dateRange, setDateRange] = useState([null, null]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [editableVehiculo, setEditableVehiculo] = useState(vehiculo); // Estado para los campos editables
    const { paymentStatus, setPaymentStatus } = usePaymentStatus();

    const [formData, setFormData] = useState({
        image_src: null,

    })

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

    const navigate = useNavigate();

    useEffect(() => {
        setIsOpen(true);
    }, []);

    useEffect(() => {
        if (paymentStatus === 'SUCCESS') {
            setOpenPayment(false);
            setIsOpen(false);
            navigate('/home?paymentSuccess=true');
            alert('Pago exitoso!');
            setTimeout(() => {
                setPaymentStatus(null);
                onClose();
            }, 300);
        }
    }, [paymentStatus, navigate, onClose, setPaymentStatus]);

    const handleLogin = () => {
        navigate('/login');
    };

    const handleRent = () => {
        setOpenPayment(true);
    };

    const confirmRental = (calculatedTotalPrice) => {
        const priceString = calculatedTotalPrice.toString();
        setTotalPrice(priceString);
        console.log('Total a pagar:', priceString);
    };

    const handleRentPetition = async () => {
        const [startDate, endDate] = dateRange;

        if (startDate && endDate) {
            const diffTime = Math.abs(endDate - startDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            const calculatedTotalPrice = diffDays * vehiculo.valor_dia;

            confirmRental(calculatedTotalPrice);
        } else {
            console.log("Por favor selecciona ambas fechas.");
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(onClose, 300);
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            image_src: file,

        });
    }




    const handleSave = () => {
        onEditSave(editableVehiculo);
        handleClose();
    };

    return (
        paymentStatus === 'SUCCESS' ? null : (
            <div className={`vm-modal-overlay ${isOpen ? 'vm-open' : ''}`}>
                <div className={`vm-modal-content ${isOpen ? 'vm-open' : ''}`}>
                    <button className="vm-modal-close" onClick={handleClose}>&times;</button>
                    {payment ? null : (
                        <div className="vm-modal-body">
                            <div className="vm-vehicle-details">
                                <div className="vm-vehicle-image-container">
                                    {isEditMode ? (

                                        <input
                                            type="file"
                                            name="image_src"
                                            onChange={handleChange}
                                            className="vm-image-edit"
                                        />
                                    ) : (
                                        <img
                                            src={vehiculo.image_src}
                                            alt={vehiculo.nombre}
                                            className="vm-vehicle-image"
                                        />
                                    )}


                                </div>
                                <div className="vm-vehicle-info">
                                    <h2 className="vm-vehicle-title">
                                        {isEditMode ? (

                                            <input
                                                type="text"
                                                name="nombre"
                                                value={editableVehiculo.nombre}
                                                onChange={handleChange}
                                                placeholder="Nombre del vehículo"
                                                className="vm-vehicle-title-input"
                                            />
                                        ) : (
                                            vehiculo.nombre
                                        )}
                                    </h2>

                                    <div className="vm-vehicle-features">
                                        <div className="vm-feature">
                                            <span className="vm-feature-icon">🚗</span>
                                            {isEditMode ? (
                                                <input
                                                    type="text"
                                                    name="tipovehiculo"
                                                    value={editableVehiculo.tipovehiculo}
                                                    onChange={handleChange}
                                                    placeholder="Tipo de vehículo"
                                                />
                                            ) : (
                                                <span>Tipo: {vehiculo.tipovehiculo}</span>
                                            )}
                                        </div>

                                        <div className="vm-feature">
                                            <span className="vm-feature-icon">🏷️</span>
                                            {isEditMode ? (
                                                <input
                                                    type="text"
                                                    name="marca"
                                                    value={editableVehiculo.marca}
                                                    onChange={handleChange}
                                                    placeholder="Marca"
                                                />
                                            ) : (
                                                <span>Marca: {vehiculo.marca}</span>
                                            )}
                                        </div>

                                        <div className="vm-feature">
                                            <span className="vm-feature-icon">🎨</span>
                                            {isEditMode ? (
                                                <input
                                                    type="text"
                                                    name="color"
                                                    value={editableVehiculo.color}
                                                    onChange={handleChange}
                                                    placeholder="Color"
                                                />
                                            ) : (
                                                <li>
                                                    Color:
                                                    <span
                                                        className="color-bubble"
                                                        style={{ backgroundColor: colorMap[vehiculo.color.toLowerCase()] || 'gray' }}>
                                                    </span>
                                                    {vehiculo.color}
                                                </li>
                                            )}
                                        </div>

                                        <div className="vm-feature">
                                            <span className="vm-feature-icon">📅</span>
                                            {isEditMode ? (
                                                <input
                                                    type="text"
                                                    name="modelo"
                                                    value={editableVehiculo.modelo}
                                                    onChange={handleChange}
                                                    placeholder="Modelo"
                                                />
                                            ) : (
                                                <span>Modelo: {vehiculo.modelo}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="vm-vehicle-full-description">
                                        <h3>Descripción</h3>
                                        {isEditMode ? (
                                            <textarea
                                                name="descripcion"
                                                value={editableVehiculo.descripcion}
                                                onChange={handleChange}
                                                placeholder="Descripción del vehículo"
                                                className="vm-vehicle-description-input"
                                            />
                                        ) : (
                                            <p>{vehiculo.descripcion}</p>
                                        )}
                                    </div>
                                    {isEditMode ? (
                                        <button className="save-button" onClick={handleSave}>
                                            Guardar Cambios
                                        </button>
                                    ) : (
                                        <button
                                            className="vm-rent-button"
                                            onClick={() => hasSession() ? handleRent() : handleLogin()}
                                        >
                                            {hasSession() ? 'Alquilar' : 'Logearse'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    {payment && (
                        <div className="payment-body">
                            <div className="start-date-space">
                                <h1 className="start-date-title">
                                    Selecciona tu fecha de inicio y finalización de alquiler
                                </h1>
                                <StyledDatePicker
                                    dateRange={dateRange}
                                    setDateRange={setDateRange}
                                />
                                <button className="aceptar-button" onClick={handleRentPetition}>
                                    Aceptar
                                </button>
                                {totalPrice > 0 && (
                                    <div>
                                        <p>Total a pagar: ${totalPrice}</p>
                                        <GooglePayComponent valor={totalPrice} />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    );
}
