import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/api';

function Login() {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = await loginUser(email, password);
      sessionStorage.setItem('token', token);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.message || 'No se pudo conectar con el servidor. ¿Está encendido el Backend?');
    }
  };

  return (
    <div className="auth-container">
      <div className="form-card">
        <h2 className="form-title">Iniciar Sesión</h2>
        
        {error && <div className="alert-message alert-error">{error}</div>}
        
        <form className="main-form" onSubmit={handleSubmit}>
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {/* Botón limpio usando clases */}
          <button type="submit" className="btn-primary btn-full">
            Entrar al Gestor
          </button>
          
          {/* Footer limpio */}
          <div className="auth-footer-text">
            ¿No eres usuario? <Link to="/registro" className="auth-footer-link">Regístrate aquí</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;