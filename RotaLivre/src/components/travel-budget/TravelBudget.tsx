import { useState, useEffect } from 'react';
import { FiDatabase, FiInfo, FiRepeat } from 'react-icons/fi';
import { buscarCotacao } from '../../services/MoedaService';
import './TravelBudget.css';

const TravelBudget = () => {
    const [valor, setValor] = useState('');
    const [moeda, setMoeda] = useState('EUR');
    const [cotacao, setCotacao] = useState<number | null>(null);
    const [erro, setErro] = useState('');

    useEffect(() => {
        let ativo = true;

        const carregarCotacao = async () => {
            setCotacao(null);
            setErro('');

            try {
                const cotacaoRecebida = await buscarCotacao(moeda);

                if (ativo) {
                    setCotacao(cotacaoRecebida);
                }
            } catch {
                if (ativo) {
                    setErro('Não foi possível carregar a cotação.');
                }
            }
        };

        carregarCotacao();

        return () => {
            ativo = false;
        };
    }, [moeda]);

    const valorConvertido = cotacao ? Number(valor) / cotacao : 0;

    return (
        <section className="travel-budget">
            <div className="travel-budget__heading">
                <h2>
                    <FiDatabase aria-hidden="true" />
                    Seu orçamento
                </h2>

                <span>
                    Cotação de compra
                    <FiInfo aria-hidden="true" />
                </span>
            </div>

            <div className="travel-budget__conversion">
                <label className="travel-budget__field">
                    <span>Seu orçamento em reais (BRL)</span>

                    <div className="travel-budget__input">
                        <span>R$</span>

                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="5.000,00"
                            value={valor}
                            onChange={e => setValor(e.target.value)}
                        />
                    </div>
                </label>

                <FiRepeat
                    className="travel-budget__arrow"
                    aria-hidden="true"
                />

                <div className="travel-budget__field">
                    <label htmlFor="moeda">Converter para</label>

                    <select
                        id="moeda"
                        className="travel-budget__select"
                        value={moeda}
                        onChange={e => {
                            setMoeda(e.target.value);
                            setCotacao(null);
                            setErro('');
                        }}
                    >
                        <option value="EUR">Euro (EUR)</option>
                        <option value="USD">Dólar (USD)</option>
                    </select>

                    <output className="travel-budget__result">
                        {erro
                            ? 'Indisponível'
                            : cotacao === null
                                ? 'Carregando...'
                                : valorConvertido.toLocaleString('pt-BR', {
                                    style: 'currency',
                                    currency: moeda,
                                })}
                    </output>
                </div>
            </div>

            <div className="travel-budget__notice">
                <FiInfo aria-hidden="true" />

                <p>
                    {erro || (
                        cotacao === null
                            ? 'Consultando cotação...'
                            : `Cotação de compra: 1 ${moeda} = ${cotacao.toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                                maximumFractionDigits: 4,
                            })}. Conversão estimada, sem taxas e impostos.`
                    )}
                </p>
            </div>
        </section>
    );
};

export default TravelBudget;