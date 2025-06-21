import { useEffect, useRef, useState, type PropsWithChildren } from "react";
import CloseIcon from '@mui/icons-material/Close';
import DefaultButton from "./DefaultButton";

export interface NovoGrupoEmpresa {
    nome: string;
    CNPJ?: string;
}

interface ModalProps extends PropsWithChildren {
    openModal: boolean;
    closeModal: () => void;
    onCreate?: (item: NovoGrupoEmpresa) => void;
    actions?: React.ReactElement[];
}

function CreateEmpresaGrupo(props: ModalProps) {
    const ref = useRef<HTMLDialogElement>(null);
    const [nome, setNome] = useState('');
    const [CNPJ, setCNPJ] = useState<string>('');

    const baseUrl = import.meta.env.VITE_BASE_URL;

    const handleSubmit = async () => {
        if (!nome.trim()) return;

        const payload = {
            nome: nome.trim(),
            cnpj: CNPJ.trim(),
            ativo: true,
            funcionarios: []
        };

        try {
            const res = await fetch(`${baseUrl}/empresa`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                props.onCreate?.({
                    nome: payload.nome,
                    CNPJ: payload.cnpj
                });
                setNome('');
                setCNPJ('');
                props.closeModal();
            } else {
                console.error("Erro ao criar empresa:", await res.text());
            }
        } catch (error) {
            console.error("Erro de rede ao criar empresa:", error);
        }
    };

    useEffect(() => {
        if (props.openModal) {
            ref.current?.showModal();
        } else {
            ref.current?.close();
        }
    }, [props.openModal]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                props.closeModal();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [props.closeModal]);

    return (
        <dialog
            ref={ref}
            onCancel={props.closeModal}
            onClick={(e) => {
                if (e.target === ref.current) {
                    props.closeModal();
                }
            }}
            className="items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg"
        >
            <div
                className="bg-white p-4 m-4 rounded-lg w-md overflow-auto max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex-1 flex items-center justify-center">
                    {props.children}
                </div>

                <h2 className="text-xl font-bold mb-4">CADASTRAR EMPRESA</h2>

                <div className="pt-4 grid grid-cols-5 gap-4">
                    <div className="col-span-5 mb-4">
                        <label className="block font-medium mb-1">Nome da empresa</label>
                        <input
                            type="text"
                            placeholder="Digite o nome da empresa"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                    <div className="col-span-5 mb-4">
                        <label className="block font-medium mb-1">CNPJ da empresa</label>
                        <input
                            type="text"
                            inputMode="numeric"
                            maxLength={14}
                            placeholder="Digite o CNPJ da empresa (somente números)"
                            value={CNPJ}
                            onChange={e => {
                                const onlyNumbers = e.target.value.replace(/\D/g, "");
                                setCNPJ(onlyNumbers.slice(0, 14));
                            }}
                            className="w-full border p-2 rounded"
                        />
                    </div>
                </div>

                <div className="flex w-full p-4 justify-center gap-2">
                    <DefaultButton onClick={handleSubmit}>
                        CRIAR
                    </DefaultButton>
                </div>
            </div>
        </dialog>
    );
}

export default CreateEmpresaGrupo;
