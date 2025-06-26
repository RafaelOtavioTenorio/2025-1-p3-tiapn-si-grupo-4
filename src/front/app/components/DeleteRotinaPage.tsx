import { useEffect, useRef } from "react";
import CloseIcon from '@mui/icons-material/Close';
import DefaultButton from "./DefaultButton";

interface DeleteProps {
  openModal: boolean;
  closeModal: () => void;
  //onDelete: () => void;
  nomeRotina?: string;
  idRotina: number;
}

export default function Delete({ openModal, closeModal, nomeRotina, idRotina }: DeleteProps) {
  const ref = useRef<HTMLDialogElement>(null);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const deleteRotina = async () => {
    try {
      const response = await fetch(`${baseUrl}/RotinaTemplate/${idRotina}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        credentials: "omit",
      });


      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erro ao deletar rotina:", errorText);
        alert("Erro ao deletar a rotina. Tente novamente.");
        return;
      }

      closeModal(); // Fecha o modal
    } catch (error) {
      console.error("Erro na requisição de delete:", error);
      alert("Erro de rede ao deletar a rotina.");
    }
  };


  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <dialog
      ref={ref}
      onCancel={closeModal}
      className="items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg"
    >
      <div
        className="bg-white p-4 m-4 rounded-lg max-h-[90vh]"
      >
        <div className="justify-between flex items-center">
          <h2 className="text-xl font-bold mb-4">DELETAR ROTINA</h2>
        </div>
        <p className="pt-5 mb-6 text-center">
          Tem certeza que deseja excluir a rotina <span className="font-semibold">{nomeRotina || "selecionada"}</span>?
          <br />
          Esta ação não poderá ser desfeita.
        </p>
        <div className="flex w-full justify-center gap-4">
          <DefaultButton onClick={deleteRotina}>
            DELETAR
          </DefaultButton>
        </div>
      </div>
    </dialog>
  );
}