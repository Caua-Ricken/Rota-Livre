import { useState } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Hero from '../../components/hero/Hero';
import DestinationSearch from '../../components/destination-search/DestinationSearch';
import DestinationResult from '../../components/destination-result/DestinationResult';
import lisbonBackground from '../../assets/lisbon-hero.png';
import type { ClimaAtual } from '../../services/ClimaService';
import WeatherCard from '../../components/weather-card/WeatherCard';
import './ExplorePage.css';
import TravelPlanning from '../../components/travel-planning/TravelPlanning';
import TravelBudget from '../../components/travel-budget/TravelBudget';
import DestinationCarousel from '../../components/destination-carousel/DestinationCarousel';

interface ResultadoCidade {
    imagem: string;
    cidade: string;
    clima: ClimaAtual;
    viajantes: number;
    pais: string;
}

export default function ExplorePage() {
    const [resultado, setResultado] = useState<ResultadoCidade | null>(null);

    function receberResultado(imagem: string, cidade: string, clima: ClimaAtual, viajantes: number, pais: string) {
        setResultado({ imagem, cidade, clima, viajantes, pais });
    }

    return (
        <div className={`explore-page ${!resultado ? 'explore-page--inicio' : ''}`}>
            <div className="explore-background" aria-hidden="true">
                <img src={lisbonBackground} alt="" />
            </div>

            <Header />

            <main className="page-container">
                <Hero />

                <DestinationSearch onResult={receberResultado} />

                {!resultado && <DestinationCarousel />}

                {resultado && (
                    <div className="destination-layout">
                        <div className="destination-layout__left">
                            <DestinationResult
                                key={`${resultado.cidade}-${resultado.imagem}`}
                                imagem={resultado.imagem}
                                cidade={resultado.cidade}
                            />
                            <TravelPlanning key={resultado.cidade} destination={{ id: resultado.cidade, cidade: resultado.cidade, pais: resultado.pais, imagem: resultado.imagem }} viajantes={resultado.viajantes}  />
                        </div>
                        <div className="destination-layout__right">
                            <WeatherCard clima={resultado.clima} />
                            <TravelBudget />
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
