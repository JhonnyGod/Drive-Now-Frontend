import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/header/header";
import useUserStore from "../../store/useUserStore";
import useModalStore from "../../store/useModalStore";
import Profile from "../../components/Profile/profile";
import "./history.css";
import ReturnModal from "./ReturnModal/ReturnModal";

const History = () => {
  const user = useUserStore();
  const userId = user.user.user_id;
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [backModal, setBackModal] = useState({ show: false, rentalId: null });

  const setOpenProfile = useModalStore((state) => state.setOpenProfile);
  const openProfile = useModalStore((state) => state.openProfile);

  const closeProfileModal = () => {
    setOpenProfile(false);
  };

  useEffect(() => {
    const getHistoryPetition = async () => {
      try {
        setLoading(true);
        const getUserHistory = await axios.post('http://localhost:3000/usuario/historial', {
          userId: userId
        });

        if (getUserHistory.status === 200) {
          setHistory(getUserHistory.data.history);
        }
      } catch (error) {
        console.log('Error al obtener el historial');
        console.log(error);
        setError('No se pudo cargar el historial. Por favor, intente de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    getHistoryPetition();
  }, [userId]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const handleReturnVehicle = (rentalId) => {
    setBackModal({ show: true, rentalId: rentalId });
  };

  return (
    <div className="history-main-container">
      <Header />
      <main className="history-container">
        <h1 className="history-title">Tu Historial de Alquileres</h1>
        {loading ? (
          <p className="loading-message">Cargando tu historial...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="rental-history">
            {history.map((rental) => (
              <div key={rental.idalquiler} className="rental-card">
                <img
                  src={rental.vehiculo.image_src}
                  alt={rental.vehiculo.nombre}
                  className="rental-image"
                />
                <div className="rental-details">
                  <h2>{rental.vehiculo.nombre}</h2>
                  <p>Matrícula: {rental.vehiculo.matricula}</p>
                  <p>Fecha de inicio: {formatDate(rental.fecha_inicio)}</p>
                  <p>Fecha de fin: {formatDate(rental.fecha_fin)}</p>
                  <p>
                    Estado:
                    <span
                      className={`rental-status ${
                        rental.estado ? "rental-status-active" : "rental-status-finished"
                      }`}
                    >
                      {rental.estado ? "Activo" : "Finalizado"}
                    </span>
                  </p>
                  {rental.estado && (
                    <button
                      className="return-vehicle-button"
                      onClick={() => handleReturnVehicle(rental.idalquiler)}
                    >
                      Devolver vehículo
                    </button>
                  )}
                </div>
              </div>
            ))}
            {backModal.show && (
              <ReturnModal
                rentalId={backModal.rentalId} // Se pasa el rentalId al ReturnModal
                onClose={() => setBackModal({ show: false, rentalId: null })}
              />
            )}
          </div>
        )}
      </main>
      {openProfile && <Profile isOpen={openProfile} onClose={closeProfileModal} />}
    </div>
  );
};

export default History;