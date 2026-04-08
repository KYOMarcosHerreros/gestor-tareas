import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="auth-container">
      <div className="form-card">
        <h2 className="form-title">Iniciar Sesión</h2>
        
        <form className="main-form">
          <div className="form-group">
            <label className="form-label">Correo Corporativo</label>
            <input type="email" className="form-input" placeholder="usuario@kyocera.es" />
          </div>

          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input type="password" className="form-input" placeholder="••••••••" />
          </div>

          <Link to="/" className="btn-primary" style={{ marginTop: '10px', textAlign: 'center', textDecoration: 'none' }}>
            Entrar al Gestor
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;