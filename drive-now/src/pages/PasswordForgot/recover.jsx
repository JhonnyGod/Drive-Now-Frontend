import React from 'react';
import './recover.css';

const Recover = () => {

    return (
        <div className="Recover">
            <h1>Recuperar contraseña</h1>
            <form>
                <input type="email" placeholder="Ingresa tu correo electrónico." />
                <button>Enviar</button>
            </form>
        </div>
    );
}

export default Recover;