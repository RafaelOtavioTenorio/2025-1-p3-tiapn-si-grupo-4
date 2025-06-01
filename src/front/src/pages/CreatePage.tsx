import { useState } from "react";
import Title from "../components/Title";
import DefaultModal from "../components/CreateRoutine";
import DefaultButton from "../components/DefaultButton";
import ItemRegisterModal from "../components/ItemRegister";

export type NovoItem = {
  tipo: string;
  nome: string;
  prioridade?: string;
  descricao?: string;
}

export default function CreatePage() {
    const [createModal, setModal] = useState(false)
    const [itemRegisterOpen, setItemRegisterOpen] = useState(false);
    const [resultadoModalRegistroItem, setResultadoModalRegistroItem] = useState();

    const handleCreateItem = () => {
        
    }

    return (
        <div className='flex flex-row m-5 p-4'>
            <div className='flex-1 bg-[#F5F5F5]'>
                <div className="flex flex-row justify-between items-center ">
                    <Title>Minhas Rotinas</Title>
                    <DefaultButton onClick={() => setModal(true)}>
                        + CRIAR ROTINA
                    </DefaultButton>
                    <DefaultModal closeModal={() => setModal(false)} openModal={createModal} />
                </div>

                <DefaultButton onClick={() => setItemRegisterOpen(true)}>
                    ADICIONAR TAREFA
                </DefaultButton>

                <ItemRegisterModal
                    closeModal={() => setItemRegisterOpen(false)}
                    openModal={itemRegisterOpen}
                    onCreate={handleCreateItem}
                />

                <div className="bg-[#ffff] w-full h-9/11">

                </div>
            </div>
        </div>
    )
}