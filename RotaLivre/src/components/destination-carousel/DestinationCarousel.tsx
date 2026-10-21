import { useEffect, useState } from 'react';

import lisboa from '../../assets/carossel/lisboa.webp';
import espanha from '../../assets/carossel/espanha.jpg';
import islandia from '../../assets/carossel/islandia.jpg'
import moscou from '../../assets/carossel/moscou.jpg'
import portorico from '../../assets/carossel/porto.jpg'


import './DestinationCarousel.css';

const imagens = [
  {
    foto: lisboa,
    cidade: 'Lisboa',
    pais: 'Portugal',
  },
  {
    foto: espanha,
    cidade: 'Plaza de España',
    pais: 'Espanha',
  },
  {
    foto: portorico,
    cidade: 'San Juan',
    pais: 'Porto Rico',
  },
  {
    foto: moscou,
    cidade: 'Moscou',
    pais: 'Russia',
  },
  {
    foto: islandia,
    cidade: 'Kirkjufellsfoss',
    pais: 'Islândia',
  },
];

const DestinationCarousel = () => {
    const [indice, setIndice] = useState(0);
  
    useEffect(() => {
      const intervalo = setInterval(() => {
        setIndice((atual) =>
          atual === imagens.length - 1 ? 0 : atual + 1
        );
      }, 4000);
  
      return () => clearInterval(intervalo);
    }, []);
  
    const imagem = imagens[indice];
  
    return (
      <section className="destination-carousel">
        <img
          src={imagem.foto}
          alt={`Vista de ${imagem.cidade}`}
        />
  
        <div className="destination-carousel__content">
          <span>Sua próxima história começa aqui</span>
          <h2>{imagem.cidade}</h2>
          <p>{imagem.pais}</p>
        </div>
      </section>
    );
  };
  
  export default DestinationCarousel;