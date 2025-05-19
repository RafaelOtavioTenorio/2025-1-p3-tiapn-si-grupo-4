import { useRef, useState } from "react";
import DefaultButton from "../components/DefaultButton";
import MainPage from "./MainPage";
import DefaultModal from "../components/DefaultModal";

export default function GroupsPage() {
    const [modal, setModal] = useState(false);
    
    return (
        <MainPage title="Gerenciar Grupos" >
            <DefaultButton onClick={()=>setModal(true)} >
                CRIAR GRUPO
            </DefaultButton>
            <DefaultModal closeModal={()=>setModal(false)} openModal={modal}>
                Modal Content
            </DefaultModal>
        

        </MainPage>
    )
}