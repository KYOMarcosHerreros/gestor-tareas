import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoKyocera from '../assets/kyocera.png'; 

function Header() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <header className="main-header">
      <div className="header-content">
        
        {/* GRUPO IZQUIERDO: Logo de Kyocera + Título */}
        <div className="header-left-group">
          <a href="https://www.kyocera.es/" target="_blank" rel="noopener noreferrer" title="Ir a la web de Kyocera">
            <img src={logoKyocera} alt="Logo Kyocera" className="header-kyocera-logo" />
          </a>
          
          <Link to="/" className="header-title-link">
            <h1>Gestor de Tareas</h1>
          </Link>
        </div>
        
        {/* GRUPO DERECHO: Botón de Cerrar Sesión */}
        <div className="header-right-group">
          {!isLoginPage && (
            <Link to="/login" className="logout-btn-styled">
              Cerrar Sesión
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}

export default Header;