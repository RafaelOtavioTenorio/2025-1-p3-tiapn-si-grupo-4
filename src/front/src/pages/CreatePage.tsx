import DefaultButton from "../components/DefaultButton";
import Title from "../components/Title";
import { useState } from "react";
import DefaultModal from "../components/DefaultModal";

export default function RoutinesPage() {
    const [createModal, setModal] = useState(false)
  const rotinas = [
    { nome: "Auditoria Interna", tarefas: 3, insumos: 5 },
    { nome: "Controle de inventário", tarefas: 4, insumos: 1 },
    { nome: "Gerenciar recursos", tarefas: 3, insumos: 5 },
    { nome: "Auditoria Interna", tarefas: 3, insumos: 5 },
  ];

  const tarefas = new Array(7).fill("Coletar dados");

  return (
    <div className="flex flex-col p-8 bg-gray-200 min-h-screen">
      {/* Título e botão de criar rotina */}
      <div className="flex justify-between items-center mb-6">
        <Title>Minhas Rotinas</Title>
        <DefaultButton onClick={() => setModal(true)}>+ CRIAR ROTINA</DefaultButton>
        <DefaultModal closeModal={() => setModal(false)} openModal={createModal} />
      </div>

      {/* Campo de busca */}
      <input
        placeholder="Pesquisar rotina ..."
        className="mb-6 p-2 w-full rounded"
      />

      {/* Conteúdo principal */}
      <div className="flex flex-row gap-6 w-full max-w-[1200px] mx-auto">
        {/* Lista de Rotinas */}
        <div className="flex flex-col gap-4 flex-1 max-h-[75vh] overflow-y-auto pr-2">
          {rotinas.map((rotina, i) => (
            <div
              key={i}
              className={`bg-white rounded-lg p-4 shadow-md hover:bg-gray-100 ${
                i === 0 ? "bg-blue-100" : ""
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
            <button className="text-red-600 border border-red-600 px-2 py-1 rounded hover:bg-red-100">
              🗑
            </button>
          </div>

          <DefaultButton >ADICIONAR TAREFA</DefaultButton>

          <ul className="mt-6 space-y-3">
            {tarefas.map((tarefa, i) => (
              <li key={i} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span>{tarefa}</span>
                </div>
                <span>⚙️</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
