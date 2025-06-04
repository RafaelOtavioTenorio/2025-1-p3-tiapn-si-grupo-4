import DefaultModal from "./DefaultModal";
import DefaultButton from "./DefaultButton";

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
  return (
    <DefaultModal openModal={open} closeModal={onClose} actions={[]}>
      {rotina && (
        <div className="w-full p-4 space-y-4">
          <h2 className="text-xl font-bold text-center">Detalhes da Rotina</h2>
          
          <div>
            <label className="block text-sm font-medium">Nome da rotina</label>
            <input
              value={rotina.nome}
              disabled
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Prioridade</label>
            <select disabled className="w-full p-2 border rounded">
              <option value="1">1</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Descrição</label>
            <textarea
              value={`Tarefas: ${rotina.tarefas}, Insumos: ${rotina.insumos}`}
              disabled
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Botão controlado diretamente aqui */}
          <div className="flex justify-center pt-4">
          </div>
        </div>
      )}
    </DefaultModal>
  );
}
