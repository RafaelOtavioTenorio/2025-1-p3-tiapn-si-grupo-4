import { useEffect, useState } from "react";
import { type NovoItem } from "~/components/ItemRegister";
import CreateRoutine, { type NovaRotina } from "~/components/CreateRoutine";
import Title from "~/components/Title";
import DefaultButton from "~/components/DefaultButton";
import SearchInput from "~/components/SearchInput";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteRotina from "~/components/DeleteRotinaPage";
import ItemRegisterModal from "~/components/ItemRegister";

interface Rotina {
  nome: string;
  tarefas: number;
  insumos: number;
}

interface Item {
  nome: string;
  concluido: boolean;
}

const mockData = [
  { nome: "Auditoria Interna", tarefas: 3, insumos: 5 },
  { nome: "Controle de inventário", tarefas: 4, insumos: 1 },
  { nome: "Gerenciar recursos", tarefas: 3, insumos: 5 },
  { nome: "Auditoria Interna", tarefas: 3, insumos: 5 },
];

export default function RoutinesPage() {
  const [rotinas, setRotinas] = useState<Rotina[]>([]);
  const [itens, setItens] = useState<Item[]>([]);
  const [selectedRotina, setSelectedRotina] = useState<Rotina | null>(null);

  const [createModal, setModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [itemRegisterOpen, setItemRegisterOpen] = useState(false);
  const [deleteRotinaOpen, setDeleteRotinaOpen] = useState(false);
  const [resultadoModalRegistroItem, setResultadoModalRegistroItem] = useState<NovoItem>();
  const [resultadoModalRegistroRotina, setResultadoModalRegistroRotina] = useState<NovaRotina>();

  const handleItemRegister = (item: NovoItem) => {
    try {
      setResultadoModalRegistroItem(item);
      console.log("Item para enviar ao backend:", item);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRotinaRegister = (item: NovaRotina) => {
    try {
      setResultadoModalRegistroRotina(item);
      console.log("Rotina para enviar ao backend:", item);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSetRotinas = () => {
    const extra = localStorage.getItem("rotinaExtra");
    if (extra) {
      try {
        const parsed = JSON.parse(extra);
        mockData.push(parsed);
      } catch (err) {
        console.error("Erro ao fazer parse do item salvo no localStorage", err);
      }
    }
    setRotinas(mockData);
  };

  const handleSetItens = () => {
    const mockTarefas = [
      { nome: "Auditoria Interna", concluido: true },
      { nome: "Controle de inventário", concluido: false },
      { nome: "Gerenciar recursos", concluido: false },
      { nome: "Auditoria Interna", concluido: false },
    ];
    const extra = localStorage.getItem("tarefaExtra");
    if (extra) {
      try {
        const parsed = JSON.parse(extra);
        mockTarefas.push(parsed);
      } catch (err) {
        console.error("Erro ao fazer parse do item salvo no localStorage", err);
      }
    }
    setItens(mockTarefas);
  };

  useEffect(() => {
    if (resultadoModalRegistroRotina) {
      const novaRotina: Rotina = {
        nome: resultadoModalRegistroRotina.nome,
        tarefas: 0,
        insumos: 0,
      };
      setRotinas(prev => [...prev, novaRotina]);
      setResultadoModalRegistroRotina(undefined);
    } else {
      handleSetRotinas();
    }

    if (resultadoModalRegistroItem) {
      const novoItem: Item = {
        nome: resultadoModalRegistroItem.nome,
        concluido: false,
      };
      setItens(prev => [...prev, novoItem]);
      setResultadoModalRegistroRotina(undefined);
    } else {
      handleSetItens();
    }
  }, [resultadoModalRegistroRotina, resultadoModalRegistroItem]);

  return (
    <div className="flex flex-col p-8 bg-gray-200 h-screen">
      {/* Título e botão de criar rotina */}
      <div className="flex justify-between items-center mb-6">
        <Title>Minhas Rotinas</Title>
        <DefaultButton onClick={() => setModal(true)}>+ CRIAR ROTINA</DefaultButton>
        <CreateRoutine
          closeModal={() => setModal(false)}
          openModal={createModal}
          onCreate={handleRotinaRegister}
          result={resultadoModalRegistroRotina}
        />
      </div>

      {/* Conteúdo principal */}
      <div className="flex flex-row gap-6 w-full max-w-[1200px] mx-auto flex-1">
        {/* Coluna esquerda: busca + lista */}
        <div className="flex flex-col h-full flex-1 pr-2">
          {/* Busca */}
          <div>
            <SearchInput
              value={searchText}
              onChange={(e: any) => setSearchText(e.target.value)}
              rotinas={rotinas}
            />
          </div>

          {/* Lista de rotinas */}
      <div className="flex flex-col gap-4 overflow-y-auto mt-4 flex-grow">
            {rotinas.map((rotina, i) => (
              <div
                key={i}
                onClick={() => setSelectedRotina(rotina)}
                className={`bg-white rounded-lg p-4 shadow-md hover:bg-gray-100 cursor-pointer ${
                  selectedRotina?.nome === rotina.nome ? "bg-blue-100" : ""
                }`}
              >
                <h2 className="font-semibold">{rotina.nome}</h2>
                <p className="text-sm text-gray-600">
                  {rotina.tarefas} tarefas • {rotina.insumos} insumos
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Coluna direita: detalhes da rotina */}
      <div className="bg-white flex-1 rounded-lg p-6 shadow-md self-start">
          {selectedRotina ? (
            <>
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold">{selectedRotina.nome}</h2>
                <button
                  onClick={() => setDeleteRotinaOpen(true)}
                  className="text-red-600 border border-red-600 px-2 py-1 rounded hover:bg-red-100"
                >
                  <DeleteOutlineIcon />
                </button>
                <DeleteRotina
                  openModal={deleteRotinaOpen}
                  closeModal={() => setDeleteRotinaOpen(false)}
                  onDelete={() => {}}
                />
              </div>

              <DefaultButton onClick={() => setItemRegisterOpen(true)}>ADICIONAR TAREFA</DefaultButton>
              <ItemRegisterModal
                closeModal={() => setItemRegisterOpen(false)}
                openModal={itemRegisterOpen}
                onCreate={handleItemRegister}
                result={resultadoModalRegistroItem}
              />

              <ul className="mt-6 space-y-3">
                {itens.map((tarefa, i) => (
                  <li key={i} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" />
                      <span>{tarefa.nome}</span>
                    </div>
                    <span>⚙️</span>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="text-gray-400 italic">Selecione uma rotina para visualizar detalhes.</div>
          )}
        </div>
      </div>
    </div>
  );
}
