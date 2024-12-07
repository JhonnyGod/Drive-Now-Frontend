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
    isEditMode = false,
    onEditSave = () => { },
}) {
    const [isOpen, setIsOpen] = useState(false);
    const { user, hasSession, getId } = useUserStore();
    const [payment, setOpenPayment] = useState(false);
    const [dateRange, setDateRange] = useState([null, null]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [editableVehiculo, setEditableVehiculo] = useState(vehiculo); // Estado para los campos editables
    const { paymentStatus, setPaymentStatus } = usePaymentStatus();
    const [priceString, setPriceString] = useState(null);
    const [userSaved, setSavedUser] = useState(null);

    const [transactionData, setTransactionData] = useState(null);

    const [formData, setFormData] = useState({
        nombre: '',
        matricula: '',
        tipovehiculo: 'Coche',
        modelo: '',
        color: '',
        cilindraje: '',
        marca: '',
        capacidad: '',
        combustible: 'gasolina',
        image_src: null,
    });

    const [editableFormData, setEditableFormData] = useState({
        nombre: vehiculo.nombre,
        matricula: vehiculo.matricula,
        tipovehiculo: vehiculo.tipovehiculo,
        modelo: vehiculo.modelo,
        color: vehiculo.color,
        cilindraje: vehiculo.cilindraje,
        marca: vehiculo.marca,
        capacidad: vehiculo.capacidad,
        combustible: vehiculo.combustible,
        image_src: vehiculo.image_src,
        descripcion: vehiculo.descripcion,
    })

    const colorMap = {
        rojo: 'red',
        azul: 'blue',
        verde: 'green',
        amarillo: 'yellow',
        blanco: 'white',
        negro: 'black',
        gris: 'gray',
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
        setPriceString(priceString);
    };

    const handleRentPetition = async () => {
        const [startDate, endDate] = dateRange;

        if (startDate && endDate) {
            const diffTime = Math.abs(endDate - startDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            const calculatedTotalPrice = diffDays * vehiculo.valor_dia;
            confirmRental(calculatedTotalPrice);
            setTotalPrice(calculatedTotalPrice);

            const transaction_user_id = useUserStore.getState().user.user_id

            setTransactionData({
                idvehiculo: vehiculo.idvehiculo,
                idusuario: transaction_user_id,
                fecha_inicio: startDate,
                fecha_fin: endDate,
            })
        } else {
            console.log("Por favor selecciona ambas fechas.");
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(onClose, 300);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (e.target.type === 'file') {

            setEditableFormData({
                ...editableFormData,
                [name]: files[0],
            });
        } else {

            setEditableFormData({
                ...editableFormData,
                [name]: value,
            });
        }
    };
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
                                        <>
                                            <input
                                                type="file"
                                                name="image_src"
                                                onChange={handleChange}
                                                className="vm-image-edit"
                                            />
                                            <img
                                                src={
                                                    editableFormData.image_src instanceof File
                                                        ? URL.createObjectURL(editableFormData.image_src) // Vista previa del archivo seleccionado
                                                        : editableFormData.image_src || vehiculo.image_src // Enlace existente
                                                }
                                                alt="Vista previa"
                                                className="vm-vehicle-image"
                                            />
                                        </>
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
                                                value={editableFormData.nombre}
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
                                                    value={editableFormData.tipovehiculo}
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
                                                    value={editableFormData.marca}
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
                                                    value={editableFormData.color}
                                                    onChange={handleChange}
                                                    placeholder="Color"
                                                />
                                            ) : (
                                                <li style={{ listStyleType: 'none' }}>
                                                    <div className='text-color'>Color {vehiculo.color}</div>
                                                    <span
                                                        className="color-bubble"
                                                        style={{ backgroundColor: colorMap[vehiculo.color.toLowerCase()] || 'gray' }}>
                                                    </span>

                                                </li>
                                            )}
                                        </div>

                                        <div className="vm-feature">
                                            <span className="vm-feature-icon">📅</span>
                                            {isEditMode ? (
                                                <input
                                                    type="text"
                                                    name="modelo"
                                                    value={editableFormData.modelo}
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
                                                value={editableFormData.descripcion}
                                                onChange={handleChange}
                                                placeholder="Descripción del vehículo"
                                                className="vm-vehicle-description-input"
                                            />
                                        ) : (
                                            <p>{vehiculo.descripcion}</p>
                                        )}
                                    </div>
                                    <div className='price-container'>
                                        <h1 className='price-label'>Precio</h1>
                                        <p className='price-amount'>${vehiculo.valor_dia} USD</p>
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
                                        <GooglePayComponent transactionData={transactionData} priceString={priceString} />
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
