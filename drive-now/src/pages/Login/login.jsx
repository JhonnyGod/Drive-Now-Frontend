import React, { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de inicio de sesión
    console.log('Iniciar sesión con:', email, password);
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f2f5',
      fontFamily: 'Arial, sans-serif',
    },
    form: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px',
    },
    title: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '1.5rem',
    },
    inputGroup: {
      marginBottom: '1rem',
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      color: '#555',
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      borderRadius: '4px',
      border: '1px solid #ddd',
      fontSize: '1rem',
    },
    button: {
      width: '100%',
      padding: '0.75rem',
      backgroundColor: '#1877f2',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#166fe5',
    },
    forgotPassword: {
      textAlign: 'center',
      marginTop: '1rem',
    },
    forgotPasswordLink: {
      color: '#1877f2',
      textDecoration: 'none',
    },
    register: {
      textAlign: 'center',
      marginTop: '1rem',
      padding: '1rem',
      backgroundColor: '#e7f3ff',
      borderRadius: '4px',
    },
    registerLink: {
      color: '#1877f2',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Iniciar Sesión</h2>
        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
            placeholder="tu@ejemplo.com"
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
            placeholder="Tu contraseña"
          />
        </div>
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
        >
          Iniciar Sesión
        </button>
        <div style={styles.forgotPassword}>
          <a href="#" style={styles.forgotPasswordLink}>
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <div style={styles.register}>
          ¿No tienes una cuenta?{' '}
          <a href="#" style={styles.registerLink}>
            Regístrate
          </a>
        </div>
      </form>
    </div>
  );
}