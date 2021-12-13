import './style.css';
import { useState } from 'react';

export function Filtros({ dadosTransacoes, setDadosTransacoes, carregarTransacoes }) {

    const [mudarClassDom, setMudarClasseDom] = useState(true);
    const [mudarClassSeg, setMudarClasseSeg] = useState(true);
    const [mudarClassTer, setMudarClasseTer] = useState(true);
    const [mudarClassQua, setMudarClasseQua] = useState(true);
    const [mudarClassQui, setMudarClasseQui] = useState(true);
    const [mudarClassSex, setMudarClasseSex] = useState(true);
    const [mudarClassSab, setMudarClasseSab] = useState(true);
    const [mudarClassCategoria, setMudarClasseCategoria] = useState(true);
    const [valorMin, setValorMin] = useState(0);
    const [valorMax, setValorMax] = useState(0);


    function handleLimpar() {
        setMudarClasseDom(true);
        setMudarClasseSeg(true);
        setMudarClasseTer(true);
        setMudarClasseQua(true);
        setMudarClasseQui(true);
        setMudarClasseSex(true);
        setMudarClasseSab(true);
        setMudarClasseCategoria(true);
        setValorMax(0);
        setValorMin(0);
        carregarTransacoes();
    }
    function handleFiltrar() {
        let novosDados = [...dadosTransacoes];
        let dadosFiltrados;
        if (!mudarClassDom) {
            dadosFiltrados = novosDados.filter(item => item.week_day === "domingo");
            if (dadosFiltrados.length === 0) {
                return;
            } else {
                setDadosTransacoes(dadosFiltrados);

            }
        }
        if (!mudarClassSeg) {
            dadosFiltrados = novosDados.filter(item => item.week_day === "segunda-feira");
            if (dadosFiltrados.length === 0) {
                return;
            } else {
                setDadosTransacoes(dadosFiltrados);

            }
            setDadosTransacoes(dadosFiltrados);
        }
        if (!mudarClassTer) {
            dadosFiltrados = novosDados.filter(item => item.week_day === "terça-feira");
            if (dadosFiltrados.length === 0) {
                return;
            } else {
                setDadosTransacoes(dadosFiltrados);

            }
            setDadosTransacoes(dadosFiltrados);
        }
        if (!mudarClassQua) {
            dadosFiltrados = novosDados.filter(item => item.week_day === "quarta-feira");
            if (dadosFiltrados.length === 0) {
                return;
            } else {
                setDadosTransacoes(dadosFiltrados);

            }
            setDadosTransacoes(dadosFiltrados);
        }
        if (!mudarClassQui) {
            dadosFiltrados = novosDados.filter(item => item.week_day === "quinta-feira");
            if (dadosFiltrados.length === 0) {
                return;
            } else {
                setDadosTransacoes(dadosFiltrados);

            }
            setDadosTransacoes(dadosFiltrados);
        }
        if (!mudarClassSex) {
            dadosFiltrados = novosDados.filter(item => item.week_day === "sexta-feira");
            if (dadosFiltrados.length === 0) {
                return;
            } else {
                setDadosTransacoes(dadosFiltrados);

            }
            setDadosTransacoes(dadosFiltrados);
        }
        if (!mudarClassSab) {
            dadosFiltrados = novosDados.filter(item => item.week_day === "sábado");
            if (dadosFiltrados.length === 0) {
                return;
            } else {
                setDadosTransacoes(dadosFiltrados);

            }
            setDadosTransacoes(dadosFiltrados);
        }

        if (valorMax === 0 && valorMin === 0) {
            return
        }
        if (valorMin === 0 && valorMax > 0) {
            dadosFiltrados = novosDados.filter(item => parseInt(item.value) <= valorMax);
            setDadosTransacoes(dadosFiltrados);
            return;
        }
        if (valorMax === 0 && valorMin > 0) {
            dadosFiltrados = novosDados.filter(item => parseInt(item.value) >= valorMin);
            setDadosTransacoes(dadosFiltrados);
            return;
        }
        dadosFiltrados = novosDados.filter(item => parseInt(item.value) >= valorMin && parseInt(item.value) <= valorMax);
        if (dadosFiltrados.length === 0) {
            return
        } else {
            setDadosTransacoes(dadosFiltrados);

        }
    }

    return (
        <div className="container-filters">
            <div className="dia-semana">
                <div className="title">
                    <span>Dia da semana</span>
                </div>
                <div className="container-chip">
                    <span className={mudarClassDom ? "dia" : "nova-cor"} onClick={() => setMudarClasseDom(!mudarClassDom)}>Domingo
                        <span className="icon-filter">{mudarClassDom ? "+" : "x"}</span>
                    </span>
                    <span className={mudarClassSeg ? "dia" : "nova-cor"} onClick={() => setMudarClasseSeg(!mudarClassSeg)}>Segunda
                        <span className="icon-filter">{mudarClassSeg ? "+" : "x"}</span>
                    </span>
                    <span className={mudarClassTer ? "dia" : "nova-cor"} onClick={() => setMudarClasseTer(!mudarClassTer)}>Terça
                        <span className="icon-filter">{mudarClassTer ? "+" : "x"}</span>
                    </span>
                    <span className={mudarClassQua ? "dia" : "nova-cor"} onClick={() => setMudarClasseQua(!mudarClassQua)}>Quarta
                        <span className="icon-filter">{mudarClassQua ? "+" : "x"}</span>
                    </span>
                    <span className={mudarClassQui ? "dia" : "nova-cor"} onClick={() => setMudarClasseQui(!mudarClassQui)}>Quinta
                        <span className="icon-filter">{mudarClassQui ? "+" : "x"}</span>
                    </span>
                    <span className={mudarClassSex ? "dia" : "nova-cor"} onClick={() => setMudarClasseSex(!mudarClassSex)}>Sexta
                        <span className="icon-filter">{mudarClassSex ? "+" : "x"}</span>
                    </span>
                    <span className={mudarClassSab ? "dia" : "nova-cor"} onClick={() => setMudarClasseSab(!mudarClassSab)}>Sábado
                        <span className="icon-filter">{mudarClassSab ? "+" : "x"}</span>
                    </span>
                </div>
            </div>

            <div className="categorias">
                <div className="title">
                    <span>Categoria</span>
                </div>
                <div className="categoria">
                    {dadosTransacoes.map(item => (
                        <span id={item.id} className={mudarClassCategoria ? "dia" : "nova-cor"}>{item.category}
                            <span>{mudarClassCategoria ? "+" : "x"}</span>
                        </span>
                    ))}
                </div>

            </div>

            <div className="valor">
                <div className="title">
                    <span>Valor</span>
                </div>
                <div className="valores">
                    <div className="min">
                        <label>Min</label>
                        <input id="min-value" className="input-valor" type="number" value={valorMin} onChange={(e) => setValorMin(e.target.value)} />
                    </div>
                    <div className="max">
                        <label>Max</label>
                        <input id="max value" className="input-valor" type="number" value={valorMax} onChange={(e) => setValorMax(e.target.value)} />
                    </div>
                </div>

            </div>

            <div className="btn-filtros">
                <button className="btn-clear-filters" onClick={() => handleLimpar()}>Limpar Filtros</button>
                <button className="btn-apply-filters" onClick={() => handleFiltrar()} >Aplicar Filtros</button>

            </div>

        </div>
    )
}