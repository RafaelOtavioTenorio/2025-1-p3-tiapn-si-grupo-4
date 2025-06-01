import React, { useState, useEffect, type PropsWithChildren, useRef } from 'react';

export type NovoItem = {
    tipo: string;
    nome: string;
    prioridade?: string;
    descricao?: string;
}

interface ModalProps extends PropsWithChildren {
    openModal: boolean;
    closeModal: () => void;
    onCreate: (item: NovoItem) => void;
    actions?: React.ReactElement[];
}

function ItemRegister(props: ModalProps) {
    const ref = useRef<HTMLDialogElement>(null);
    const [tipo, setTipo] = useState('Tarefa');
    const [nome, setNome] = useState('');
    const [prioridade, setPrioridade] = useState ('1');
    const [descricao, setDescricao] = useState ('');

    const handleCreate = () => {
        if (nome.trim() === "") return;

        if (tipo == 'Tarefa'){
            props.onCreate({ tipo, nome, prioridade });
        } else if (tipo == 'Insumo'){
            props.onCreate({ tipo, nome, descricao });            
        }
        setTipo('Tarefa');
        setNome('');
        setPrioridade('1');
        setDescricao('');
        props.closeModal();
    }

    useEffect(() => {
        if(props.openModal) {
            ref.current?.showModal();
        } else {
            ref.current?.close();
        }
    }, [props.openModal]);

  return (
    <div className='modal-overlay' onClick={props.closeModal}>
        <div
      className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full overflow-auto max-h-[90vh]"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-xl font-bold mb-4">CADASTRAR ITEM</h2>

      {/* Seletor de tipo */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Tipo</label>
        <select
          value={tipo}
          onChange={e => setTipo(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="Tarefa">Tarefa</option>
          <option value="Insumo">Insumo</option>
        </select>
      </div>

      {/* Formulário de Tarefa */}
      {tipo === 'Tarefa' && (
        <>
          <div className="mb-4">
            <label className="block font-medium mb-1">Nome da tarefa</label>
            <input
              type="text"
              placeholder="Digite o nome da tarefa"
              value={nome}
              onChange={e => setNome(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Prioridade</label>
            <select
              value={prioridade}
              onChange={e => setPrioridade(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
        </>
      )}

      {/* Formulário de Insumo */}
      {tipo === 'Insumo' && (
        <>
          <div className="mb-4">
            <label className="block font-medium mb-1">Nome do insumo</label>
            <input
              type="text"
              placeholder="Digite o nome do insumo"
              value={nome}
              onChange={e => setNome(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Descrição do insumo</label>
            <textarea
              maxLength={255}
              rows={4}
              placeholder="Digite a descrição do insumo"
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
        </>
      )}

      <div className="text-right">
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Criar
        </button>
      </div>
    </div>
    </div>
  )
}

export default ItemRegister