import { useEffect, useRef } from "react";
import CloseIcon from '@mui/icons-material/Close';
import DefaultButton from "./DefaultButton";

interface DeleteProps {
  openModal: boolean;
  closeModal: () => void;
  onDelete: () => void;
  nomeRotina?: string;
}

export default function Delete({ openModal, closeModal, onDelete, nomeRotina }: DeleteProps) {
  const ref = useRef<HTMLDialogElement>(null);

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
      className="items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg"
    >
      <div
        className="bg-white p-4 m-4 rounded-lg w-full overflow-auto max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        <div className="justify-between flex items-center">
          <h2 className="text-xl font-bold mb-4">DELETAR ROTINA</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700 border border-gray-300 
            rounded-md p-2 transition-colors duration-150 hover:bg-gray-100 focus:outline-none"
            aria-label="Fechar"
            type="button"
          >
          </button>
        </div>
        <p className="pt-5 mb-6 text-center">
          Tem certeza que deseja excluir a rotina? <span className="font-semibold">{nomeRotina || "selecionada"}</span>?
          <br />
          Esta ação não poderá ser desfeita.
        </p>
        <div className="flex w-full justify-center gap-4">
          <DefaultButton onClick={onDelete}>
            Deletar
          </DefaultButton>
        </div>
      </div>
    </dialog>
  );
}