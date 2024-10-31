import { useState } from 'react';
import axios from 'axios';
import './recover.css';
import { Alert } from '../../components/alert';

const Recover = () => {
    const [email, setEmail] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertClass, setAlertClass] = useState('');
    const [alertStatus, setAlertStatus] = useState('error'); // Valor inicial

    //TODO: Le falta, pero en teoría ya debe estar enviando los correos de recuperación, queda pendiente la construcción de 
    //* la página donde se escribe el codigo y cambiar la contraseña, pero me duele resto la cabeza, pitos

    const recoverPasswordFunction = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/usuario/recuperar', { email });
            console.log("Solicitud enviada");

            const data = response.data;

            const info = {
                status: data.ok,
                message: data.message
            };

            if (info.status === 200) {
                console.log(info);
                setAlertMessage(data.message);
                setAlertStatus('success');
                setShowAlert(true);
            }

            console.log(info);
            setEmail('');

            if (response.status !== 200) {
                console.error('Error al recuperar contraseña:', response);
                setEmail('');
            }

        } catch (error) {
            console.error('Error al recuperar contraseña:', error);
            setEmail('');
        }
    };

    return (
        <div className='Container'>
            <div className="Recover">
                <h1>Recuperar contraseña</h1>
                <form onSubmit={recoverPasswordFunction}>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ingresa tu correo electrónico."
                        required
                    />
                    <button type="submit">Enviar</button>
                </form>
            </div>
            {showAlert && (
                <div className={`alert ${alertClass}`}>
                    <p>{alertMessage}</p>
                </div>
            )}
        </div>

    );
};

export default Recover;
