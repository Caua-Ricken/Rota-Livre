import { useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

import DestinationsOverview from '../../components/destinations/DestinationsOverview';

import DestinationsList, {
  calcularTotal,
} from '../../components/destinations/DestinationsList';

import type { Destino } from '../../components/destinations/DestinationsList';

import './Destinations.css';

function carregarDestinos(): Destino[] {
  const destinos: Destino[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const chave = localStorage.key(i);

    if (!chave?.startsWith('planejamento-')) {
      continue;
    }

    try {
      const dados = JSON.parse(
        localStorage.getItem(chave) || 'null'
      );

      if (
        !dados ||
        typeof dados.cidade !== 'string' ||
        !dados.orcamento
      ) {
        continue;
      }

      destinos.push({
        ...dados,
        chave,
        viajantes: Math.max(
          1,
          Number(dados.viajantes) || 1
        ),
      });
    } catch {
    }
  }

  return destinos;
}

const Destinations = () => {
  const [destinos, setDestinos] = useState(
    carregarDestinos
  );

  const [erro, setErro] = useState('');

  const totalViajantes = destinos.reduce(
    (soma, destino) => soma + destino.viajantes,
    0
  );

  const totalPlanejado = destinos.reduce(
    (soma, destino) => soma + calcularTotal(destino),
    0
  );

  function excluirDestino(destino: Destino) {
    const confirmou = window.confirm(
      `Excluir o planejamento de ${destino.cidade}?`
    );

    if (!confirmou) {
      return;
    }

    try {
      localStorage.removeItem(destino.chave);

      setDestinos((atuais) =>
        atuais.filter(
          (item) => item.chave !== destino.chave
        )
      );

      setErro('');
    } catch {
      setErro(
        'Não foi possível excluir o destino. Tente novamente.'
      );
    }
  }

  return (
    <div className="destinations-page">
      <Header />

      <main className="page-container destinations-main">
        <p className="destinations-breadcrumb">
          <Link to="/">Início</Link>
          {' / '}
          Meus Destinos
        </p>

        <DestinationsOverview
          quantidadeDestinos={destinos.length}
          totalViajantes={totalViajantes}
          totalPlanejado={totalPlanejado}
        />

        {erro && <p role="alert">{erro}</p>}

        <DestinationsList
          destinos={destinos}
          onExcluir={excluirDestino}
        />
      </main>

      <Footer />
    </div>
  );
}

export default Destinations;