import React, { useState } from 'react';
import './register.css';
import image from '../../Assets/chofer.jpg';

const Register = () => {
 
//TODO: Crear la lógica para el registro de usuario y ajustar el diseño de esta vista
  return (
    <div className="registro-container">
      <div className="imagen-lateral">
        <img src= {image} alt="Persona en coche" />
      </div>
      <div className="formulario-registro">
        <h2>Registro de usuario</h2>
        <form>
          <div className="campo-doble">
            <input type="text" placeholder="Ingrese su nombre" />
            <input type="text" placeholder="Ingrese su apellido" />
          </div>
          <input className= "email_register"type="email" placeholder="Ingrese su correo" />
          <div className="campo-doble">
            <input type="password" placeholder="Ingrese una contraseña" />
            <input type="password" placeholder="Confirma tu contraseña" />
          </div>
          <div className="checkbox-container">
            <label>
              <input type="checkbox" /> Acepto términos y condiciones
            </label>
            <label>
              <input type="checkbox" /> Acepto el envío de información a través de correos
            </label>
          </div>
          <button className= "Registrar "type="submit">Registrar</button>
        </form>
        <p>Ya tengo una cuenta</p>
      </div>
    </div>
  )
};

export default Register;