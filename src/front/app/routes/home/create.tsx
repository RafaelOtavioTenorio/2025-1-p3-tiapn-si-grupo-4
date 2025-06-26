import { useEffect, useState } from "react";
import React from 'react'
import CreateRoutine from "~/components/CreateRoutine";
import Title from "~/components/Title";
import DefaultButton from "~/components/DefaultButton";
import SearchInput from "~/components/SearchInput";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteRotina from "~/components/DeleteRotinaPage";
import ItemRegisterModal from "~/components/ItemRegister";
import { type NovoItem } from "~/components/ItemRegister";
import TarefaRegister from "~/components/TarefaRegister";
import Gear from '@mui/icons-material/Settings';
import Add from '@mui/icons-material/AddRounded';
import ArrowDown from '@mui/icons-material/KeyboardArrowDownOutlined';
import Box from '@mui/icons-material/AllInboxRounded';

interface Rotina {
  id: number;
  nome: string;
  tarefas: number;
  insumos: number;
  empresa: {
    id: number;
    nome: string;
    cnpj: string;
  } | null;
}

interface Insumo {
  id: number;
  nome: string;
  descricao: string;
  tarefaID: number;
}

interface Item {
  id: number;
  nome: string;
  concluido: boolean;
  subItens: any;
}

export default function RoutinesPage() {
  const [rotinas, setRotinas] = useState<Rotina[]>([]);
  const [itens, setItens] = useState<Item[]>([]);
  const [selectedRotina, setSelectedRotina] = useState<Rotina | null>(null);

  const [expanded, setExpanded] = useState<{ [id: number]: boolean }>({});
  const [createModal, setModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [itemRegisterOpen, setItemRegisterOpen] = useState(false);
  const [tarefaCreateOpen, setTarefaCreateOpen] = useState(false);
  const [deleteRotinaOpen, setDeleteRotinaOpen] = useState(false);
  const [resultadoModalRegistroItem, setResultadoModalRegistroItem] = useState<NovoItem | null>();

  const [empresaId, setEmpresaId] = useState<number | null>(null);
  const [idTarefaPai, setIdTarefaPai] = useState<number | null>(null);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  // Carrega empresaId do localStorage só no cliente
  useEffect(() => {
    if (typeof window !== "undefined") {
      const idStr = localStorage.getItem("empresaId");
      if (idStr) setEmpresaId(Number(idStr));
      else setEmpresaId(null);
    }
  }, []);


  const fetchRotinas = async () => {
    if (!empresaId) {
      setRotinas([]);
      return;
    }

    try {
      const resRotinas = await fetch(`${baseUrl}/RotinaTemplate`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
      });

      if (!resRotinas.ok) {
        console.error("Erro ao buscar rotinas:", await resRotinas.text());
        setRotinas([]);
        return;
      }

      const rotinasData: Rotina[] = await resRotinas.json();

      const rotinasDaEmpresa = rotinasData.filter(rotina => rotina.empresa?.id === empresaId);

      const resTarefas = await fetch(`${baseUrl}/tarefa-template`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
      });

      let tarefasData: any[] = [];
      if (resTarefas.ok) {
        tarefasData = await resTarefas.json();
      } else {
        console.warn("Não foi possível buscar tarefas para contagem.");
      }

      const rotinasComContagem = rotinasDaEmpresa.map((rotina) => {
        const tarefasDaRotina = tarefasData.filter(t => t.rotina?.id === rotina.id);
        const insumos = tarefasDaRotina.reduce((total, t) => total + (t.insumos?.length || 0), 0);
        return {
          ...rotina,
          tarefas: tarefasDaRotina.length,
          insumos,
        };
      });

      setRotinas(rotinasComContagem);
    } catch (error) {
      console.error("Erro ao buscar rotinas/tarefas:", error);
      setRotinas([]);
    }
  };

  // Buscar rotinas quando empresaId ou createModal mudarem
  useEffect(() => {

    fetchRotinas();
  }, [empresaId, createModal]);

  useEffect(() => {
    if (!deleteRotinaOpen) {
      fetchRotinas();
      setSelectedRotina(null);
    }
  }, [deleteRotinaOpen])

  const fetchItens = async (rotinaId: number) => {
    try {
      const res = await fetch(`${baseUrl}/tarefa-template`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
      });

      if (res.ok) {
        const data = await res.json();
        const tarefasFiltradas = data
          .filter(t => (Number(t.rotina?.id) === rotinaId) && (t.pai == null))
          .map(tarefa =>(buildMap(tarefa)));

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
  const buildMap = (tarefa: any) => {
    var subitens = tarefa.subtarefas
    subitens.push(...tarefa.insumos.map(insumo => ({nome: insumo.nome, type: "insumo"})))
    return {
      id: tarefa.id,
      nome: tarefa.nome,
      concluido: tarefa.ativo === true,
      subItens: subitens
    }
  }

  useEffect(() => {
    if (selectedRotina) {
      fetchItens(selectedRotina.id);
    } else {
      setItens([]);
    }
  }, [selectedRotina]);

  const handleItemRegister = async (item: NovoItem | null) => {
    try {
      setResultadoModalRegistroItem(item);
      if (selectedRotina && item) {
        await fetchItens(selectedRotina.id);

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

  const rotinasFiltradas = rotinas.filter(rotina =>
    rotina.nome.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="flex flex-col p-8 bg-gray-200 h-screen">
      <div className="flex justify-between items-center mb-6">
        <Title>Minhas Rotinas</Title>
        <DefaultButton onClick={() => setModal(true)}>+ CRIAR ROTINA</DefaultButton>
        <CreateRoutine
          closeModal={() => setModal(false)}
          openModal={createModal}
          onCreate={() => setModal(false)} // aqui você pode atualizar a lista se quiser
          result={undefined}
        />
      </div>

      <div className="flex flex-row gap-6 w-full mx-auto flex-1">
        <div className="flex flex-col h-full flex-1 pr-2">
          <SearchInput
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <div className="flex flex-col gap-4 overflow-y-auto mt-4 flex-grow">
            {rotinasFiltradas.map((rotina, i) => (
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
                  idRotina={selectedRotina.id}
                />
              </div>

              <DefaultButton
                onClick={() => { setTarefaCreateOpen(true); setIdTarefaPai(null) }
                }> ADICIONAR TAREFA</DefaultButton>
              <TarefaRegister
                closeModal={() => setTarefaCreateOpen(false)}
                openModal={tarefaCreateOpen}
                onCreate={handleItemRegister}
                result={resultadoModalRegistroItem}
                idRotina={selectedRotina.id}
              />

              <ul className="mt-6 space-y-3">
                {itens.map((tarefa) => (
                  <React.Fragment key={tarefa.id}>
                    {/* Item da Tarefa Principal */}
                    <li className="flex justify-between items-center bg-gray-50 p-2 rounded-md">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" checked={tarefa.concluido} readOnly />
                        <span>{tarefa.nome}</span>
                      </div>
                      <div className="flex items-center">
                        <Add
                          onClick={() => {
                            setItemRegisterOpen(true);
                            setIdTarefaPai(tarefa.id);
                          }}
                          className="border border-gray-700 hover:bg-gray-300 rounded-full mx-1 cursor-pointer"
                          aria-label="Adicionar subitem"
                        />
                        <Gear
                          className="border border-gray-700 hover:bg-gray-300 rounded-sm mx-1 cursor-pointer"
                          aria-label="Configurar item"
                        />
                        {tarefa.subItens && tarefa.subItens.length > 0 && (
                          <button
                            className="ml-2"
                            onClick={() =>
                              setExpanded((prev) => ({
                                ...prev,
                                [tarefa.id]: !prev[tarefa.id],
                              }))
                            }
                            aria-label={
                              expanded[tarefa.id] ? "Recolher subitens" : "Expandir subitens"
                            }
                          >
                            <ArrowDown
                              className={`transition-transform duration-300 ${expanded[tarefa.id] ? "rotate-180" : ""
                                }`}
                            />
                          </button>
                        )}
                      </div>
                    </li>

                    {/* Sublista: Renderizada abaixo do 'li' da tarefa principal e somente se estiver expandida */}
                    {tarefa.subItens &&
                      tarefa.subItens.length > 0 &&
                      expanded[tarefa.id] && (
                        <li className="pl-8 pr-2 pb-2">
                          <div className="flex items-start border-l-2 border-gray-300 pl-4">
                            <ul className="flex w-full flex-col gap-2 pt-2">
                              {tarefa.subItens.map((sub, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-center text-sm text-gray-700"
                                >
                                  {sub.type === 'insumo' ? 
                                  <Box fontSize="small"/>
                                  : <input
                                    type="checkbox"
                                    checked={sub.ativo}
                                    readOnly
                                    className="mr-2"
                                  />
                                  }
                                  {sub.nome}
                                </li>
                              ))}

                            </ul>
                          </div>
                        </li>
                      )}
                  </React.Fragment>
                ))}
              </ul>
              <ItemRegisterModal
                closeModal={() => setItemRegisterOpen(false)}
                openModal={itemRegisterOpen}
                onCreate={handleItemRegister}
                result={resultadoModalRegistroItem}
                idRotina={selectedRotina.id}
                idPai={idTarefaPai}
              />
            </>
          ) : (
            <div className="text-gray-400 italic">Selecione uma rotina para visualizar detalhes.</div>
          )}
        </div>
      </div>
    </div>
  );
}
