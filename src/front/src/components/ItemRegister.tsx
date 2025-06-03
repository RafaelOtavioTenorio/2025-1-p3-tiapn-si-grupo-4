import React, { useState, useEffect, type PropsWithChildren, useRef } from 'react';
import DefaultButton from './DefaultButton';
import CloseIcon from '@mui/icons-material/Close';

export type NovoItem = {
  tipo: string;
  nome: string;
  prioridade?: string;
  descricao?: string;
  responsavel?: string;
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
  const [prioridade, setPrioridade] = useState('1');
  const [descricao, setDescricao] = useState('');
  const [responsavel, setResponsavel] = useState('');

  const handleCreate = () => {
    if (nome.trim() === "") return;

    if (tipo == 'Tarefa') {
      props.onCreate({ tipo, nome, prioridade });
    } else if (tipo == 'Insumo') {
      props.onCreate({ tipo, nome, descricao });
    }
    setTipo('Tarefa');
    setNome('');
    setPrioridade('1');
    setDescricao('');
    props.closeModal();
  }

  useEffect(() => {
    if (props.openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [props.openModal]);

  return (
    <dialog
      ref={ref}
      onCancel={props.closeModal}
      className="items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg"
    >

      <div className='modal-overlay' onClick={props.closeModal}>
        <div
          className="bg-white p-4 m-4 rounded-lg w-md w-full overflow-auto max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="justify-between flex items-center">
            <h2 className="text-xl font-bold mb-4">CADASTRAR ITEM</h2>
            <button
              onClick={props.closeModal}
              className="text-gray-500 hover:text-gray-700 border 
              border-gray-300 rounded-lg p-2 transition-colors 
              duration-150 hover:bg-gray-100 focus:outline-none"
              aria-label="Fechar"
              type="button"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Seletor de tipo*/}
          <div className="pt-4 grid gap-4 grid-cols-5">
            <div className="col-span-5 mb-5">
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
                <div className="col-span-5 mb-5">
                  <div className="flex flex-row justify-around">
                    <div className="mb-4 w-2/5">
                      <label className="block font-medium mb-1">Prioridade</label>
                      <select
                        value={prioridade}
                        onChange={e => setPrioridade(e.target.value)}
                        className="w-full border p-2 rounded"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                    <div className="mb-4 w-2/4 justify-self-end">
                      <label className="block font-medium mb-1">Responsável</label>
                      <select
                        value={responsavel}
                        onChange={e => setResponsavel(e.target.value)}
                        className="w-full border p-2 rounded"
                      >
                        <option value="1">Gestor</option>
                        <option value="2">Administrador</option>
                        <option value="3">Almoxarifado</option>
                        <option value="4">Funcionario</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-span-5 mb-4">
                  <label className="block font-medium mb-1">Nome da tarefa</label>
                  <input
                    type="text"
                    placeholder="Digite o nome da tarefa"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    className="w-full border p-2 rounded"
                  />
                </div>
              </>
            )}
          </div>

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

          <div className="flex w-full p-4 justify-center gap-2">
            {props.actions && props.actions.map((action, index) => (
              <div key={index}>{action}</div>
            ))}
            <DefaultButton onClick={handleCreate}>
              Criar
            </DefaultButton>
          </div>
        </div>
      </div>
    </dialog>
  )
}

export default ItemRegister