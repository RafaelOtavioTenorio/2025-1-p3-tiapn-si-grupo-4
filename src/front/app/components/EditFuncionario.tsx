import { useEffect, useRef, useState } from "react";
import DefaultButton from "./DefaultButton";

export interface EditFuncionarioData {
    nome: string;
    ocupacao: string;
    cpf: string;
    empresa: string;
}

interface EditFuncionarioProps {
    openModal: boolean;
    closeModal: () => void;
    onEdit: (item: EditFuncionarioData) => void;
    funcionario: EditFuncionarioData | null;
    empresas?: string[];
}

export default function EditFuncionario(props: EditFuncionarioProps) {
    const ref = useRef<HTMLDialogElement>(null);
    const [nome, setNome] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [ocupacao, setOcupacao] = useState('');
    const [cpf, setCpf] = useState('');

    useEffect(() => {
        if (props.openModal && props.funcionario) {
            setNome(props.funcionario.nome);
            setEmpresa(props.funcionario.empresa);
            setOcupacao(props.funcionario.ocupacao);
            setCpf(props.funcionario.cpf);
            ref.current?.showModal();
        } else {
            ref.current?.close();
        }
    }, [props.openModal, props.funcionario]);

    const handleSubmit = () => {
        if (
            nome.trim() === "" ||
            empresa.trim() === "" ||
            ocupacao.trim() === "" ||
            cpf.trim() === ""
        ) return;

        props.onEdit({
            nome: nome.trim(),
            empresa: empresa.trim(),
            ocupacao: ocupacao.trim(),
            cpf: cpf.trim(),
        });
        props.closeModal();
    };

    return (
        <dialog
            ref={ref}
            onCancel={props.closeModal}
            onClick={e => {
                if (e.target === ref.current) props.closeModal();
            }}
            className="items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg"
        >
            <div className="bg-white p-4 m-4 rounded-lg w-md overflow-auto max-h-[90vh]"
                onClick={e => e.stopPropagation()}>
                <h2 className="text-xl font-bold mb-4">EDITAR FUNCIONÁRIO</h2>
                <div className="pt-4 grid grid-cols-5 gap-4">
                    <div className="col-span-5 mb-4">
                        <label className="block font-medium mb-1">Nome do funcionário</label>
                        <input
                            type="text"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div className="col-span-5 mb-4">
                        <label className="block font-medium mb-1">Empresa</label>
                        <select
                            value={empresa}
                            onChange={e => setEmpresa(e.target.value)}
                            className="w-full border p-2 rounded"
                        >
                            <option value="">Selecione a empresa</option>
                            {props.empresas?.map((nome, idx) => (
                                <option key={idx} value={nome}>{nome}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-span-5 mb-4">
                        <label className="block font-medium mb-1">Cargo</label>
                        <input
                            type="text"
                            value={ocupacao}
                            onChange={e => setOcupacao(e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div className="col-span-5 mb-4">
                        <label className="block font-medium mb-1">CPF</label>
                        <input
                            type="text"
                            value={cpf}
                            onChange={e => setCpf(e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                </div>
                <div className="flex w-full p-4 justify-center gap-2">
                    <DefaultButton onClick={handleSubmit}>
                        SALVAR
                    </DefaultButton>
                </div>
            </div>
        </dialog>
    );
}