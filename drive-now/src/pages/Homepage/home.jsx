// src/pages/Home.jsx
import React, {useState, useEffect } from "react";
import './home.css';
import Header from "../../components/homepage/header";
import axios from "axios";
import PaginaPrincipal from '../../components/homepage/vehicles-page/PaginaPrincipal';
import useUserStore from "../../store/useUserStore";

const Home = () => {
  const { user } = useUserStore();
  const [vehicleData, setVehicleData] = useState([]);

  const getVehicles = async () => {
    try {
      const vehiclereq = await axios.post('http://localhost:3000/home/recuperarvehiculos');

      if (vehiclereq.status !== 200) { 
        console.log('Error al obtener los vehículos');
      }

      const vehicledata = vehiclereq.data.vehiculos.vehicles;
      setVehicleData(vehicledata);  
      
    } catch (error) {
      console.error('Error al obtener los vehículos:', error);
    }
  };
  useEffect(() => {
    if (user) {
      getVehicles();
    }
    else{
      getVehicles();
    }
  }, [user]);

  return (
    <div>
      <Header />
      <section className="main-content-screen" id="1">
        <PaginaPrincipal vehiculos={vehicleData}/>
      </section>
    </div>

  );
};

export default Home;