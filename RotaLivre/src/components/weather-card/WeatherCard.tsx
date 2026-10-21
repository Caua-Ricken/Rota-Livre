import type { ClimaAtual } from '../../services/ClimaService';
import './WeatherCard.css';
import {
    WiCloud,
    WiDaySunny,
    WiDayCloudy,
    WiCloudy,
    WiFog,
    WiRain,
    WiSnow,
    WiThunderstorm,
} from 'react-icons/wi';

interface WeatherCardProps {
    clima: ClimaAtual;
}

const WeatherCard = ({ clima }: WeatherCardProps) => {
    const descricao =
        clima.atual.lang_pt?.[0]?.value ??
        clima.atual.weatherDesc[0]?.value ??
        'Descrição indisponível';

    const iconeClima = (codigo: string) => {
        if (codigo === '113') {
            return <WiDaySunny className="weather-icon--sun" />;
        }

        if (codigo === '116') {
            return <WiDayCloudy className="weather-icon--sun" />;
        }

        if (['119', '122'].includes(codigo)) {
            return <WiCloudy className="weather-icon--cloud" />;
        }

        if (['143', '248', '260'].includes(codigo)) {
            return <WiFog className="weather-icon--cloud" />;
        }

        if (['200', '386', '389', '392', '395'].includes(codigo)) {
            return <WiThunderstorm className="weather-icon--rain" />;
        }

        if (
            [
                '179', '182', '185', '227', '230', '281', '284',
                '311', '314', '317', '320', '323', '326', '329',
                '332', '335', '338', '350', '362', '365', '368',
                '371', '374', '377',
            ].includes(codigo)
        ) {
            return <WiSnow className="weather-icon--cloud" />;
        }

        if (
            [
                '176', '263', '266', '293', '296', '299',
                '302', '305', '308', '353', '356', '359',
            ].includes(codigo)
        ) {
            return <WiRain className="weather-icon--rain" />;
        }

        return <WiCloudy className="weather-icon--cloud" />;
    }

    return (
        <section className="weather-card">
            <h2>
                <WiCloud aria-hidden="true" />
                Clima no destino</h2>

            <div className="weather-card__current">
                <span className="weather-card__icon" aria-hidden="true">
                    {iconeClima(clima.atual.weatherCode)}
                </span>

                <div>
                    <p className="weather-card__temperature">
                        {clima.atual.temp_C}°C
                    </p>

                    <p className="weather-card__description">
                        {descricao}
                    </p>
                </div>
            </div>

            {clima.previsao.length > 0 && (
                <ul className="weather-card__forecast">
                    {clima.previsao.slice(0, 4).map((dia, index) => {
                        const condicao =
                            dia.hourly?.find((hora) => hora.time === '1200') ??
                            dia.hourly?.[0];

                        const descricaoDia =
                            condicao?.lang_pt?.[0]?.value ??
                            condicao?.weatherDesc[0]?.value ??
                            'Condição indisponível';

                        return (
                            <li key={dia.date}>
                                <span className="weather-card__day">
                                    {index === 0
                                        ? 'Hoje'
                                        : new Date(`${dia.date}T12:00:00`)
                                            .toLocaleDateString('pt-BR', {
                                                weekday: 'short',
                                                day: 'numeric',
                                            })}
                                </span>

                                <span
                                    className="weather-card__day-icon"
                                    role="img"
                                    aria-label={descricaoDia}
                                >
                                    {iconeClima(condicao?.weatherCode ?? '')}
                                </span>

                                <div className="weather-card__range">
                                    <span title="Temperatura máxima">{dia.maxtempC}°</span>
                                    <span title="Temperatura mínima">{dia.mintempC}°</span>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </section>
    );
};

export default WeatherCard;