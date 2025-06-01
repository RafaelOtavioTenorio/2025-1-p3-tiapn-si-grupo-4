
import { useEffect, useRef, useState, type PropsWithChildren } from "react";
import DefaultButton from "./DefaultButton";

export type NovoItem = {
  tipo: string;
  nome: string;
  prioridade?: string;
  descricao?: string;
}

interface ModalProps extends PropsWithChildren {
    openModal: boolean;
    closeModal: () => void;
    actions?: React.ReactElement[];
}

function CreateRoutine(props: ModalProps) {
    const ref = useRef<HTMLDialogElement>(null);
    const [nome, setNome] = useState('');
    const [descRotina, setDescRotina] = useState('');
    const [prioridade, setPrioridade] = useState('');

    const handleCreate = () => {
    if (nome.trim() === "") return;
    setNome('');
    setPrioridade('1');
    setDescRotina('');
    props.closeModal();
  }

    useEffect(() => {
        if (props.openModal) {
            ref.current?.showModal();
        } else {
            ref.current?.close();
        }
    }, [props.openModal]);

    return (
        <dialog
            ref={ref}
            onCancel={props.closeModal}
            className="items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-4/5"
        >
            <div className="h-full flex flex-col">
                <div className="flex-1 flex items-center justify-center">
                    {props.children}
                </div>


                <h2 className="text-xl font-bold mb-4">CADASTRAR ROTINA</h2>

                <div className="mb-4">
                    <label className="block font-medium mb-1">Nome da rotina</label>
                    <input
                        type="text"
                        placeholder="Digite o nome da rotina"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-medium mb-1">Descrição da rotina</label>
                    <textarea
                        maxLength={255}
                        rows={4}
                        placeholder="Digite a descrição do insumo"
                        value={descRotina}
                        onChange={e => setDescRotina(e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-medium mb-1">Prioridade</label>
                    <select
                        value={prioridade}
                        onChange={e => setPrioridade(e.target.value)}
                        className="w-full border p-2 rounded"
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>

                <div className="text-right">
                    <button
                        onClick={handleCreate}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Criar
                    </button>


                    <div className="flex w-full p-4 justify-center gap-2">
                        {props.actions && props.actions.map((action, index) => (
                            <div key={index}>{action}</div>
                        ))}
                        <DefaultButton onClick={props.closeModal}>
                            Fechar
                        </DefaultButton>
                    </div>
                </div>
                </div>

        </dialog>
    );
}

export default CreateRoutine;