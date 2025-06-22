import CardRotinaDescricao from "./CardRotinaDescricao";

interface Tarefa {
  id: number;
  nome: string;
  prioridade: number;
  pai: number | null;
}

interface Rotina {
  id: number;
  nome: string;
  descricao: string;
  tarefas?: Tarefa[];
}

interface CardCargoRotinasProps {
  rotina: Rotina;
}

export default function CardCargoRotinas({ rotina }: CardCargoRotinasProps) {
  return (
    <div className="flex flex-col w-96 p-5 mb-4 bg-white rounded-2xl shadow-md">
      <label className="text-xl font-bold text-left mb-1">{rotina.nome}</label>
      <label className="text-sm text-left text-gray-600 mb-2">{/* empresa, se quiser */}</label>
      <p className="text-sm text-left mb-4">{rotina.descricao}</p>

      <div className="bg-gray-100 flex flex-col rounded-lg p-3">
        {rotina.tarefas && rotina.tarefas.length > 0 ? (
          rotina.tarefas.map((tarefa) => (
            <CardRotinaDescricao
              key={tarefa.id}
              nomeTarefa={tarefa.nome}
              descricaoTarefa={`Prioridade: ${tarefa.prioridade}`}
            />
          ))
        ) : (
          <p className="text-sm italic text-gray-500">Nenhuma tarefa encontrada.</p>
        )}
      </div>
    </div>
  );
}
