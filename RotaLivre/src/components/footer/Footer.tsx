import footerSkyline from '../../assets/footer-skyline.svg';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner page-container">
        <img className="site-footer__skyline" src={footerSkyline} alt="" aria-hidden="true" />
        <div className="site-footer__copy">
          <p className="site-footer__signature">
            <span>Rota Livre</span>
            <span className="site-footer__dot" aria-hidden="true">•</span>
            <span>Planeje hoje as viagens que ficam para sempre.</span>
          </p>
          <p>Dados e valores ilustrativos.</p>
        </div>
      </div>
    </footer>
  );
}

