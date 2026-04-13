import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoKyocera from '../assets/kyocera.png';
import { getUsuarioActual, logout } from '../auth';

function Header() {
  const navigate = useNavigate();
  
  // Obtenemos el nombre del usuario del token JWT
  const usuario = getUsuarioActual();

  const handleLogout = () => {
    // Borramos el token y redirigimos al login
    logout();
    navigate('/login');
  };

  return (
    <header className="main-header">
      <div className="header-content">

        {/* GRUPO IZQUIERDO: Logo de Kyocera + Título */}
        <div className="header-left-group">
          <a href="https://spain.kyocera.com/" target="_blank" rel="noopener noreferrer" title="Ir a la web de Kyocera">
            <img src={logoKyocera} alt="Logo Kyocera" className="header-kyocera-logo" />
          </a>

          <Link to="/" className="header-title-link">
            <h1>Gestor de Tareas</h1>
          </Link>
        </div>

        {/* GRUPO DERECHO: Nombre de usuario + Botón Cerrar Sesión */}
        <div className="header-right-group">
          {/* LA MAGIA: Solo renderizamos esto si 'usuario' tiene algún valor */}
          {usuario && (
            <>
              <span className="header-username">
                Usuario: {usuario}
              </span>

              <button onClick={handleLogout} className="logout-btn-styled">
                Cerrar Sesión
              </button>
            </>
          )}
        </div>

      </div>
    </header>
  );
}

export default Header;