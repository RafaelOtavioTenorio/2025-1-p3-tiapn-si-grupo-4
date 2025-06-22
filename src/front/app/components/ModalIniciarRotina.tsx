// ModalIniciarRotina.tsx
import { useEffect, useState } from "react";
import DefaultModal from "./DefaultModal";
import DefaultButton from "./DefaultButton";

interface RotinaTemplate {
  id: number;
  nome: string;
  descricao: string;
}

interface ModalIniciarRotinaProps {
  openModal: boolean;
  closeModal: () => void;
  onRotinaIniciada: () => void; // callback para avisar criação concluída
}

export default function ModalIniciarRotina({
  openModal,
  closeModal,
  onRotinaIniciada,
}: ModalIniciarRotinaProps) {
  const [rotinas, setRotinas] = useState<RotinaTemplate[]>([]);
  const [selecionada, setSelecionada] = useState<RotinaTemplate | null>(null);

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
        console.error("Erro ao buscar rotinas:", await res.text());
      }
    };

    if (openModal) {
      fetchRotinas();
      setSelecionada(null); // limpa seleção ao abrir modal
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
      }),
    });

    if (res.ok) {
      closeModal();
      onRotinaIniciada();
    } else {
      console.error("Erro ao iniciar rotina:", await res.text());
    }
  };

  return (
    <DefaultModal
      openModal={openModal}
      closeModal={closeModal}
      actions={[
        <DefaultButton
          key="iniciar"
          onClick={iniciarRotina}
          disabled={!selecionada}
        >
          Iniciar
        </DefaultButton>,
      ]}
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">Selecionar Rotina</h2>
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
    </DefaultModal>
  );
}
