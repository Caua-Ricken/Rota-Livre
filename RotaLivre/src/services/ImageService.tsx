/*export const imageService = async (cidade: string) => {
    const res = await fetch(`https://pt.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cidade)}`);
    
    if (!res.ok) {
        throw new Error('Erro ao consultar a cidade.');
    };

    const data = await res.json();
    if (!data.thumbnail || !data.thumbnail.source) {
        throw new Error('Imagem da cidade não encontrada.');
    }

    return data.thumbnail.source;
};
*/
const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export const imageService = async (cidade: string) => {
    const res = await fetch(
  `https://api.unsplash.com/search/photos?query=${cidade}&orientation=landscape&per_page=6`,
  { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } }
);
    
    if (!res.ok) {
        throw new Error('Erro ao consultar a cidade.');
    };

    const data = await res.json();
    const foto = data.results?.[0];

    if (!foto) {
        throw new Error('Imagem da cidade não encontrada.');
    }

    return foto.urls.regular;
};