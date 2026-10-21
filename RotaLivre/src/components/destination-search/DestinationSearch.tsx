import { useState } from 'react';
import type { FormEvent } from 'react';
import { FiMapPin, FiUser } from 'react-icons/fi';
import { buscarCidade } from '../../services/CidadeService';
import { imageService } from '../../services/ImageService';
import { climaService } from '../../services/ClimaService';
import type { ClimaAtual } from '../../services/ClimaService';
import './DestinationSearch.css';

interface DestinationSearchProps {
  onResult: (imagem: string, cidade: string, clima: ClimaAtual, viajantes: number, pais: string) => void;
}

interface Cidade {
  id: number;
  name: string;
  admin1?: string;
  country: string;
  latitude: number;
  longitude: number;
}

const DestinationSearch = ({ onResult }: DestinationSearchProps) => {
  
  const [cidade, setCidade] = useState('');
  const [viajantes, setViajantes] = useState('1');
  const [resultado, setResultado] = useState<Cidade[]>([]);

  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErro('');
    setMensagem('');
    setResultado([]);

    if (!cidade.trim()) {
      setErro('Informe uma cidade.');
      return;
    }

    setCarregando(true);

    try {
      const cidades = await buscarCidade(cidade.trim());
      const primeirasCidades = cidades.slice(0, 5);

      if (primeirasCidades.length === 0) {
        setErro('Nenhuma cidade encontrada.');
        return;
      }

      setResultado(primeirasCidades);

    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : 'Não foi possível buscar a cidade.'
      );
    } finally {
      setCarregando(false);
    }
  }

  const selecionarCidade = async (cidadeSelecionada: Cidade) => {
    setErro('');
    setMensagem('');
    setCarregando(true);

    try {
      const imagem = await imageService(cidadeSelecionada.name);
      const clima = await climaService(cidadeSelecionada.name);
      console.log('Clima recebido:', clima);

      onResult(imagem, cidadeSelecionada.name, clima, Number(viajantes), cidadeSelecionada.country);

      setCidade(cidadeSelecionada.name);
      setResultado([]);
      setMensagem(
        `Cidade selecionada: ${cidadeSelecionada.name}. Viajantes: ${viajantes}.`
      );

    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : 'Não foi possível carregar a imagem da cidade.'
      );
    } finally {
      setCarregando(false);
    }
  }

  function limparCidade() {
    setCidade('');
    setResultado([]);
    setMensagem('');
    setErro('');

    document.getElementById('destination-city')?.focus();
  }

  return (
    <div className="destination-search">
      <form
        className="destination-search__form"
        onSubmit={handleSubmit}
        aria-busy={carregando}
      >
        <div className="destination-search__field destination-search__city">
          <FiMapPin
            className="destination-search__icon"
            aria-hidden="true"
          />

          <span className="destination-search__control">
            <label
              className="destination-search__label"
              htmlFor="destination-city"
            >
              Cidade
            </label>

            <input
              id="destination-city"
              type="text"
              placeholder="Para onde você quer ir?"
              value={cidade}
              onChange={(e) => {
                setCidade(e.target.value);
                setResultado([]);
                setMensagem('');
                setErro('');
              }}
              disabled={carregando}
              required
            />
          </span>

          {cidade && (
            <button
              className="destination-search__clear"
              type="button"
              aria-label="Limpar cidade"
              disabled={carregando}
              onClick={limparCidade}
            >
              ×
            </button>
          )}
        </div>

        <label className="destination-search__field destination-search__travelers">
          <FiUser
            className="destination-search__icon"
            aria-hidden="true"
          />

          <span className="destination-search__control">
            <span className="destination-search__label">
              Viajantes
            </span>

            <select
              value={viajantes}
              onChange={(e) => {
                setViajantes(e.target.value);
                setMensagem('');
              }}
              disabled={carregando}
            >
              <option value="1">1 pessoa</option>
              <option value="2">2 pessoas</option>
              <option value="3">3 pessoas</option>
              <option value="4">4 pessoas</option>
              <option value="5">5 pessoas</option>
              <option value="6">6 pessoas</option>
            </select>
          </span>

          <span
            className="destination-search__arrow"
            aria-hidden="true"
          />
        </label>

        <button
          className="destination-search__submit"
          type="submit"
          disabled={carregando}
        >
          <span
            className="destination-search__magnifier"
            aria-hidden="true"
          />

          {carregando ? 'Buscando...' : 'Explorar destino'}
        </button>
      </form>

      {resultado.length > 0 && (
        <ul
          className="destination-search__results"
          aria-label="Cidades encontradas"
          aria-busy={carregando}
        >
          {resultado.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                disabled={carregando}
                onClick={() => selecionarCidade(item)}
              >
                <FiMapPin aria-hidden="true" />

                {[item.name, item.admin1, item.country]
                  .filter(Boolean)
                  .join(' — ')}
              </button>
            </li>
          ))}
        </ul>
      )}

      {mensagem && (
        <p className="destination-search__success" role="status">
          {mensagem}
        </p>
      )}

      {erro && (
        <p className="destination-search__error" role="alert">
          {erro}
        </p>
      )}
    </div>
  );
};

export default DestinationSearch;
