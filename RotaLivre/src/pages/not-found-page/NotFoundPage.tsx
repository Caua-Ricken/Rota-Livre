import { Link } from 'react-router-dom';
import { FiArrowLeft, FiCompass } from 'react-icons/fi';
import './NotFoundPage.css';

export default function NotFoundPage() {
  return (
    <div className="not-found-page">
      <main className="not-found page-container" aria-labelledby="not-found-title">
        <div className="not-found__code" aria-hidden="true">
          <span>4</span>
          <span className="not-found__compass"><FiCompass /></span>
          <span>4</span>
        </div>
        <p className="not-found__eyebrow">ERRO 404 · PÁGINA NÃO ENCONTRADA</p>
        <h1 id="not-found-title">Parece que saímos da rota.</h1>
        <p className="not-found__description">
          A página que você procura não existe ou mudou de endereço.
          Mas seu próximo destino ainda está esperando por você.
        </p>
        <Link className="not-found__back" to="/">
          <FiArrowLeft aria-hidden="true" /> Voltar para explorar
        </Link>
      </main>
    </div>
  );
}
