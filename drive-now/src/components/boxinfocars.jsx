// src/components/BoxInfoCars.jsx
import React from "react";
import './boxinfocars.css';

const BoxInfoCars = ({ image, name, description, onRentClick }) => {
  return (
    <div className="box-info-car">
      <img src={image} alt={name} className="car-image" />
      <h3>{name}</h3>
      <p>{description}</p>
      <button className="rent-button" onClick={onRentClick}>Alquilar ahora</button>
    </div>
  );
};

export default BoxInfoCars;
