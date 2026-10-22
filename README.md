# 🌍 Rota Livre

Planejador de viagens desenvolvido com **React e TypeScript**, que permite explorar destinos, consultar o clima e organizar o orçamento da viagem.

🔗 **[Acesse o projeto](https://caua-ricken.github.io/Rota-Livre/)**

## 📌 Sobre

O Rota Livre reúne informações para ajudar no planejamento de uma viagem: imagens do destino, previsão do tempo, conversão de moeda e estimativa de gastos.

A aplicação funciona inteiramente no front-end, consumindo APIs externas e utilizando o localStorage para salvar os planejamentos no navegador.

## ✨ Funcionalidades

- Pesquisa de cidades com seleção entre os resultados.
- Exibição de imagens do destino.
- Consulta do clima atual e da previsão do tempo.
- Planejamento de gastos com hospedagem, alimentação e transporte.
- Consulta de câmbio e conversão de reais para euros.
- Definição da quantidade de viajantes.
- Salvamento de destinos e orçamentos.
- Página “Meus Destinos” para consultar viagens salvas.
- Carrossel de destinos na página inicial.
- Layout responsivo.

## 🛠️ Tecnologias

- React
- TypeScript
- Vite
- CSS
- React Router
- React Icons
- APIs REST
- localStorage
- Git e GitHub
- GitHub Pages

## 🚀 Como executar

### Pré-requisitos

Tenha o Node.js e o npm instalados.

### Instalação

Clone o repositório:

```bash
git clone https://github.com/Caua-Ricken/Rota-Livre.git
```

Entre na pasta que contém o arquivo `package.json` e instale as dependências:

```bash
npm install
```

Caso alguma integração exija variáveis de ambiente, configure um arquivo `.env` na raiz da aplicação com os nomes utilizados pelos serviços.

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra no navegador o endereço informado pelo terminal.

### Build de produção

```bash
npm run build
```

Para visualizar o build localmente:

```bash
npm run preview
```

## 💾 Armazenamento

Os destinos e planejamentos são salvos no localStorage do navegador.

Esses dados ficam disponíveis no mesmo navegador e dispositivo em que foram cadastrados. A limpeza dos dados do site remove as informações salvas.

## 📚 Aprendizados

Este projeto foi desenvolvido para praticar:

- Componentização e reutilização de componentes.
- Tipagem de dados e props com TypeScript.
- Gerenciamento de estado com React.
- Comunicação entre componentes.
- Consumo de APIs com requisições assíncronas.
- Tratamento de erros e estados de carregamento.
- Persistência de dados com localStorage.
- Estilização responsiva.
- Publicação de uma aplicação com Vite no GitHub Pages.

## ℹ️ Observações

- As consultas dependem da disponibilidade das APIs externas.
- Os valores de hospedagem, alimentação e transporte são estimativas preenchidas pelo usuário.
- O projeto não realiza reservas nem compras de viagens.

## 👨‍💻 Autor

Desenvolvido por **Cauã Ricken**.

[GitHub](https://github.com/Caua-Ricken)
