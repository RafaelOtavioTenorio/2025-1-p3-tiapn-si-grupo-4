import { useEffect, useState } from "react";
import DefaultModal from "./DefaultModal";
import DefaultButton, { ButtonTypes } from "./DefaultButton";

interface Rotina {
  nome: string;
  tarefas: number;
  insumos: number;
}

interface ViewRoutineModalProps {
  open: boolean;
  onClose: () => void;
  rotina: Rotina | null;
}

export default function ViewRoutineModal({ open, onClose, rotina }: ViewRoutineModalProps) {
  const [nome, setNome] = useState("");
  const [prioridade, setPrioridade] = useState("1");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    if (rotina) {
      setNome(rotina.nome);
      setPrioridade("1"); // ajuste conforme a estrutura real
      setDescricao(`Tarefas: ${rotina.tarefas}, Insumos: ${rotina.insumos}`);
    }
  }, [rotina]);

  const handleSalvar = () => {
    const dadosAtualizados = {
      nome,
      prioridade,
      descricao
    };

    // Aqui no futuro você pode chamar:
    // apiClient.put(`/rotinas/${rotina.id}`, dadosAtualizados)

    onClose(); // fecha o modal após salvar
  };

  function closeAction(setModal: (v: boolean) => void) {
    return <>
      <DefaultButton onClick={onClose} buttonType={ButtonTypes.SECONDARY}>Cancelar</DefaultButton>
    </>
  }

  function saveAction(setModal: (v: boolean) => void) {
    return <>
      <DefaultButton onClick={handleSalvar} buttonType={ButtonTypes.PRIMARY}>Salvar</DefaultButton>
    </>
  }


  return (
    <DefaultModal openModal={open} closeModal={onClose} actions={[
      closeAction(onClose),
      saveAction(handleSalvar)
    ]}>
      {rotina && (
        <div className="w-full p-4 space-y-4">
          <h2 className="text-xl font-bold text-center">Editar Rotina</h2>

          <div>
            <label className="block text-sm font-medium">Nome da rotina</label>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Prioridade</label>
            <select
              value={prioridade}
              onChange={(e) => setPrioridade(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Descrição</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          
        </div>
      )}
    </DefaultModal>
  );
}
