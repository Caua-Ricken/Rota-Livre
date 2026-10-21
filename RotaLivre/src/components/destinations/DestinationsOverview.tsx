import { Link } from 'react-router-dom';
import './DestinationsOverview.css';

import {
  FiCompass,
  FiMapPin,
  FiUsers,
  FiDollarSign,
} from 'react-icons/fi';

interface Props {
  quantidadeDestinos: number;
  totalViajantes: number;
  totalPlanejado: number;
}

const DestinationsOverview = ({quantidadeDestinos, totalViajantes, totalPlanejado,}: Props) => {

  return (
    <section>
      <div className="destinations-intro">
        <div>
          <h1>
            Suas próximas histórias começam aqui
          </h1>

          <p>
            Seus destinos, viajantes e orçamento em
            um só lugar.
          </p>
        </div>

        <Link
          className="destinations-explore"
          to="/"
        >
          <FiCompass aria-hidden="true" />
          Explorar destinos
        </Link>
      </div>

      <div className="destinations-stats">
        <div>
          <span>
            <FiMapPin aria-hidden="true" />
          </span>

          <p>
            <strong>{quantidadeDestinos}</strong>
            destinos salvos
          </p>
        </div>

        <div>
          <span>
            <FiUsers aria-hidden="true" />
          </span>

          <p>
            <strong>{totalViajantes}</strong>
            viajantes no total
          </p>
        </div>

        <div>
          <span>
            <FiDollarSign aria-hidden="true" />
          </span>

          <p>
            <strong>
              {totalPlanejado.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </strong>

            planejados
          </p>
        </div>
      </div>
    </section>
  );
}

export default DestinationsOverview;