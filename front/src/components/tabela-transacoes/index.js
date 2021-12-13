import './style.css';
import btnEditar from '../../assets/btn-editar.svg';
import btnExcluir from '../../assets/btn-excluir.svg';
import { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';


export function TabelaTransacoes({ transacoes, carregarTransacoes, setAddRegistro, setEditarTransacao }) {
    const [mostraModal, setMostrarModal] = useState(false);

    async function handleDeleteTransaction(id) {
        try {
            await fetch(`http://localhost:3333/transactions/${id}`, {
                method: 'DELETE',
            });

            await carregarTransacoes();
            setMostrarModal(false);
        } catch (error) {
            console.log(error);
        }
    }

    function handleEditar(transacoes) {
        setAddRegistro(true);
        setEditarTransacao(transacoes);

    }




    return (
        <>
            <tr className="table-line">
                <td className="line-items">{format(new Date(transacoes.date), "dd/MM/yyyy", {locale:ptBR})}</td>
                <td className="line-items">{transacoes.week_day}</td>
                <td style={{marginLeft:'20px'}} className="line-items">{transacoes.description}</td>
                <td style={{marginLeft:'20px'}} className="line-items">{transacoes.category}</td>
                <td className="line-items" style={transacoes.type === "credit" ? { color: "green" } : { color: "red" }}>{transacoes.type === "debit" ? "- " : "+ "}{parseInt(transacoes.value).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>

                <td className="line-items">
                    <img className="edit-icon" src={btnEditar} alt="botao-editar" title="Editar" onClick={() => handleEditar(transacoes)} />
                    <img className="delete-icon" src={btnExcluir} alt="botao-excluir" title="Excluir" onClick={() => setMostrarModal(true)} />
                    {mostraModal &&
                        <div className="container-confirm-delete">
                            <span>Apagar item?</span>
                            <div className="btns-apagar">
                                <button className="btn-action-confirm" onClick={() => handleDeleteTransaction(transacoes.id)}>Sim</button>
                                <button className="btn-action-delete" onClick={() => setMostrarModal(false)}>Não</button>
                            </div>
                        </div>

                    }
                </td>

            </tr>
        </>
    );
}