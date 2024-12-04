import React, { useState } from "react";
import './add-modal.css';
import axios from "axios";


//todo: Hacer el formulario anti imbéciles, es decir, cambiar los inputs por comboboxes
const AddModal = ({ closeModal }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        matricula: '',
        tipo: '',
        modelo: '',
        color: '',
        cilindraje: '',
        marca: '',
        capacidad: '',
        combustible: '',
        image_src: null,
    });

    const handleAddClose = () => {
        closeModal();
    }

    const handleAddSubmit = (event) => {
        event.preventDefault();
        console.log("Datos del formulario:", formData);
        //TODO: Convertir el archivo y enviarlo al backend

    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            image_src: file,
        });
    };

    const handleImageClick = () => {
        document.getElementById("image-input").click();
    };

    const handleReplaceImage = () => {
        setFormData({
            ...formData,
            image_src: null,
        });
    };

    return (
        <div className="add-modal-container">
            <div className="add-form-container">
                <form onSubmit={handleAddSubmit}>
                    <div className="form-header">
                        <h2>Añadir Vehículo</h2>
                        <button type="button" className="close-modal-btn" onClick={handleAddClose}>X</button>
                    </div>
                    <div className="form-content">
                        {/* Left Side: Image Upload */}
                        <div className="image-upload-container">
                            {!formData.image_src ? (
                                <button
                                    type="button"
                                    className="image-upload-button"
                                    onClick={handleImageClick}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        width="48px"
                                        height="48px"
                                    >
                                        <path d="M12 4v16m8-8H4" strokeWidth="2" stroke="currentColor" fill="none" />
                                    </svg>
                                    <span>Agregar Imagen</span>
                                </button>
                            ) : (
                                <div className="image-preview-container">
                                    <img src={URL.createObjectURL(formData.image_src)} alt="Vista previa" />
                                    <button
                                        type="button"
                                        className="replace-image-button"
                                        onClick={handleReplaceImage}
                                    >
                                        Reemplazar Imagen
                                    </button>
                                </div>
                            )}
                            <input
                                id="image-input"
                                type="file"
                                name="image_src"
                                style={{ display: "none" }}
                                onChange={handleFileChange}
                            />
                        </div>

                        {/* Right Side: Form Fields */}
                        <div className="form-fields-container">
                            <label htmlFor="nombre">
                                Nombre del Vehículo
                                <input
                                    id="nombre"
                                    className="form-input"
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                />
                            </label>
                            <label htmlFor="matricula">
                                Matrícula
                                <input
                                    id="matricula"
                                    className="form-input"
                                    type="text"
                                    name="matricula"
                                    value={formData.matricula}
                                    onChange={handleChange}
                                />
                            </label>
                            <label htmlFor="tipo">
                                Tipo
                                <input
                                    id="tipo"
                                    className="form-input"
                                    type="text"
                                    name="tipo"
                                    value={formData.tipo}
                                    onChange={handleChange}
                                />
                            </label>
                            <label htmlFor="modelo">
                                Modelo
                                <input
                                    id="modelo"
                                    className="form-input"
                                    type="text"
                                    name="modelo"
                                    value={formData.modelo}
                                    onChange={handleChange}
                                />
                            </label>
                            <label htmlFor="color">
                                Color
                                <input
                                    id="color"
                                    className="form-input"
                                    type="text"
                                    name="color"
                                    value={formData.color}
                                    onChange={handleChange}
                                />
                            </label>
                            <label htmlFor="cilindraje">
                                Cilindraje
                                <input
                                    id="cilindraje"
                                    className="form-input"
                                    type="text"
                                    name="cilindraje"
                                    value={formData.cilindraje}
                                    onChange={handleChange}
                                />
                            </label>
                            <label htmlFor="marca">
                                Marca
                                <input
                                    id="marca"
                                    className="form-input"
                                    type="text"
                                    name="marca"
                                    value={formData.marca}
                                    onChange={handleChange}
                                />
                            </label>
                            <label htmlFor="capacidad">
                                Capacidad
                                <input
                                    id="capacidad"
                                    className="form-input"
                                    type="text"
                                    name="capacidad"
                                    value={formData.capacidad}
                                    onChange={handleChange}
                                />
                            </label>
                            <label htmlFor="combustible">
                                Combustible
                                <select
                                    id="combustible"
                                    className="form-input"
                                    name="combustible"
                                    value={formData.combustible}
                                    onChange={handleChange}
                                >
                                    <option value="gasolina">Gasolina</option>
                                    <option value="diesel">Diesel</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="submit-button">Añadir Vehículo</button>
                </form>
            </div>
        </div>
    );
};

export default AddModal;
