import React, { useEffect, useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BASE_URL;

interface UserData {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  celular: string;
  nivelAcesso: number;
}

const nivelAcessoLabel = (nivel: number) => {
  switch (nivel) {
    case 1: return "Funcionário";
    case 2: return "Administrador";
    case 3: return "Coordenador";
    default: return "Desconhecido";
  }
};

export default function UserProfilePage() {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const userDataRaw = localStorage.getItem("userData");
    if (!userDataRaw) return;

    const parsed = JSON.parse(userDataRaw);
    fetch(`${BACKEND_URL}/user/${parsed.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser({
          id: data.id,
          nome: data.nome,
          email: data.email,
          cpf: data.cpf,
          celular: data.celular,
          nivelAcesso: data.nivelAcesso,
        });
      })
      .catch((err) => console.error("Erro ao carregar usuário:", err));
  }, []);

  if (!user) return <p className="text-center mt-10 text-gray-600">Carregando dados do usuário...</p>;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Perfil do Usuário</h1>

        <div className="space-y-4">
          <UserInfo label="Nome" value={user.nome} />
          <UserInfo label="E-mail" value={user.email} />
          <UserInfo label="CPF" value={user.cpf} />
          <UserInfo label="Celular" value={user.celular || "Não informado"} />
          <UserInfo label="Nível de Acesso" value={nivelAcessoLabel(user.nivelAcesso)} />
        </div>
      </div>
    </div>
  );
}

function UserInfo({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-base text-gray-800 font-medium">{value}</span>
    </div>
  );
}
