interface Condicao {
    weatherCode: string;
    weatherDesc: { value: string }[];
    lang_pt?: { value: string }[];
}

export interface ClimaAtual {
    atual: Condicao & {
        temp_C: string;
    };
    previsao: {
        date: string;
        maxtempC: string;
        mintempC: string;
        hourly: (Condicao & { time: string })[];
    }[];
}


export const climaService = async (cidade: string): Promise<ClimaAtual> => {
    const res = await fetch(`https://wttr.in/${cidade}?format=j1&lang=pt`);

    if (!res.ok) {
        throw new Error('Erro ao consultar o clima da cidade.');
    };

    const data = await res.json();
    if (!data.current_condition || !data.current_condition[0]) {
        throw new Error('Clima da cidade não encontrado.');
    };


    return {
        atual: data.current_condition[0],
        previsao: data.weather ?? [],
    };
}