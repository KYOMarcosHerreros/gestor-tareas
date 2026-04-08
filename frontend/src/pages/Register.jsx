import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

  // 2. Función que envía el nuevo usuario al servidor
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensajeExito('');

    try {
      // ⚠️ ATENCIÓN: Confirma con Marcos que su ruta de registro es /api/auth/register
      const response = await fetch('https://unsocialized-unstalemated-corie.ngrok-free.dev/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({
          nombre: nombre, 
          username: email,
          password: password
        }),
      });

      if (response.ok) {
        setMensajeExito('¡Cuenta creada con éxito! Redirigiendo al login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        const data = await response.json();
        setError(data.message || 'Hubo un error al registrar el usuario. Revisa los datos.');
      }
    } catch (err) {
      setError('No se pudo conectar con el servidor de Marcos.');
    }
  };

  return (
    <div className="auth-container">
      <div className="form-card">
        <h2 className="form-title">Crear Cuenta</h2>
        
        {/* Mensajes de feedback usando las clases limpias de tu CSS */}
        {error && (
          <div className="alert-message alert-error">
            {error}
          </div>
        )}
        
        {mensajeExito && (
          <div className="alert-message alert-success">
            {mensajeExito}
          </div>
        )}

        <form className="main-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nombre Completo</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Ej: Andrei Popa" 
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Correo Corporativo</label>
            <input 
              type="email" 
              className="form-input" 
              placeholder="usuario@kyocera.es" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input 
              type="password" 
              className="form-input" 
              placeholder="••••••••" 
              minLength="6" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '10px', width: '100%', border: 'none', cursor: 'pointer' }}>
            Registrarse
          </button>

          <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '0.9rem', color: 'var(--dark-grey)' }}>
            ¿Ya tienes cuenta? <Link to="/login" style={{ color: 'var(--primary-blue)', fontWeight: 'bold', textDecoration: 'none' }}>Inicia sesión</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;