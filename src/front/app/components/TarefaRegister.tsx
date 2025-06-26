import React, { useState, useEffect, type PropsWithChildren, useRef } from 'react';
import DefaultButton from './DefaultButton';

export interface NovoItem {
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
  result: NovoItem | undefined | null;
  idRotina?: number;
}

function TarefaRegister(props: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const [nome, setNome] = useState('');
  const [prioridade, setPrioridade] = useState('1');
  const [descricao, setDescricao] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async () => {
    setErrorMessage(null);

    if (!props || nome.trim() === '') return;

    const token = localStorage.getItem('authToken');
    if (!token) {
      setErrorMessage("Usuário não autenticado. Faça login novamente.");
      console.error("Token de autenticação não encontrado no localStorage");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/tarefa-template`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome: nome.trim(),
          idRotina: props.idRotina || 0,
          pai: 0,
          prioridade: Number(prioridade) || 1,
          ativo: true,
        }),
      });

      if (response.status === 401) {
        setErrorMessage("Não autorizado. Por favor, faça login novamente.");
        console.error("Erro 401 Unauthorized: Token inválido ou expirado");
        return;
      }

      if (!response.ok) {
        const errorText = await response.text();
        setErrorMessage("Erro ao criar tarefa: " + errorText);
        console.error("Erro ao criar tarefa:", errorText);
        return;
      }

      const createdTarefa = await response.json();

      props.onCreate({
        tipo: "Tarefa",
        nome: createdTarefa.nome,
        prioridade,
        responsavel,
      });

      // Reset campos e fecha modal
      setNome('');
      setPrioridade('1');
      setDescricao('');
      setResponsavel('');
      props.closeModal();

    } catch (error) {
      setErrorMessage("Erro na requisição: " + (error instanceof Error ? error.message : String(error)));
      console.error("Erro na requisição:", error);
    }
  };

  useEffect(() => {
    if (props.openModal) {
      ref.current?.showModal();
      setErrorMessage(null);
    } else {
      ref.current?.close();
    }
  }, [props.openModal]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        props.closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [props.closeModal]);

  return (
    <dialog
      ref={ref}
      onCancel={props.closeModal}
      onClick={(e) => {
        if (e.target === ref.current) {
          props.closeModal();
        }
      }}
      className="items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg"
    >
      <div className='modal-overlay' onClick={props.closeModal}>
        <div
          className="bg-white p-4 m-4 rounded-lg w-md w-full overflow-auto max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-bold mb-4">CADASTRAR TAREFA</h2>

          {errorMessage && (
            <div className="mb-4 text-red-600 font-semibold">{errorMessage}</div>
          )}

          <div className="pt-4 justify-between grid grid-cols-5 grid-4">
            <div className="col-span-1 ">
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
            <div className="col-span-4 mb-4 ml-6">
              <label className="block font-medium mb-1">Responsável</label>
              <select
                value={responsavel}
                onChange={e => setResponsavel(e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="">Selecione</option>
                <option value="1">Gestor</option>
                <option value="2">Administrador</option>
                <option value="3">Almoxarifado</option>
                <option value="4">Funcionario</option>
              </select>
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
          </div>

          <div className="flex w-full p-4 justify-center gap-2">
            {props.actions && props.actions.map((action, index) => (
              <div key={index}>{action}</div>
            ))}
            <DefaultButton onClick={handleSubmit}>
              CRIAR
            </DefaultButton>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default TarefaRegister;