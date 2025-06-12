import { useState, useEffect } from "react";
import DefaultButton from "../components/DefaultButton";
import Title from "../components/Title";
import SearchInput from "../components/SearchInput";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MainPage from "./MainPage";
import DefaultModal from "./DefaultModal";

function okAction(setModal: (v: boolean) => void) {
    return <>
        <DefaultButton onClick={() => { setModal(false) }} buttonType={ButtonTypes.SECONDARY}>OK</DefaultButton>
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

            {/* Conteúdo principal */}
            <div className="flex flex-col gap-6 w-full mx-auto">
                {memberCategories.map((category, index) => (
                    <section key={index} className="bg-white rounded-lg p-6 shadow-md">
                        <h2 className="text-xl font-bold mb-4 pb-2">
                            {category.title}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {category.members.map((member, i) => (
                                <div
                                    key={i}
                                    className="bg-gray-200 rounded-lg p-4 shadow-xl border border-gray-300 flex flex-col justify-between items-start"
                                >
                                    <div>
                                        <h3 className="font-semibold text-gray-800 py-2">{member.nome}</h3>
                                        <p className="text-sm text-gray-600 py-2">{member.ocupacao}</p>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-4 self-start">{member.identificador}</p>

                                </div>
                            ))}
                            {/* Cartão "Adicionar" */}
                            <div
                                className="bg-gray-200 rounded-lg p-4
                flex justify-center items-center cursor-pointer hover:bg-gray-300 transition-colors"
                                onClick={() => setCreateGroupModalOpen(true)}
                            >
                                <span className="text-4xl text-gray-500"><AddRoundedIcon style={{ fontSize: "128px" }} /></span>
                            </div>
                        </div>
                    </section>
                ))}
            </div>

            {/* Modais (placeholder para implementação futura) */}
            {/* <CreateGroupModal
        openModal={createGroupModalOpen}
        closeModal={() => setCreateGroupModalOpen(false)}
        onCreateGroup={() => {}}
      /> */}
            {/* <DeleteMemberModal
        openModal={deleteMemberOpen}
        closeModal={() => setDeleteMemberOpen(false)}
        onDelete={() => {}}
      /> */}
        </div >
    );
}
