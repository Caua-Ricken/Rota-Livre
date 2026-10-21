import logo from "../../assets/logo.svg";
import { NavLink } from 'react-router-dom';
import "./Header.css";
import { FiCompass } from 'react-icons/fi';

export default function Header() {
  return (
    <header className="site-header page-container">
      <a className="brand" href="/" aria-label="Rota Livre — início">
        <img src={logo} alt="" className="brand-logo" />
        <span className="brand-name">Rota Livre</span>
      </a>

      <nav className="header-nav" aria-label="Navegação principal">
        <NavLink className="nav-link" to="/" end>Explorar</NavLink>
        <NavLink className="nav-link" to="/destinos">Meus destinos</NavLink>
      </nav>
      
      <div className="header-signature">
        <FiCompass className="signature-compass" aria-hidden="true" />
        <span className="signature-text">Novos caminhos,<br />mais histórias.</span>
      </div>
    </header>
  );
}

