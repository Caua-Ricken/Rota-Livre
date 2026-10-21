import { useState } from 'react';
import { FiMapPin } from 'react-icons/fi';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './DestinationResult.css';

interface DestinationResultProps {
  imagem: string;
  cidade: string;
}

const DestinationResult = ({imagem,cidade}: DestinationResultProps) => {
  const [favorito, setFavorito] = useState(false);

  return (
    <section className="destination-result">
      <img
        className="destination-result__image"
        src={imagem}
        alt={`Vista de ${cidade}`}
      />

      <button
        className="destination-result__favorite"
        type="button"
        aria-label={
          favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
        }
        aria-pressed={favorito}
        onClick={() => setFavorito(!favorito)}
      >
        {favorito ? <FaHeart /> : <FaRegHeart />}
      </button>

      <h2 className="destination-result__title">
        <FiMapPin aria-hidden="true" />
        <span>{cidade}</span>
      </h2>
    </section>
  );
};

export default DestinationResult;