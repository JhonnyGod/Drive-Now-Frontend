// src/pages/Home.jsx
import React, { useContext, useState, useEffect } from "react";
import './home.css';
import Header from "../../components/homepage/header";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import VehicleCarousel from '../../components/homepage/vehicles-page/VehicleCarousel';

const Home = () => {
  const { user } = useContext(UserContext);
  const [vehicleData, setVehicleData] = useState([]);

  const getVehicles = async () => {
    try {
      const vehiclereq = await axios.post('http://localhost:3000/home/recuperarvehiculos');

      if (vehiclereq.status !== 200) { // Use strict equality
        console.log('Error al obtener los vehículos');
      }

      const vehicledata = vehiclereq.data.vehiculos.vehicles;
      setVehicleData(vehicledata);
      console.log(vehicledata);

    } catch (error) {
      console.error('Error al obtener los vehículos:', error);
    }
  };

  useEffect(() => {
    if (user) {
      getVehicles();
    }
  }, [user]);

  return (
    <div>
      <Header />
      <section className="main-content-screen" id="1">
        <h1>Hola mundo
        </h1>
      </section>
    </div>

  );
};

export default Home;