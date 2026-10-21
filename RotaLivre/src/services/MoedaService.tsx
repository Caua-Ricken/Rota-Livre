export const buscarCotacao = async (moeda: string = 'EUR') => {
    const res = await fetch(
      `https://economia.awesomeapi.com.br/json/last/${moeda}-BRL`
    );
  
    if (!res.ok) {
      throw new Error('Erro ao consultar a cotação.');
    }
  
    const data = await res.json();
  
    return Number(data[`${moeda}BRL`].bid);
  };