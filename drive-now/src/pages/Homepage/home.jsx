// src/pages/Home.jsx
import React, { useState } from "react";
import './home.css';
import Header from "../../components/homepage/header";
import BoxInfoCars from "../../components/homepage/boxinfocars";
import AddCarForm from "../../components/homepage/addcarform";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleAddCar = (car) => {
    setCars([...cars, car]);
  };

  const handleRentClick = (carName) => {
    alert(`Alquiler iniciado para el vehículo: ${carName}`);
  };

  const toggleForm = () => setShowForm(!showForm);

  return (
    <div>
      <Header /> 
      <main>
        <h2>Jhonny is gay</h2>
        <button className="add-car-button" onClick={toggleForm}>Agregar Vehículo</button>
        {showForm && (
          <AddCarForm
            onAddCar={handleAddCar}
            onCancel={toggleForm} 
          />
        )}
        <div className="car-list">
          {cars.map((car, index) => (
            <BoxInfoCars
              key={index}
              image={car.image}
              name={car.name}
              description={car.description}
              onRentClick={() => handleRentClick(car.name)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
