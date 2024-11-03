// src/components/AddCarForm.jsx
import React, { useState } from "react";
import './addcarform.css';

const AddCarForm = ({ onAddCar, onCancel }) => {
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Por favor, selecciona un archivo de imagen.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCar({ image: preview, name, description });
    setImageFile(null);
    setPreview(null);
    setName("");
    setDescription("");
    onCancel(); 
  };

  return (
    <div className="form-container">
      <h2>Agregar Vehículo</h2>
      <form onSubmit={handleSubmit}>
        <label>Imagen del Vehículo</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Vista previa" />
          </div>
        )}
        <label>Nombre del Vehículo</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <div className="form-buttons">
          <button type="submit" className="btn-accept">Aceptar</button>
          <button type="button" className="btn-cancel" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default AddCarForm;
