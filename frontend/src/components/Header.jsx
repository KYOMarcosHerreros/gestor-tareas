import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="main-header">
      <div className="header-content">
        <Link to="/" className="header-logo">
          <h1>Gestor de Tareas 📋</h1>
        </Link>
        <div className="header-company">Kyocera Digital</div>
      </div>
    </header>
  );
}

export default Header;