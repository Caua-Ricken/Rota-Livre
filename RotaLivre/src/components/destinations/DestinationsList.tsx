import { useState } from 'react';
import './DestinationsList.css';

import {
  FiArrowRight,
  FiBarChart2,
  FiSearch,
  FiTrash2,
  FiUser,
  FiUsers,
} from 'react-icons/fi';

import {
  IoBedOutline,
  IoRestaurantOutline,
  IoCarOutline,
} from 'react-icons/io5';

import imagemPadrao from '../../assets/lisbon-hero.png';

export interface Destino {
  chave: string;
  id: string | number;
  cidade: string;
  pais?: string;
  imagem?: string;
  viajantes: number;
  atualizadoEm?: number;

  orcamento: {
    hospedagem: string;
    alimentacao: string;
    transporte: string;
  };
}

interface Props {
  destinos: Destino[];
  onExcluir: (destino: Destino) => void;
}

const campos = [
  {
    key: 'hospedagem',
    nome: 'Hospedagem',
    Icone: IoBedOutline,
  },
  {
    key: 'alimentacao',
    nome: 'Alimentação',
    Icone: IoRestaurantOutline,
  },
  {
    key: 'transporte',
    nome: 'Transporte',
    Icone: IoCarOutline,
  },
] as const;

function moeda(valor: number) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function converterValor(entrada: string) {
  const numero = Number(entrada);

  return Number.isFinite(numero) && numero >= 0
    ? numero
    : 0;
}

export function calcularTotal(destino: Destino) {
  return (
    converterValor(destino.orcamento.hospedagem) +
    converterValor(destino.orcamento.alimentacao) +
    converterValor(destino.orcamento.transporte)
  );
}

const mostrarOrcamento = (destino: Destino) => {
  const total = calcularTotal(destino);

  return (
    <>
      <h3>Orçamento planejado</h3>

      <dl className="destino-gastos">
        {campos.map(({ key, nome, Icone }) => (
          <div key={key}>
            <dt>
              <Icone aria-hidden="true" />
              {nome}
            </dt>

            <dd>
              {moeda(
                converterValor(destino.orcamento[key])
              )}
            </dd>
          </div>
        ))}

        <div className="destino-total">
          <dt>
            <FiBarChart2 aria-hidden="true" />
            Total previsto
          </dt>

          <dd>{moeda(total)}</dd>
        </div>
      </dl>

      <p className="destino-pessoa">
        <FiUser aria-hidden="true" />
        {moeda(total / destino.viajantes)} por pessoa
      </p>
    </>
  );
}

const DestinationsList = ({destinos, onExcluir,}: Props) => {
  const [busca, setBusca] = useState('');
  const [ordem, setOrdem] = useState('recentes');

  const [selecionado, setSelecionado] =
    useState<Destino | null>(null);

  const destinosFiltrados = destinos
    .filter((destino) => {
      const texto =
        `${destino.cidade} ${destino.pais || ''}`;

      return texto
        .toLowerCase()
        .includes(busca.toLowerCase());
    })
    .sort((a, b) => {
      if (ordem === 'nome') {
        return a.cidade.localeCompare(b.cidade, 'pt-BR');
      }

      if (ordem === 'menor') {
        return calcularTotal(a) - calcularTotal(b);
      }

      return (
        (b.atualizadoEm || 0) -
        (a.atualizadoEm || 0)
      );
    });

  return (
    <section>
      <div className="destinations-toolbar">
        <h2>Meus Destinos</h2>

        <div>
          <label className="destinations-search">
            <FiSearch aria-hidden="true" />

            <input
              aria-label="Buscar destino"
              placeholder="Buscar destino..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </label>

          <select
            aria-label="Ordenar destinos"
            value={ordem}
            onChange={(e) => setOrdem(e.target.value)}
          >
            <option value="recentes">Mais recentes</option>
            <option value="nome">Nome A–Z</option>
            <option value="menor">Menor orçamento</option>
          </select>
        </div>
      </div>

      <div className="destinations-grid">
        {destinosFiltrados.map((destino) => (
          <article
            className="destino-card"
            key={destino.chave}
          >
            <div className="destino-foto">
              <img
                src={destino.imagem || imagemPadrao}
                alt={
                  destino.imagem
                    ? destino.cidade
                    : 'Paisagem ilustrativa de viagem'
                }
              />

              <button
                type="button"
                aria-label={`Excluir ${destino.cidade}`}
                onClick={() => onExcluir(destino)}
              >
                <FiTrash2 aria-hidden="true" />
              </button>
            </div>

            <div className="destino-corpo">
              <div className="destino-identidade">
                <div>
                  <h2>{destino.cidade}</h2>
                  <p>{destino.pais}</p>
                </div>

                <span>
                  <FiUsers aria-hidden="true" />

                  {destino.viajantes}{' '}
                  {destino.viajantes === 1
                    ? 'viajante'
                    : 'viajantes'}
                </span>
              </div>

              {mostrarOrcamento(destino)}

              <button
                className="destino-planejamento"
                type="button"
                onClick={() => setSelecionado(destino)}
              >
                Ver planejamento
                <FiArrowRight aria-hidden="true" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {destinosFiltrados.length === 0 && (
        <div className="destinations-empty">
          <h2>
            {destinos.length
              ? 'Nenhum destino encontrado'
              : 'Você ainda não salvou destinos'}
          </h2>

          <p>
            {destinos.length
              ? 'Experimente buscar por outra cidade.'
              : 'Explore uma cidade e salve seu planejamento.'}
          </p>
        </div>
      )}

      {selecionado && (
        <div
          className="destino-modal-fundo"
          onClick={() => setSelecionado(null)}
        >
          <div
            className="destino-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="planejamento-titulo"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="destino-modal-fechar"
              type="button"
              aria-label="Fechar planejamento"
              onClick={() => setSelecionado(null)}
            >
              ×
            </button>

            <h2 id="planejamento-titulo">
              Planejamento de {selecionado.cidade}
            </h2>

            <p>
              {selecionado.viajantes}{' '}
              {selecionado.viajantes === 1
                ? 'viajante'
                : 'viajantes'}
            </p>

            {mostrarOrcamento(selecionado)}
          </div>
        </div>
      )}
    </section>
  );
};

export default DestinationsList;