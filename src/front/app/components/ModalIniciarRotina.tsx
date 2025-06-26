import React, { useEffect, useRef, useState } from "react";
import DefaultButton from "./DefaultButton";

interface RotinaTemplate {
  id: number;
  nome: string;
  descricao: string;
  prioridade: number;
}

interface ModalIniciarRotinaProps {
  openModal: boolean;
  closeModal: () => void;
  onRotinaIniciada: () => void;
}

export default function ModalIniciarRotina({
  openModal,
  closeModal,
  onRotinaIniciada,
}: ModalIniciarRotinaProps) {
  const [rotinas, setRotinas] = useState<RotinaTemplate[]>([]);
  const [selecionada, setSelecionada] = useState<RotinaTemplate | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const fetchRotinas = async () => {
      const token = localStorage.getItem("authToken");
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/RotinaTemplate`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setRotinas(data);
      } else {
        setErrorMessage("Erro ao buscar rotinas.");
        console.error("Erro ao buscar rotinas:", await res.text());
      }
    };

    if (openModal) {
      fetchRotinas();
      setSelecionada(null);
      setErrorMessage(null);
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  const iniciarRotina = async () => {
    if (!selecionada) return;
    const token = localStorage.getItem("authToken");

    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/Rotina`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        idRotinaTemplate: selecionada.id,
        nome: selecionada.nome,
        descricao: selecionada.descricao,
        prioridade: selecionada.prioridade,
      }),
    });

    if (res.ok) {
      closeModal();
      onRotinaIniciada();
    } else {
      setErrorMessage("Erro ao iniciar rotina.");
      console.error("Erro ao iniciar rotina:", await res.text());
    }
  };

  return (
    <dialog
      ref={ref}
      onCancel={closeModal}
      onClick={(e) => {
        if (e.target === ref.current) {
          closeModal();
        }
      }}
    className="items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg"
    >
      <div className="bg-white p-4 m-4 rounded-lg max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4">Selecionar Rotina</h2>
        {errorMessage && (
          <div className="mb-4 text-red-600 font-semibold">{errorMessage}</div>
        )}
        <div className="flex flex-col gap-4">
          <select
            className="p-2 border rounded"
            value={selecionada?.id ?? ""}
            onChange={(e) => {
              const found = rotinas.find((r) => r.id === Number(e.target.value));
              setSelecionada(found ?? null);
            }}
          >
            <option value="">Selecione uma rotina</option>
            {rotinas.map((r) => (
              <option key={r.id} value={r.id}>
                {r.nome} - {r.descricao}
              </option>
            ))}
          </select>
        </div>
        <div className="flex w-full p-4 justify-center gap-2">
          <DefaultButton onClick={closeModal}>CANCELAR</DefaultButton>
          <DefaultButton onClick={iniciarRotina} disabled={!selecionada}>
            INICIAR
          </DefaultButton>
        </div>
      </div>
    </dialog>
  );
}