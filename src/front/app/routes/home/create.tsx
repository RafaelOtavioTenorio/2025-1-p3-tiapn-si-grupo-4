import { useEffect, useState } from "react";
import CreateRoutine, { type NovaRotina } from "~/components/CreateRoutine";
import Title from "~/components/Title";
import DefaultButton from "~/components/DefaultButton";
import SearchInput from "~/components/SearchInput";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteRotina from "~/components/DeleteRotinaPage";
import ItemRegisterModal from "~/components/ItemRegister";
import { type NovoItem } from "~/components/ItemRegister";
import { type NovoItem } from "~/components/ItemRegister";

interface Rotina {
  id: number;         // Adicionado para identificar rotina
  id: number;         // Adicionado para identificar rotina
  nome: string;
  tarefas: number;
  insumos: number;
}

interface Item {
  id: number;         // para identificar tarefa
  nome: string;
  concluido: boolean;
}

export default function RoutinesPage() {
  const [rotinas, setRotinas] = useState<Rotina[]>([]);
  const [itens, setItens] = useState<Item[]>([]);
  const [selectedRotina, setSelectedRotina] = useState<Rotina | null>(null);

  const [createModal, setModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [itemRegisterOpen, setItemRegisterOpen] = useState(false);
  const [deleteRotinaOpen, setDeleteRotinaOpen] = useState(false);
  const [resultadoModalRegistroItem, setResultadoModalRegistroItem] = useState<NovoItem>();

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchRotinas = async () => {
    try {
      const resRotinas = await fetch(`${baseUrl}/RotinaTemplate`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      });

      const resTarefas = await fetch(`${baseUrl}/tarefa-template`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      });

      if (resRotinas.ok && resTarefas.ok) {
        const rotinasData = await resRotinas.json();
        const tarefasData = await resTarefas.json();

        const rotinasComContagem = rotinasData.map((rotina: any) => {
          const tarefasDaRotina = tarefasData.filter((t: any) => t.rotina?.id === rotina.id);
          const insumos = tarefasDaRotina.reduce((total: number, t: any) => total + (t.insumos?.length || 0), 0); // depende de como insumos vêm
          return {
            ...rotina,
            tarefas: tarefasDaRotina.length,
            insumos,
          };
        });

        setRotinas(rotinasComContagem);
      } else {
        console.error("Erro ao buscar rotinas/tarefas");

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchRotinas = async () => {
    try {
      const resRotinas = await fetch(`${baseUrl}/RotinaTemplate`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      });

      const resTarefas = await fetch(`${baseUrl}/tarefa-template`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      });

      if (resRotinas.ok && resTarefas.ok) {
        const rotinasData = await resRotinas.json();
        const tarefasData = await resTarefas.json();

        const rotinasComContagem = rotinasData.map((rotina: any) => {
          const tarefasDaRotina = tarefasData.filter((t: any) => t.rotina?.id === rotina.id);
          const insumos = tarefasDaRotina.reduce((total: number, t: any) => total + (t.insumos?.length || 0), 0); // depende de como insumos vêm
          return {
            ...rotina,
            tarefas: tarefasDaRotina.length,
            insumos,
          };
        });

        setRotinas(rotinasComContagem);
      } else {
        console.error("Erro ao buscar rotinas/tarefas");
      }
    } catch (error) {
      console.error("Erro de rede ao buscar rotinas/tarefas:", error);
    }
  };


  const fetchItens = async (rotinaId: number) => {
    try {
      console.log("Buscando tarefas da rotina:", rotinaId);

      const res = await fetch(`${baseUrl}/tarefa-template`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Todas as tarefas retornadas:", data);


        const tarefasFiltradas = data
          .filter((t: any) => Number(t.rotina?.id) === Number(rotinaId))
          .map((tarefa: any) => ({
            id: tarefa.id,
            nome: tarefa.nome,
            concluido: tarefa.ativo === false ? true : false,
          }));


        console.log("Tarefas filtradas:", tarefasFiltradas);

        setItens(tarefasFiltradas);
      } else {
        console.error("Erro ao buscar tarefas:", await res.text());
        setItens([]);
      }
    } catch (error) {
      console.error("Erro de rede ao buscar tarefas:", error);
      setItens([]);
    } catch (error) {
      console.error("Erro de rede ao buscar rotinas/tarefas:", error);
    }
  };


  const fetchItens = async (rotinaId: number) => {
    try {
      console.log("Buscando tarefas da rotina:", rotinaId);

      const res = await fetch(`${baseUrl}/tarefa-template`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Todas as tarefas retornadas:", data);


        const tarefasFiltradas = data
          .filter((t: any) => Number(t.rotina?.id) === Number(rotinaId))
          .map((tarefa: any) => ({
            id: tarefa.id,
            nome: tarefa.nome,
            concluido: tarefa.ativo === false ? true : false,
          }));


        console.log("Tarefas filtradas:", tarefasFiltradas);

        setItens(tarefasFiltradas);
      } else {
        console.error("Erro ao buscar tarefas:", await res.text());
        setItens([]);
      }
    } catch (error) {
      console.error("Erro de rede ao buscar tarefas:", error);
      setItens([]);
    }
  };


  // Quando seleciona uma rotina, busca as tarefas dela
  };


  // Quando seleciona uma rotina, busca as tarefas dela
  useEffect(() => {
    if (selectedRotina) {
      fetchItens(selectedRotina.id);
    if (selectedRotina) {
      fetchItens(selectedRotina.id);
    } else {
      setItens([]);
      setItens([]);
    }
  }, [selectedRotina]);

  useEffect(() => {
    fetchRotinas();
  }, [createModal]);

  const handleItemRegister = async (item: NovoItem) => {
    try {
      setResultadoModalRegistroItem(item);
      console.log("Item criado:", item);

      if (selectedRotina) {
        // Atualiza tarefas visíveis
        await fetchItens(selectedRotina.id);

        // Atualiza os contadores da rotina atual no array de rotinas
        setRotinas(prev =>
          prev.map(r => {
            if (r.id === selectedRotina.id) {
              return {
                ...r,
                tarefas: item.tipo === 'Tarefa' ? r.tarefas + 1 : r.tarefas,
                insumos: item.tipo === 'Insumo' ? r.insumos + 1 : r.insumos,
              };
            }
            return r;
          })
        );

        // Atualiza a rotina selecionada (pra refletir a nova contagem no header)
        setSelectedRotina(prev => {
          if (!prev) return null;
          return {
            ...prev,
            tarefas: item.tipo === 'Tarefa' ? prev.tarefas + 1 : prev.tarefas,
            insumos: item.tipo === 'Insumo' ? prev.insumos + 1 : prev.insumos,
          };
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  }, [selectedRotina]);

  useEffect(() => {
    fetchRotinas();
  }, [createModal]);

  const handleItemRegister = async (item: NovoItem) => {
    try {
      setResultadoModalRegistroItem(item);
      console.log("Item criado:", item);

      if (selectedRotina) {
        // Atualiza tarefas visíveis
        await fetchItens(selectedRotina.id);

        // Atualiza os contadores da rotina atual no array de rotinas
        setRotinas(prev =>
          prev.map(r => {
            if (r.id === selectedRotina.id) {
              return {
                ...r,
                tarefas: item.tipo === 'Tarefa' ? r.tarefas + 1 : r.tarefas,
                insumos: item.tipo === 'Insumo' ? r.insumos + 1 : r.insumos,
              };
            }
            return r;
          })
        );

        // Atualiza a rotina selecionada (pra refletir a nova contagem no header)
        setSelectedRotina(prev => {
          if (!prev) return null;
          return {
            ...prev,
            tarefas: item.tipo === 'Tarefa' ? prev.tarefas + 1 : prev.tarefas,
            insumos: item.tipo === 'Insumo' ? prev.insumos + 1 : prev.insumos,
          };
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col p-8 bg-gray-200 h-screen">
      {/* Título e botão de criar rotina */}
      <div className="flex justify-between items-center mb-6">
        <Title>Minhas Rotinas</Title>
        <DefaultButton onClick={() => setModal(true)}>+ CRIAR ROTINA</DefaultButton>
        <CreateRoutine
          closeModal={() => setModal(false)}
          openModal={createModal}
          onCreate={() => { }}
          result={undefined}
        />
        <CreateRoutine
          closeModal={() => setModal(false)}
          openModal={createModal}
          onCreate={() => { }}
          result={undefined}
        />
      </div>

      {/* Conteúdo principal */}
      <div className="flex flex-row gap-6 w-full mx-auto flex-1">
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
                className={`bg-white rounded-lg p-4 shadow-md hover:bg-gray-100 cursor-pointer ${selectedRotina?.nome === rotina.nome ? "bg-blue-100" : ""
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

        {/* Detalhes da Rotina */}
        <div className="h-fit bg-white flex-1 rounded-lg p-6 shadow-md">
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
                  onDelete={() => { }}
                  onDelete={() => { }}
                />
              </div>

              <DefaultButton onClick={() => setItemRegisterOpen(true)}>ADICIONAR TAREFA</DefaultButton>
              <ItemRegisterModal
                closeModal={() => setItemRegisterOpen(false)}
                openModal={itemRegisterOpen}
                onCreate={handleItemRegister}
                result={resultadoModalRegistroItem}
                idRotina={selectedRotina.id}  // <-- Passa id da rotina aqui
                idRotina={selectedRotina.id}  // <-- Passa id da rotina aqui
              />

              <ul className="mt-6 space-y-3">
                {itens.map((tarefa) => (
                  <li key={tarefa.id} className="flex justify-between items-center">
                {itens.map((tarefa) => (
                  <li key={tarefa.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={tarefa.concluido} readOnly />
                      <input type="checkbox" checked={tarefa.concluido} readOnly />
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