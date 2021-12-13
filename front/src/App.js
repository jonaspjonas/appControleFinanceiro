import { AdicionarRegistro } from './components/adicionar-registro';
import { Filtros } from './components/filtros';
import { TabelaTransacoes } from './components/tabela-transacoes';
import logo from './assets/logo.svg';
import iconFiltro from './assets/icon-filtro.svg';
import iconDecrescente from './assets/ordemCrescente.svg';
import iconCrescente from './assets/ordemDecrescente.svg';

import { useState, useEffect } from 'react';

function App() {

  const [exibirFiltro, setExibirFiltro] = useState(false);
  const [addRegistro, setAddRegistro] = useState(false);
  const [dadosTransacoes, setDadosTransacoes] = useState([]);
  const [carregouDados, setCarregouDados] = useState(false);
  const [creditos, setCreditos] = useState(0);
  const [debitos, setDebitos] = useState(0);
  const [saldo, setSaldo] = useState(0);
  const [editarTransacao, setEditarTransacao] = useState(false);
  const [iconValor, setIconValor] = useState();
  const [iconData, setIconData] = useState();
  const [iconDia, setIconDia] = useState();

  useEffect(() => {
    carregarTransacoes()
  }, []);

  async function carregarTransacoes() {
    try {
      const resposta = await fetch('http://localhost:3333/transactions', {
        method: 'GET'
      });

      const dados = await resposta.json();
      setDadosTransacoes(dados)
      setCarregouDados(true)

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    let entradas = 0;
    let saidas = 0;
    if (carregouDados) {
      dadosTransacoes.map(item => item.type === "credit" ? entradas += parseInt(item.value) : saidas += parseInt(item.value))
    }
    setCreditos(entradas);
    setDebitos(saidas);
    setSaldo(creditos - debitos);
  }, [carregouDados, dadosTransacoes, creditos, debitos]);


  function handleAddRegistro() {
    setAddRegistro(true);
    setEditarTransacao(false);
    console.log(dadosTransacoes);

  }

  function handleOrdenarValor(dados) {
    if (!iconValor || iconValor === iconDecrescente) {
      dados.sort(function (a, b) {
        return a.value - b.value;
      });
      setIconValor(iconCrescente);
      setDadosTransacoes(dados);
      setIconData();
      setIconDia();
      return;
    }

    if (iconValor === iconCrescente) {
      dados.sort(function (a, b) {
        return b.value - a.value;
      });
      setDadosTransacoes(dados);
      setIconValor(iconDecrescente);
      setIconData();
      setIconDia();
      return;
    }

  }

  function handleOrdenarData(dados) {
    if (!iconData || iconData === iconDecrescente) {
      dados.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
      });
      setIconData(iconCrescente);
      setDadosTransacoes(dados);
      setIconValor();
      setIconDia();
      return;
    }

    if (iconData === iconCrescente) {
      dados.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
      setDadosTransacoes(dados);
      setIconData(iconDecrescente);
      setIconValor();
      setIconDia();
      return;
    }

  }

  function handleOrdenarDia(dados) {
    if (!iconDia || iconDia === iconDecrescente) {
      dados.sort(function (a, b) {
        return new Date(a.date).getDay() - new Date(b.date).getDay();
      });
      setIconDia(iconCrescente);
      setDadosTransacoes(dados);
      setIconValor();
      setIconData();
      return;
    }

    if (iconDia === iconCrescente) {
      dados.sort(function (a, b) {
        return new Date(b.date).getDay() - new Date(a.date).getDay();
      });
      setDadosTransacoes(dados);
      setIconDia(iconDecrescente);
      setIconData();
      setIconValor();
      return;
    }

  }


  return (
    <div className="App">
      <header className="container-header">
        <div className="logo">
          <img width="45" height="45" src={logo} alt="Logo" />
          <h1>Seu Bolso</h1>
        </div>
      </header>
      <div className="home">
        <div className="open-filters-button" onClick={() => setExibirFiltro(!exibirFiltro)}>
          <img src={iconFiltro} alt="icon-filtro" />
          <span>Filtrar</span>
        </div>

        <div className="filter-resume">
          <div>
            {exibirFiltro && <Filtros dadosTransacoes={dadosTransacoes} 
            setDadosTransacoes={setDadosTransacoes} carregarTransacoes={carregarTransacoes} />}
          </div>

          <div className="container-resume">
            <div className="resumo">
              <div className="top-resumo">
                <span className="txt-resumo">Resumo</span>
                <div className="in">
                  <span>Entradas</span>
                  <span style={{ color: "green" }}>{creditos.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
                </div>
                <div className="out">
                  <span>Saídas</span>
                  <span style={{ color: "red" }}>{debitos.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
                </div>
              </div>
              <div className="balance">
                <span>Saldo </span>
                <span style={{ color: "blue" }}>{saldo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
              </div>
            </div>
            <button className="btn-add" type="" onClick={() => handleAddRegistro()}>Adicionar Registro</button>
          </div>
        </div>

        <div className="table-div">
          <table className="table">
            <thead>
              <tr className="table-head">
                <th className="column-title" id="date" style={{ cursor: 'pointer' }} onClick={() => handleOrdenarData(dadosTransacoes)}>Data<img src={iconData} alt="" /></th>
                <th id="week-day" style={{ cursor: 'pointer' }} onClick={() => handleOrdenarDia(dadosTransacoes)}>Dia da semana<img src={iconDia} alt="" /></th>
                <th>Descrição</th>
                <th>Categoria</th>
                <th style={{ cursor: 'pointer' }} onClick={() => handleOrdenarValor(dadosTransacoes)}>Valor<img src={iconValor} alt="" /></th>
                <th></th>
                <th></th>
              </tr>
            </thead>

            <tbody className="table-body">

              {carregouDados && dadosTransacoes.map(transacoes => <TabelaTransacoes key={transacoes.id} transacoes={transacoes}
                carregarTransacoes={carregarTransacoes} setCreditos={setCreditos}
                setDebitos={setDebitos} creditos={creditos} setAddRegistro={setAddRegistro}
                setEditarTransacao={setEditarTransacao} />)}

            </tbody>
          </table>

        </div>
        {addRegistro && <AdicionarRegistro setAddRegistro={setAddRegistro} carregarTransacoes={carregarTransacoes}
          editarTransacao={editarTransacao} setEditarTransacao={setEditarTransacao} />}
      </div>

    </div>
  );
}

export default App;
