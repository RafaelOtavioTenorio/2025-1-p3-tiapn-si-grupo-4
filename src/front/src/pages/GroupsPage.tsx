import { useState } from "react";
import DefaultButton, { ButtonTypes } from "../components/DefaultButton";
import MainPage from "./MainPage";
import DefaultModal from "../components/DefaultModal";

function okAction(setModal: (v: boolean) => void) {
    return <>
        <DefaultButton onClick={() => { setModal(false) }} type={ButtonTypes.SECONDARY}>OK</DefaultButton>
    </>
}

export default function GroupsPage() {
    const [modal, setModal] = useState(false);

    return (
        <MainPage title="Gerenciar Grupos" >
            <DefaultButton onClick={() => setModal(true)} >
                CRIAR GRUPO
            </DefaultButton>
            <DefaultModal closeModal={() => setModal(false)} openModal={modal}
                actions={[okAction(() => setModal(false))]}>
                Modal Content
            </DefaultModal>
        </MainPage>
    )

}