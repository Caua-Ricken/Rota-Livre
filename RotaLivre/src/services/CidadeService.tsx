export const buscarCidade = async (cidade: string) => {
    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cidade}&count=5&language=pt`)

    if (!res.ok) {
        throw new Error('Erro ao consultar a cidade.');
    };

    const data = await res.json();
    const cidadeEncontrada = data.results ?? [];

    if (!cidadeEncontrada) {
        throw new Error('Cidade não encontrada.');
    }

    return cidadeEncontrada;
}