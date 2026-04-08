import { Link } from 'react-router-dom';
import logoKyocera from '../assets/kyocera.png'; 

function Header() {
  return (
    <header className="main-header">
      <div className="header-content">
        <Link to="/" className="header-logo">
          <h1>Gestor de Tareas 📋</h1>
        </Link>
        
        <div className="header-company">
          <a href="https://spain.kyocera.com/" target="_blank" rel="noopener noreferrer" title="Ir a la web de Kyocera">
            {/* 2. USAMOS LA VARIABLE DEL IMPORT EN EL SRC */}
            <img 
              src={logoKyocera} 
              alt="Logo Kyocera" 
              style={{ 
                height: '50px',
              }} 
              onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
            />
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;