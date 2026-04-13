import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api'; 

function Register() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensajeExito('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden. Por favor, revísalas.');
      return; 
    }

    try {
      await registerUser(nombre, email, password);
      setMensajeExito('¡Cuenta creada con éxito! Redirigiendo al login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.message || 'No se pudo conectar. ¿El servidor o el túnel están apagados?');
    }
  };

  return (
    <div className="auth-container">
      <div className="form-card">
        <h2 className="form-title">Crear Cuenta</h2>
        
        {error && <div className="alert-message alert-error">{error}</div>}
        {mensajeExito && <div className="alert-message alert-success">{mensajeExito}</div>}

        <form className="main-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nombre Completo</label>
            <input type="text" className="form-input" placeholder="Ej: Andrei Popa" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Correo Corporativo</label>
            <input type="email" className="form-input" placeholder="usuario@kyocera.es" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input type="password" className="form-input" placeholder="••••••••" minLength="6" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <label className="form-label">Confirmar Contraseña</label>
            <input type="password" className="form-input" placeholder="Repite la contraseña" minLength="6" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>

          <button type="submit" className="btn-primary btn-full">Registrarse</button>
          
          <div className="auth-footer-text">
            ¿Ya tienes cuenta? <Link to="/login" className="auth-footer-link">Inicia sesión</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;