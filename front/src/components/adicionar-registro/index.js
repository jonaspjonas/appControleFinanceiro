import './style.css';
import btnClose from '../../assets/close-adicionar.svg';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import add from 'date-fns/add';

export function AdicionarRegistro({ setAddRegistro, carregarTransacoes, editarTransacao, setEditarTransacao }) {
    const [valor, setValor] = useState(0);
    const [categoria, setCategoria] = useState("");
    const [data, setData] = useState("");
    const [descricao, setDescricao] = useState("");
    const [debitCredit, setDebitCredit] = useState("debit");
    const [erro, setErro] = useState(false);

    async function handleAddRegistro() {
        setEditarTransacao(false);
        if(valor === 0 || !valor || !categoria || !data || !descricao){
            setErro(true);
            return;
        }
        try {
            const dados = {
                value: valor,
                category: categoria,
                date: add(new Date(data),{days:1}),
                week_day: format(add(new Date(data),{days:1}), "EEEE", { locale: ptBR }),
                description: descricao,
                type: debitCredit
            }

            await fetch('http://localhost:3333/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados),
            });
            setAddRegistro(false);
            await carregarTransacoes();

        } catch (error) {
            console.log(error);
        }
    }

    async function handleEditarRegistro(editarTransacao) {
        if(valor === 0 || !valor || !categoria || !data || !descricao){
            setErro(true);
            return;
        }
        try {
            const dados = {
                value: valor,
                category: categoria,
                date: add(new Date(data), {days:1}),
                week_day: format(add(new Date(data), {days:1}), "EEEE", { locale: ptBR }),
                description: descricao,
                type: debitCredit
            }

            await fetch(`http://localhost:3333/transactions/${editarTransacao.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dados),
            });
            setAddRegistro(false);
            await carregarTransacoes();

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (editarTransacao) {
            setValor(editarTransacao.value);
            setCategoria(editarTransacao.category);
            setData(format(new Date(editarTransacao.date),'yyyy-MM-dd'));
            setDescricao(editarTransacao.description);
            
            if (editarTransacao.type === "credit"){
                setDebitCredit("credit")
            } else {
                setDebitCredit("debit")
            }
            return
        }

        setValor(0);
        setCategoria("");
        setData("");
        setDescricao("");
    }, [editarTransacao])

    return (
        <div className="modal-container">
            <div className="adicionar-registro">
                <div className="header-adicionar">
                    <h1>{editarTransacao ? "Editar Registro" : "Adicionar Registro"}</h1>
                    <img className="close-icon" src={btnClose} alt="" onClick={() => setAddRegistro(false)} />
                </div>
                <div className="entrada-saida">
                    {!editarTransacao &&
                        <div>
                            <button className={debitCredit === "debit" ? "entrada" : "credit"} onClick={() => setDebitCredit("credit")}>Entrada</button>
                            <button className={debitCredit === "debit" ? "saida" : "debit"} onClick={() => setDebitCredit("debit")}>Saída</button>
                        </div>

                    }
                    {editarTransacao &&
                        <div>
                            <button className={debitCredit === "debit" ? "entrada" : "credit"} onClick={() => setDebitCredit("credit")}>Entrada</button>
                            <button className={debitCredit === "debit" ? "saida" : "debit"} onClick={() => setDebitCredit("debit")}>Saída</button>
                        </div>

                    }

                </div>
                <div className="dados-adicionar">
                    {
                        erro &&
                        <div className="erro">
                            <span>Todos os campos são obrigatórios!!</span>
                        </div>
                    }
                    <label >Valor</label>
                    <input name="value" type="number" value={valor} onChange={(e) => setValor(e.target.value)} />
                    <label >Categoria</label>
                    <input name="category" type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
                    <label >Data</label>
                    <input name="date" type="date" value={data} mask="99/99/9999" onChange={(e) => setData(e.target.value)} />
                    <label >Descrição</label>
                    <input name="description" type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
                </div>
                <button className="btn-insert" onClick={() => editarTransacao ? handleEditarRegistro(editarTransacao) : handleAddRegistro()}>Confirmar</button>
            </div>

        </div>
    )
}