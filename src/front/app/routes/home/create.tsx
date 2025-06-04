import { Delete as DeleteIcon, Search } from "@mui/icons-material";
import { useEffect, useState } from "react";
import type { Route } from "types/app/+types/root";
import DefaultButton from "~/components/DefaultButton";
import DefaultModal from "~/components/DefaultModal";
import Delete from "~/components/DeleteRotinaPage";
import ItemRegister from "~/components/ItemRegister";
import Title from "~/components/Title";
import apiClient from "~/services/client";

export type NovoItem = {
  tipo: string;
  nome: string;
  prioridade?: string;
  descricao?: string;
}



export default function () {
  const [createModal, setModal] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [rotinas, setRotinas] = useState([
    { nome: "Auditoria Interna", tarefas: 3, insumos: 5 },
    { nome: "Controle de inventário", tarefas: 4, insumos: 1 },
    { nome: "Gerenciar recursos", tarefas: 3, insumos: 5 },
    { nome: "Auditoria Interna", tarefas: 3, insumos: 5 },
  ]);

  useEffect(() => {
    setRotinas(rotinas.filter(rotina => rotina.nome.toLowerCase().includes(searchText.toLowerCase())))
  }, [searchText]);


  const tarefas = new Array(7).fill("Coletar dados");
  const [itemRegisterOpen, setItemRegisterOpen] = useState(false);
  const [deleteRotinaOpen, setDeleteRotinaOpen] = useState(false);
  const [resultadoModalRegistroItem, setResultadoModalRegistroItem] = useState();

  const handleCreateItem = () => {

  }

  return (
    <div className="flex flex-col p-8 bg-gray-200 min-h-screen">
      {/* Título e botão de criar rotina */}
      <div className="flex justify-between items-center mb-6">
        <Title>Minhas Rotinas</Title>
        <DefaultButton onClick={() => setModal(true)}>+ CRIAR ROTINA</DefaultButton>
        <DefaultModal closeModal={() => setModal(false)} openModal={createModal} />
      </div>

      {/* Campo de busca */}
      <Search  />

      {/* Conteúdo principal */}
      <div className="flex flex-row p-4 gap-6 w-full max-w-[1200px] mx-auto">
        {/* Lista de Rotinas */}
        <div className="flex flex-col gap-4 flex-1 max-h-[75vh] overflow-y-auto pr-2">
          {rotinas.map((rotina, i) => (
            <div
              key={i}
              className={`bg-white rounded-lg p-4 shadow-md hover:bg-gray-100 ${i === 0 ? "bg-blue-100" : ""
                }`}
            >
              <h2 className="font-semibold">{rotina.nome}</h2>
              <p className="text-sm text-gray-600">
                {rotina.tarefas} tarefas • {rotina.insumos} insumos
              </p>
            </div>
          ))}
        </div>

        {/* Detalhes da Rotina */}
        <div className="bg-white flex-1 rounded-lg p-6 shadow-md">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-bold">Auditoria Interna</h2>
            <button onClick={() => setDeleteRotinaOpen(true)} className="text-red-600 border border-red-600 px-2 py-1 rounded hover:bg-red-100">
              <DeleteIcon />
            </button>
            <Delete
              openModal={deleteRotinaOpen}
              closeModal={() => setDeleteRotinaOpen(false)}
              onDelete={() => { }}
            //   nomeRotina="Auditoria Interna"
            />
          </div>


          <DefaultButton onClick={() => setItemRegisterOpen(true)}>ADICIONAR TAREFA</DefaultButton>
          <ItemRegister
            closeModal={() => setItemRegisterOpen(false)}
            openModal={itemRegisterOpen}
            onCreate={handleCreateItem}
          />

          <ul className="mt-6 space-y-3">
            {tarefas.map((tarefa, i) => (
              <li key={i} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span>{tarefa}</span>
                </div>
                <span>⚙️</span> {/* Vai deixar essa engrenagem mesmo? */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
