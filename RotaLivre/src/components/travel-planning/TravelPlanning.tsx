import { useState } from 'react';
import type { FormEvent } from 'react';
import { FiBookOpen, FiBookmark, FiTruck } from 'react-icons/fi';
import { IoBedOutline, IoRestaurantOutline } from 'react-icons/io5';
import { BsBookmarkFill } from 'react-icons/bs';
import './TravelPlanning.css';

interface Props {
  destination: {
    id: string | number;
    cidade: string;
    pais: string;
    imagem: string;
  };
  viajantes: number;
}

const fields = [
  { key: 'hospedagem', label: 'Hospedagem (R$)', Icon: IoBedOutline },
  { key: 'alimentacao', label: 'Alimentação (R$)', Icon: IoRestaurantOutline },
  { key: 'transporte', label: 'Transporte (R$)', Icon: FiTruck },
] as const;

const TravelPlanning = ({ destination, viajantes }: Props) => {
  const chave = `planejamento-${destination.id}`;

  const [values, setValues] = useState(() => {
    const dados = localStorage.getItem(chave);

    return dados
      ? JSON.parse(dados).orcamento
      : { hospedagem: '', alimentacao: '', transporte: '' };
  });

  const [salvo, setSalvo] = useState(() => {
    return localStorage.getItem(chave) !== null
  });

  const [mensagem, setMensagem] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const planejamento = {
      ...destination,
      viajantes,
      orcamento: values,
      atualizadoEm: Date.now(),
    };

    localStorage.setItem(chave, JSON.stringify(planejamento));
    setSalvo(true);
    setMensagem('Planejamento salvo!');
  }

  return (
    <section className="travel-planning">
      <div className="travel-planning__heading">
        <FiBookOpen />

        <div>
          <h2>Meu planejamento</h2>
          <p>Defina seus gastos estimados para esta viagem.</p>
        </div>
      </div>

      <form className="travel-planning__form" onSubmit={handleSubmit}>
        {fields.map(({ key, label, Icon }) => (
          <label className="travel-planning__field" key={key}>
            <span>{label}</span>

            <span className="travel-planning__input">
              <Icon />

              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0,00"
                value={values[key]}
                onChange={e => {
                  setValues({
                    ...values,
                    [key]: e.target.value,
                  });
                  setSalvo(false);
                  setMensagem('');
                }}
              />
            </span>
          </label>
        ))}

<button className="travel-planning__save" type="submit">
  {salvo ? <BsBookmarkFill /> : <FiBookmark />}
  {salvo ? 'Destino salvo' : 'Salvar destino'}
</button>
      </form>

      {mensagem && (
        <p className="travel-planning__success" role="status">
          {mensagem}
        </p>
      )}
    </section>
  );
}

export default TravelPlanning;