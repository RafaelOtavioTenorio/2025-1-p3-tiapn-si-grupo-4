import { useState, useEffect } from "react";
import DefaultButton from "~/components/DefaultButton";
import Title from "~/components/Title";
import SearchFuncionario from "~/components/SearchFuncionario";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Edit from '@mui/icons-material/EditNoteOutlined';
import CreateEmpresaGrupo from "~/components/CreateEmpresaGrupo";
import CriarFuncionario from "~/components/CriarFuncionario";
import EditFuncionario from "~/components/EditFuncionario";
import MainPage from "~/components/MainPage";

interface GroupMember {
    nome: string;
    ocupacao: string;
    identificador: string; // Pode ser CPF, ID, etc.
}

interface MemberCategory {
    title: string;
    members: GroupMember[];
}

interface EditFuncionarioData {
    nome: string;
    ocupacao: string;
    cpf: string;
    empresa: string;
}

interface NovoFuncionario {
    nome: string;
    Empresa: string;
    ocupacao: string;
    cpf: string;
}

export default function GroupsPage() {
    const [memberCategories, setMemberCategories] = useState<MemberCategory[]>([]);
    const [selectedRole, setSelectedRole] = useState("CARGO");
    const [deleteMemberOpen, setDeleteMemberOpen] = useState(false); // Fazer
    const [searchText, setSearchText] = useState(""); // Estado para a barra de pesquisa
    const [createGroupModalOpen, setCreateGroupModalOpen] = useState(false);
    const [criarFuncionarioOpen, setCriarFuncionarioOpen] = useState(false);
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number | null>(null);
    //Variaveis para editar
    const [editFuncionarioOpen, setEditFuncionarioOpen] = useState(false);
    const [editFuncionarioData, setEditFuncionarioData] = useState<EditFuncionarioData | null>(null);
    const [editFuncionarioCategory, setEditFuncionarioCategory] = useState<number | null>(null);
    const [editFuncionarioIndex, setEditFuncionarioIndex] = useState<number | null>(null);



    // Mock de dados
    const handleSetMockGroupData = () => {
        const mockData: MemberCategory[] = [

            {
                title: "BELINA",
                members: [
                    { nome: "Maria dos Santos Silvia", ocupacao: "Supervisor de manutenção de veículos", identificador: "244.234.213-54" },
                    { nome: "João Oliveira Souza", ocupacao: "Coordenador de Equipe", identificador: "123.456.789-00" },
                    { nome: "Ana Paula Costa", ocupacao: "Líder de Produção", identificador: "987.654.321-00" },
                ],
            },
            {
                title: "FUNDAÇÃO GH",
                members: [
                    { nome: "Pedro Lima Almeida", ocupacao: "Técnico de Manutenção", identificador: "111.222.333-44" },
                    { nome: "Carla Ribeiro Dias", ocupacao: "Operador de Máquinas", identificador: "555.666.777-88" },
                    { nome: "Fernando Gomes Rocha", ocupacao: "Montador", identificador: "000.999.888-77" },
                    { nome: "Beatriz Nogueira Santos", ocupacao: "Auxiliar Administrativo", identificador: "444.333.222-11" },
                    { nome: "Roberto Mendes Vieira", ocupacao: "Eletricista Industrial", identificador: "777.888.999-00" },
                ],
            },
            {
                title: "CENTER UNITE",
                members: [
                    { nome: "Pedro Lima Almeida", ocupacao: "Técnico de Manutenção", identificador: "111.222.333-44" },
                    { nome: "Carla Ribeiro Dias", ocupacao: "Operador de Máquinas", identificador: "555.666.777-88" },
                    { nome: "Fernando Gomes Rocha", ocupacao: "Montador", identificador: "000.999.888-77" },
                    { nome: "Beatriz Nogueira Santos", ocupacao: "Auxiliar Administrativo", identificador: "444.333.222-11" },
                    { nome: "Roberto Mendes Vieira", ocupacao: "Eletricista Industrial", identificador: "777.888.999-00" },
                ],
            },
        ];
        setMemberCategories(mockData);
    };

    const handleCreateGroup = (grupo: { nome: string; descricao?: string }) => {
        setMemberCategories([
            ...memberCategories,
            {
                title: grupo.nome,
                members: [],
            },
        ]);
        setCreateGroupModalOpen(false);
    };

    const handleCreateFuncionario = (novoFuncionario: NovoFuncionario) => {
        if (selectedCategoryIndex === null) return;
        setMemberCategories(prev =>
            prev.map((cat, idx) =>
                idx === selectedCategoryIndex
                    ? {
                        ...cat,
                        members: [
                            ...cat.members,
                            {
                                nome: novoFuncionario.nome,
                                ocupacao: novoFuncionario.ocupacao,
                                identificador: novoFuncionario.cpf
                            }
                        ]
                    }
                    : cat
            )
        );
        setCriarFuncionarioOpen(false);
    };

    const handleEditFuncionarioClick = (catIdx: number, memberIdx: number) => {
        const member = memberCategories[catIdx].members[memberIdx];
        setEditFuncionarioData({
            nome: member.nome,
            ocupacao: member.ocupacao,
            cpf: member.identificador,
            empresa: memberCategories[catIdx].title,
        });
        setEditFuncionarioCategory(catIdx);
        setEditFuncionarioIndex(memberIdx);
        setEditFuncionarioOpen(true);
    };

    const handleEditFuncionario = (func: EditFuncionarioData) => {
        if (editFuncionarioCategory === null || editFuncionarioIndex === null) return;
        setMemberCategories(prev =>
            prev.map((cat, catIdx) =>
                catIdx === editFuncionarioCategory
                    ? {
                        ...cat,
                        members: cat.members.map((m, mIdx) =>
                            mIdx === editFuncionarioIndex
                                ? {
                                    nome: func.nome,
                                    ocupacao: func.ocupacao,
                                    identificador: func.cpf
                                }
                                : m
                        )
                    }
                    : cat
            )
        );
        setEditFuncionarioOpen(false);
    };


    useEffect(() => {
        handleSetMockGroupData();
    }, []);

    return (
        <div className="flex flex-col p-8 bg-gray-200 h-screen">
            <div className="mb-5">
                <div className="flex justify-between items-center mb-6">
                    <Title>Empresas</Title>
                    <DefaultButton onClick={() => setCreateGroupModalOpen(true)}>+ ADICIONAR EMPRESA</DefaultButton>
                    <CreateEmpresaGrupo
                        openModal={createGroupModalOpen}
                        closeModal={() => setCreateGroupModalOpen(false)}
                        onCreate={handleCreateGroup}
                    />
                </div>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-6 gap-4 max-h-[75vh] overflow-y-auto">
                    <div className="col-span-1 sm:col-span-4">
                        <SearchFuncionario
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder="Pesquisar funcionário..."
                        />
                    </div>
                    <div className="col-span-1 sm:col-span-2">
                        <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="h-11 w-full px-4 rounded border border-gray-300 shadow-sm bg-white"
                        >
                            <option value="">Todas as empresas</option>
                            {memberCategories.map((cat) => (
                                <option key={cat.title} value={cat.title}>{cat.title}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Conteúdo principal */}
            <div className="mb-5 pb-8 flex flex-col gap-6 w-full mx-auto overflow-y-auto hide-scrollbar">
                {memberCategories
                    .filter(category => !selectedRole || category.title === selectedRole)
                    .map((category, index) => {
                    const filteredMembers = category.members.filter(member =>
                        member.nome.toLowerCase().includes(searchText.toLowerCase()) ||
                        member.ocupacao.toLowerCase().includes(searchText.toLowerCase()) ||
                        member.identificador.toLowerCase().includes(searchText.toLowerCase())
                    )

                    if (searchText.trim() !== "" && filteredMembers.length === 0) {
                        return null;
                    }

                    return (
                        <section key={index} className="bg-white rounded-lg p-6 shadow-md transition-all duration-300">
                            <h2 className="text-xl font-bold mb-4 pb-2">
                                {category.title}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                {filteredMembers.map((member, i) => (
                                    <div
                                        key={i}
                                        className="bg-gray-200 rounded-lg p-4 shadow-xl border border-gray-300 flex flex-col justify-between items-start"
                                    >
                                        <div>
                                            <h3 className="font-semibold text-gray-800 py-2">{member.nome}</h3>
                                            <p className="text-sm text-gray-600 py-2">{member.ocupacao}</p>
                                        </div>
                                        <div className="mt-4 flex justify-between w-full">
                                            <p className="text-xs text-gray-500">{member.identificador}</p>
                                            <Edit className="text-gray-700 hover:text-black cursor-pointer"
                                                onClick={() => handleEditFuncionarioClick(index, i)}
                                            />
                                        </div>
                                    </div>
                                ))}
                                {/* Cartão "Adicionar" */}
                                <div
                                    className="bg-gray-200 rounded-lg p-4 flex justify-center items-center cursor-pointer hover:bg-gray-300 transition-colors h-full"
                                    onClick={() => {
                                        setSelectedCategoryIndex(index);
                                        setCriarFuncionarioOpen(true);
                                    }}
                                >
                                    <span className="text-4xl text-gray-500">
                                        <AddRoundedIcon style={{ fontSize: "128px" }} />
                                    </span>
                                </div>
                            </div>
                        </section>
                    );
                })}

                <CriarFuncionario
                    openModal={criarFuncionarioOpen}
                    closeModal={() => setCriarFuncionarioOpen(false)}
                    onCreate={handleCreateFuncionario}
                    result={undefined}
                    empresas={memberCategories.map(cat => cat.title)}
                />
                <EditFuncionario
                    openModal={editFuncionarioOpen}
                    closeModal={() => setEditFuncionarioOpen(false)}
                    onEdit={handleEditFuncionario}
                    funcionario={editFuncionarioData}
                    empresas={memberCategories.map(cat => cat.title)}
                />
            </div>
        </div>
    );
}