import React, { useEffect, useState } from "react";
import UserCard from "~/components/UserCard";
import EditUserModal from "~/components/EditUserModal";
import type { User } from "~/types";

const BACKEND_URL = import.meta.env.VITE_BASE_URL;

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [userData, setUserData] = useState<{ id: number; nivelAcesso: number } | null>(null);

  useEffect(() => {
    const userDataRaw = localStorage.getItem("userData");
    if (userDataRaw) {
      const parsed = JSON.parse(userDataRaw);
      setUserData(parsed);
    }
  }, []);

  useEffect(() => {
    if (userData) {
      fetchUsers(userData);
    }
  }, [userData]);

  const fetchUsers = async (parsedUser: { id: number; nivelAcesso: number }) => {
    const { id, nivelAcesso } = parsedUser;

    let url = `${BACKEND_URL}/user/${id}`; // padrão

    if (nivelAcesso === 3) {
      try {
        const empresaRes = await fetch(`${BACKEND_URL}/user/${id}/empresa`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (!empresaRes.ok) {
          console.error("Erro ao buscar empresa do usuário:", await empresaRes.text());
          return;
        }

        const empresaData = await empresaRes.json();
        const empresaId = empresaData.empresaId;

        if (!empresaId) {
          console.error("Usuário coordenador sem empresa vinculada.");
          return;
        }

        url = `${BACKEND_URL}/empresa/${empresaId}/funcionarios`;
      } catch (e) {
        console.error("Erro ao buscar empresa:", e);
        return;
      }
    }

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (!response.ok) {
        console.error("Erro ao buscar usuários:", await response.text());
        return;
      }

      const data = await response.json();

      const normalizedData = Array.isArray(data)
        ? data.map((f: any) => ({
            id: f.usuarioId,
            nome: f.nome,
            email: "", // não vem no DTO
            cpf: f.cpf,
            celular: "", // não vem no DTO
            nivelAcesso: f.nivelAcesso,
            ativo: true,
          }))
        : {
            id: data.id,
            nome: data.nome,
            email: data.email,
            cpf: data.cpf,
            celular: data.celular,
            nivelAcesso: data.nivelAcesso,
            ativo: data.ativo,
          };

      setUsers(Array.isArray(normalizedData) ? normalizedData : [normalizedData]);
    } catch (err) {
      console.error("Erro geral no fetch de usuários:", err);
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleSave = async (updatedUser: User) => {
    await fetch(`${BACKEND_URL}/api/usuarios/${updatedUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify(updatedUser),
    });
    if (userData) fetchUsers(userData);
  };

  const handleDelete = async (userId: number) => {
    await fetch(`${BACKEND_URL}/api/usuarios/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    if (userData) fetchUsers(userData);
  };

  if (!userData) return <p>Carregando...</p>;

  return (
    <div className="p-4 flex flex-col items-center gap-4 bg-gray-100">
      <h1 className="text-2xl font-bold">Usuários</h1>

      {users.map((user) => {
        const isOwnProfile = user.id === userData.id;
        const isCoordinator = userData.nivelAcesso === 3;

        return (
          <UserCard
            key={user.id}
            user={user}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isOwnProfile={isOwnProfile}
            isCoordinator={isCoordinator}
          />
        );
      })}

      <EditUserModal
        user={selectedUser}
        openModal={modalOpen}
        closeModal={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
